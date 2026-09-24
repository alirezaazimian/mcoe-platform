from django.conf import settings
from django.db import models
from django.utils import timezone

from .validators import (
    normalize_mobile,
    normalize_national_code,
    validate_mobile,
    validate_national_code,
)


class AcademicYear(models.Model):
    title = models.CharField(
        max_length=32,
        unique=True,
        verbose_name="عنوان سال تحصیلی",
    )
    slug = models.SlugField(
        max_length=32,
        unique=True,
        verbose_name="شناسه",
    )
    is_active = models.BooleanField(
        default=False,
        verbose_name="سال فعال",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-title"]
        verbose_name = "سال تحصیلی"
        verbose_name_plural = "سال‌های تحصیلی"

    def __str__(self):
        return self.title


class GradeLevel(models.Model):
    class Stage(models.TextChoices):
        PRESCHOOL = "preschool", "پیش‌دبستان"
        ELEMENTARY_FIRST = "elementary_first", "دبستان دوره اول"
        ELEMENTARY_SECOND = "elementary_second", "دبستان دوره دوم"
        MIDDLE_FIRST = "middle_first", "متوسطه دوره اول"

    code = models.SlugField(
        max_length=32,
        unique=True,
        verbose_name="کد پایه",
    )
    name_fa = models.CharField(
        max_length=80,
        verbose_name="نام پایه",
    )
    stage = models.CharField(
        max_length=32,
        choices=Stage.choices,
        verbose_name="مقطع",
    )
    sort_order = models.PositiveSmallIntegerField(
        default=0,
        verbose_name="ترتیب",
    )
    is_active = models.BooleanField(
        default=True,
        verbose_name="فعال",
    )

    class Meta:
        ordering = ["sort_order", "name_fa"]
        verbose_name = "پایه تحصیلی"
        verbose_name_plural = "پایه‌های تحصیلی"

    def __str__(self):
        return self.name_fa


class Classroom(models.Model):
    academic_year = models.ForeignKey(
        AcademicYear,
        on_delete=models.PROTECT,
        related_name="classrooms",
        verbose_name="سال تحصیلی",
    )
    grade = models.ForeignKey(
        GradeLevel,
        on_delete=models.PROTECT,
        related_name="classrooms",
        verbose_name="پایه",
    )
    name = models.CharField(
        max_length=100,
        verbose_name="نام کلاس",
    )
    capacity = models.PositiveSmallIntegerField(
        blank=True,
        null=True,
        verbose_name="ظرفیت",
    )
    is_active = models.BooleanField(
        default=True,
        verbose_name="فعال",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = [
            "academic_year__title",
            "grade__sort_order",
            "name",
        ]
        constraints = [
            models.UniqueConstraint(
                fields=["academic_year", "grade", "name"],
                name="unique_classroom_per_year_grade",
            )
        ]
        verbose_name = "کلاس"
        verbose_name_plural = "کلاس‌ها"

    def __str__(self):
        return f"{self.name} - {self.academic_year}"


class Student(models.Model):
    class Gender(models.TextChoices):
        FEMALE = "female", "دختر"
        MALE = "male", "پسر"
        UNSPECIFIED = "unspecified", "ثبت نشده"

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="student_profile",
        blank=True,
        null=True,
    )
    national_code = models.CharField(
        max_length=10,
        unique=True,
        validators=[validate_national_code],
        verbose_name="کد ملی",
    )
    first_name = models.CharField(
        max_length=80,
        verbose_name="نام",
    )
    last_name = models.CharField(
        max_length=120,
        verbose_name="نام خانوادگی",
    )
    father_name = models.CharField(
        max_length=120,
        blank=True,
        verbose_name="نام پدر",
    )
    gender = models.CharField(
        max_length=16,
        choices=Gender.choices,
        default=Gender.FEMALE,
        verbose_name="جنسیت",
    )
    birth_date_jalali = models.CharField(
        max_length=16,
        blank=True,
        verbose_name="تاریخ تولد شمسی",
    )
    primary_mobile = models.CharField(
        max_length=11,
        blank=True,
        validators=[validate_mobile],
        verbose_name="موبایل اصلی",
    )
    sms_mobile = models.CharField(
        max_length=11,
        blank=True,
        validators=[validate_mobile],
        verbose_name="شماره پیامک",
    )
    sms_mobile_verified_at = models.DateTimeField(
        blank=True,
        null=True,
        verbose_name="زمان تأیید شماره پیامک",
    )
    home_phone = models.CharField(
        max_length=32,
        blank=True,
        verbose_name="تلفن منزل",
    )
    postal_code = models.CharField(
        max_length=20,
        blank=True,
        verbose_name="کد پستی",
    )
    address = models.TextField(
        blank=True,
        verbose_name="نشانی",
    )
    portal_enabled = models.BooleanField(
        default=False,
        verbose_name="دسترسی پرتال",
    )
    is_active = models.BooleanField(
        default=True,
        verbose_name="فعال",
    )
    extra_data = models.JSONField(
        default=dict,
        blank=True,
        verbose_name="اطلاعات تکمیلی",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["last_name", "first_name"]
        verbose_name = "دانش‌آموز"
        verbose_name_plural = "دانش‌آموزان"

    def save(self, *args, **kwargs):
        self.national_code = normalize_national_code(
            self.national_code
        )
        self.primary_mobile = normalize_mobile(self.primary_mobile)
        self.sms_mobile = normalize_mobile(self.sms_mobile)
        super().save(*args, **kwargs)

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}".strip()

    @property
    def can_use_portal(self):
        return bool(
            self.is_active
            and self.portal_enabled
            and self.sms_mobile
            and self.user_id
            and self.user.is_active
        )

    def __str__(self):
        return self.full_name


class GuardianContact(models.Model):
    class Relation(models.TextChoices):
        FATHER = "father", "پدر"
        MOTHER = "mother", "مادر"
        OTHER = "other", "سایر"

    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE,
        related_name="guardians",
    )
    relation = models.CharField(
        max_length=16,
        choices=Relation.choices,
        verbose_name="نسبت",
    )
    full_name = models.CharField(
        max_length=160,
        blank=True,
        verbose_name="نام و نام خانوادگی",
    )
    national_code = models.CharField(
        max_length=10,
        blank=True,
        verbose_name="کد ملی",
    )
    mobile = models.CharField(
        max_length=11,
        blank=True,
        validators=[validate_mobile],
        verbose_name="موبایل",
    )
    email = models.EmailField(
        blank=True,
        verbose_name="ایمیل",
    )
    can_receive_sms = models.BooleanField(
        default=True,
        verbose_name="دریافت پیامک",
    )
    extra_data = models.JSONField(
        default=dict,
        blank=True,
        verbose_name="اطلاعات تکمیلی",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["student", "relation"],
                name="unique_guardian_relation_per_student",
            )
        ]
        ordering = ["student_id", "relation"]
        verbose_name = "اطلاعات ولی"
        verbose_name_plural = "اطلاعات اولیا"

    def save(self, *args, **kwargs):
        self.national_code = normalize_national_code(
            self.national_code
        ) if self.national_code else ""
        self.mobile = normalize_mobile(self.mobile)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.get_relation_display()} - {self.student}"


class Enrollment(models.Model):
    class Status(models.TextChoices):
        ACTIVE = "active", "فعال"
        INACTIVE = "inactive", "غیرفعال"
        TRANSFERRED = "transferred", "انتقالی"
        GRADUATED = "graduated", "فارغ‌التحصیل"

    student = models.ForeignKey(
        Student,
        on_delete=models.PROTECT,
        related_name="enrollments",
        verbose_name="دانش‌آموز",
    )
    academic_year = models.ForeignKey(
        AcademicYear,
        on_delete=models.PROTECT,
        related_name="enrollments",
        verbose_name="سال تحصیلی",
    )
    grade = models.ForeignKey(
        GradeLevel,
        on_delete=models.PROTECT,
        related_name="enrollments",
        verbose_name="پایه",
    )
    classroom = models.ForeignKey(
        Classroom,
        on_delete=models.PROTECT,
        related_name="enrollments",
        blank=True,
        null=True,
        verbose_name="کلاس",
    )
    status = models.CharField(
        max_length=16,
        choices=Status.choices,
        default=Status.ACTIVE,
        verbose_name="وضعیت",
    )
    source_file = models.CharField(
        max_length=255,
        blank=True,
    )
    source_row = models.PositiveIntegerField(
        blank=True,
        null=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["student", "academic_year"],
                name="unique_student_enrollment_per_year",
            )
        ]
        ordering = [
            "-academic_year__title",
            "grade__sort_order",
            "classroom__name",
            "student__last_name",
        ]
        verbose_name = "ثبت‌نام"
        verbose_name_plural = "ثبت‌نام‌ها"

    def clean(self):
        if self.classroom_id and (
            self.classroom.academic_year_id != self.academic_year_id
            or self.classroom.grade_id != self.grade_id
        ):
            from django.core.exceptions import ValidationError

            raise ValidationError(
                "کلاس باید متعلق به همین سال تحصیلی و پایه باشد."
            )

    def __str__(self):
        return f"{self.student} - {self.academic_year}"


class StudentImportBatch(models.Model):
    class Status(models.TextChoices):
        COMMITTED = "committed", "ثبت‌شده"
        FAILED = "failed", "ناموفق"

    checksum = models.CharField(
        max_length=64,
        db_index=True,
    )
    academic_year = models.ForeignKey(
        AcademicYear,
        on_delete=models.PROTECT,
        related_name="import_batches",
    )
    filenames = models.JSONField(default=list)
    report = models.JSONField(default=dict)
    status = models.CharField(
        max_length=16,
        choices=Status.choices,
        default=Status.COMMITTED,
    )
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="student_import_batches",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "واردسازی دانش‌آموزان"
        verbose_name_plural = "واردسازی‌های دانش‌آموزان"


class OtpChallenge(models.Model):
    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE,
        related_name="otp_challenges",
    )
    mobile = models.CharField(max_length=11)
    code_hash = models.CharField(max_length=128)
    expires_at = models.DateTimeField()
    attempt_count = models.PositiveSmallIntegerField(default=0)
    max_attempts = models.PositiveSmallIntegerField(default=5)
    consumed_at = models.DateTimeField(blank=True, null=True)
    request_ip = models.GenericIPAddressField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index(
                fields=["student", "-created_at"],
                name="student_otp_recent_idx",
            )
        ]
        ordering = ["-created_at"]

    @property
    def is_usable(self):
        return bool(
            self.consumed_at is None
            and self.expires_at > timezone.now()
            and self.attempt_count < self.max_attempts
        )


class SmsDelivery(models.Model):
    class Status(models.TextChoices):
        QUEUED = "queued", "در صف"
        SENT = "sent", "ارسال‌شده"
        FAILED = "failed", "ناموفق"

    student = models.ForeignKey(
        Student,
        on_delete=models.SET_NULL,
        related_name="sms_deliveries",
        blank=True,
        null=True,
    )
    purpose = models.CharField(max_length=32, default="login_otp")
    destination_masked = models.CharField(max_length=32)
    provider = models.CharField(max_length=80, blank=True)
    provider_message_id = models.CharField(max_length=160, blank=True)
    status = models.CharField(
        max_length=16,
        choices=Status.choices,
        default=Status.QUEUED,
    )
    error_code = models.CharField(max_length=80, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "ارسال پیامک"
        verbose_name_plural = "ارسال‌های پیامک"
