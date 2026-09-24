from datetime import timedelta

from django.conf import settings
from django.core.exceptions import ValidationError
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

from students.models import AcademicYear, Classroom, Student
from students.validators import normalize_mobile, validate_mobile


class Teacher(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="teacher_profile",
        blank=True,
        null=True,
    )
    personnel_code = models.CharField(
        max_length=32,
        unique=True,
        blank=True,
        null=True,
        verbose_name="کد پرسنلی",
    )
    first_name = models.CharField(max_length=80, verbose_name="نام")
    last_name = models.CharField(max_length=120, verbose_name="نام خانوادگی")
    mobile = models.CharField(
        max_length=11,
        blank=True,
        validators=[validate_mobile],
        verbose_name="موبایل",
    )
    email = models.EmailField(blank=True, verbose_name="ایمیل")
    bio = models.TextField(blank=True, verbose_name="معرفی")
    is_active = models.BooleanField(default=True, verbose_name="فعال")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["last_name", "first_name"]
        verbose_name = "معلم"
        verbose_name_plural = "معلمان"

    def save(self, *args, **kwargs):
        self.personnel_code = self.personnel_code or None
        self.mobile = normalize_mobile(self.mobile)
        super().save(*args, **kwargs)

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}".strip()

    def __str__(self):
        return self.full_name


class Subject(models.Model):
    code = models.SlugField(max_length=64, unique=True, verbose_name="کد درس")
    name_fa = models.CharField(max_length=120, verbose_name="نام فارسی")
    name_en = models.CharField(max_length=120, blank=True, verbose_name="نام انگلیسی")
    description = models.TextField(blank=True, verbose_name="توضیحات")
    sort_order = models.PositiveSmallIntegerField(default=0, verbose_name="ترتیب")
    is_active = models.BooleanField(default=True, verbose_name="فعال")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["sort_order", "name_fa"]
        verbose_name = "درس"
        verbose_name_plural = "درس‌ها"

    def __str__(self):
        return self.name_fa


class TeachingAssignment(models.Model):
    academic_year = models.ForeignKey(
        AcademicYear,
        on_delete=models.PROTECT,
        related_name="teaching_assignments",
        verbose_name="سال تحصیلی",
    )
    classroom = models.ForeignKey(
        Classroom,
        on_delete=models.PROTECT,
        related_name="teaching_assignments",
        verbose_name="کلاس",
    )
    subject = models.ForeignKey(
        Subject,
        on_delete=models.PROTECT,
        related_name="teaching_assignments",
        verbose_name="درس",
    )
    teacher = models.ForeignKey(
        Teacher,
        on_delete=models.PROTECT,
        related_name="teaching_assignments",
        verbose_name="معلم",
    )
    is_active = models.BooleanField(default=True, verbose_name="فعال")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = [
            "-academic_year__title",
            "classroom__grade__sort_order",
            "classroom__name",
            "subject__sort_order",
        ]
        constraints = [
            models.UniqueConstraint(
                fields=["academic_year", "classroom", "subject", "teacher"],
                name="unique_teacher_subject_class_year",
            )
        ]
        verbose_name = "تخصیص تدریس"
        verbose_name_plural = "تخصیص‌های تدریس"

    def clean(self):
        if (
            self.classroom_id
            and self.academic_year_id
            and self.classroom.academic_year_id != self.academic_year_id
        ):
            raise ValidationError("کلاس باید متعلق به سال تحصیلی انتخاب‌شده باشد.")

    def __str__(self):
        return f"{self.subject} - {self.classroom} - {self.teacher}"


class OnlineSession(models.Model):
    class Status(models.TextChoices):
        DRAFT = "draft", "پیش‌نویس"
        SCHEDULED = "scheduled", "برنامه‌ریزی‌شده"
        LIVE = "live", "در حال برگزاری"
        ENDED = "ended", "پایان‌یافته"
        CANCELLED = "cancelled", "لغوشده"

    assignment = models.ForeignKey(
        TeachingAssignment,
        on_delete=models.PROTECT,
        related_name="online_sessions",
        verbose_name="کلاس و درس",
    )
    title = models.CharField(max_length=180, verbose_name="عنوان جلسه")
    starts_at = models.DateTimeField(verbose_name="زمان شروع")
    duration_minutes = models.PositiveSmallIntegerField(
        default=60,
        validators=[MinValueValidator(10), MaxValueValidator(480)],
        verbose_name="مدت جلسه",
    )
    join_window_minutes = models.PositiveSmallIntegerField(
        default=15,
        validators=[MinValueValidator(0), MaxValueValidator(120)],
        verbose_name="زمان مجاز ورود پیش از شروع",
    )
    status = models.CharField(
        max_length=16,
        choices=Status.choices,
        default=Status.DRAFT,
        verbose_name="وضعیت",
    )
    allow_recording = models.BooleanField(default=True, verbose_name="ضبط جلسه")
    provider_key = models.CharField(
        max_length=40,
        default="unconfigured",
        editable=False,
    )
    external_meeting_id = models.CharField(
        max_length=180,
        blank=True,
        editable=False,
    )
    provider_metadata = models.JSONField(default=dict, blank=True, editable=False)
    recording_url = models.URLField(blank=True, verbose_name="لینک ضبط")
    notes = models.TextField(blank=True, verbose_name="یادداشت")
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="created_online_sessions",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-starts_at", "-id"]
        constraints = [
            models.UniqueConstraint(
                fields=["assignment", "starts_at"],
                name="unique_assignment_session_start",
            )
        ]
        verbose_name = "جلسه آنلاین"
        verbose_name_plural = "جلسات آنلاین"

    @property
    def ends_at(self):
        return self.starts_at + timedelta(minutes=self.duration_minutes)

    def __str__(self):
        return f"{self.title} - {self.starts_at}"


class SessionAttendance(models.Model):
    class Status(models.TextChoices):
        EXPECTED = "expected", "در فهرست"
        PRESENT = "present", "حاضر"
        ABSENT = "absent", "غایب"
        EXCUSED = "excused", "غیبت موجه"

    session = models.ForeignKey(
        OnlineSession,
        on_delete=models.CASCADE,
        related_name="attendance_records",
        verbose_name="جلسه",
    )
    student = models.ForeignKey(
        Student,
        on_delete=models.PROTECT,
        related_name="online_attendance_records",
        verbose_name="دانش‌آموز",
    )
    status = models.CharField(
        max_length=16,
        choices=Status.choices,
        default=Status.EXPECTED,
        verbose_name="وضعیت حضور",
    )
    first_joined_at = models.DateTimeField(blank=True, null=True)
    last_left_at = models.DateTimeField(blank=True, null=True)
    attended_seconds = models.PositiveIntegerField(default=0)
    provider_participant_id = models.CharField(max_length=180, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["session__starts_at", "student__last_name"]
        constraints = [
            models.UniqueConstraint(
                fields=["session", "student"],
                name="unique_student_session_attendance",
            )
        ]
        verbose_name = "حضور در جلسه"
        verbose_name_plural = "حضور و غیاب جلسات"

    def __str__(self):
        return f"{self.session} - {self.student}"
