from datetime import timedelta

from django.utils import timezone

from rest_framework import serializers

from .models import (
    OnlineSession,
    SessionAttendance,
    Subject,
    Teacher,
    TeachingAssignment,
)
from .providers import get_online_class_provider


class TeacherSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(read_only=True)

    class Meta:
        model = Teacher
        fields = [
            "id",
            "personnel_code",
            "first_name",
            "last_name",
            "full_name",
            "mobile",
            "email",
            "bio",
            "is_active",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["created_at", "updated_at"]


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = [
            "id",
            "code",
            "name_fa",
            "name_en",
            "description",
            "sort_order",
            "is_active",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["created_at", "updated_at"]


class TeachingAssignmentSerializer(serializers.ModelSerializer):
    academic_year_title = serializers.CharField(
        source="academic_year.title", read_only=True
    )
    classroom_name = serializers.CharField(source="classroom.name", read_only=True)
    grade_name = serializers.CharField(
        source="classroom.grade.name_fa", read_only=True
    )
    subject_name = serializers.CharField(source="subject.name_fa", read_only=True)
    teacher_name = serializers.CharField(source="teacher.full_name", read_only=True)
    display_name = serializers.SerializerMethodField()

    class Meta:
        model = TeachingAssignment
        fields = [
            "id",
            "academic_year",
            "academic_year_title",
            "classroom",
            "classroom_name",
            "grade_name",
            "subject",
            "subject_name",
            "teacher",
            "teacher_name",
            "display_name",
            "is_active",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["created_at", "updated_at"]

    def get_display_name(self, assignment):
        return (
            f"{assignment.subject.name_fa} — {assignment.classroom.name} — "
            f"{assignment.teacher.full_name}"
        )

    def validate(self, attrs):
        instance = getattr(self, "instance", None)
        academic_year = attrs.get(
            "academic_year", getattr(instance, "academic_year", None)
        )
        classroom = attrs.get("classroom", getattr(instance, "classroom", None))

        if (
            academic_year
            and classroom
            and classroom.academic_year_id != academic_year.id
        ):
            raise serializers.ValidationError(
                "کلاس باید متعلق به سال تحصیلی انتخاب‌شده باشد."
            )

        return attrs


class OnlineSessionSerializer(serializers.ModelSerializer):
    assignment_label = serializers.CharField(
        source="assignment.__str__", read_only=True
    )
    academic_year_title = serializers.CharField(
        source="assignment.academic_year.title", read_only=True
    )
    classroom_name = serializers.CharField(
        source="assignment.classroom.name", read_only=True
    )
    grade_name = serializers.CharField(
        source="assignment.classroom.grade.name_fa", read_only=True
    )
    subject_name = serializers.CharField(
        source="assignment.subject.name_fa", read_only=True
    )
    teacher_name = serializers.CharField(
        source="assignment.teacher.full_name", read_only=True
    )
    status_label = serializers.CharField(source="get_status_display", read_only=True)
    ends_at = serializers.DateTimeField(read_only=True)
    roster_count = serializers.SerializerMethodField()
    provider_configured = serializers.SerializerMethodField()

    class Meta:
        model = OnlineSession
        fields = [
            "id",
            "assignment",
            "assignment_label",
            "academic_year_title",
            "classroom_name",
            "grade_name",
            "subject_name",
            "teacher_name",
            "title",
            "starts_at",
            "ends_at",
            "duration_minutes",
            "join_window_minutes",
            "status",
            "status_label",
            "allow_recording",
            "provider_key",
            "provider_configured",
            "recording_url",
            "notes",
            "roster_count",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "provider_key",
            "created_at",
            "updated_at",
        ]

    def get_roster_count(self, session):
        annotated = getattr(session, "roster_size", None)
        return annotated if annotated is not None else session.attendance_records.count()

    def get_provider_configured(self, session):
        return bool(get_online_class_provider().is_configured)

    def validate(self, attrs):
        instance = getattr(self, "instance", None)
        assignment = attrs.get("assignment", getattr(instance, "assignment", None))

        if assignment and not assignment.is_active:
            raise serializers.ValidationError(
                {"assignment": "تخصیص تدریس انتخاب‌شده غیرفعال است."}
            )

        if (
            instance
            and "assignment" in attrs
            and attrs["assignment"].pk != instance.assignment_id
            and instance.attendance_records.exists()
        ):
            raise serializers.ValidationError(
                {"assignment": "پس از ایجاد فهرست حضور، کلاس جلسه قابل تغییر نیست."}
            )

        return attrs


class SessionAttendanceSerializer(serializers.ModelSerializer):
    session_title = serializers.CharField(source="session.title", read_only=True)
    session_starts_at = serializers.DateTimeField(
        source="session.starts_at", read_only=True
    )
    student_name = serializers.CharField(source="student.full_name", read_only=True)
    national_code = serializers.CharField(
        source="student.national_code", read_only=True
    )
    classroom_name = serializers.CharField(
        source="session.assignment.classroom.name", read_only=True
    )
    status_label = serializers.CharField(source="get_status_display", read_only=True)
    attended_minutes = serializers.SerializerMethodField()

    class Meta:
        model = SessionAttendance
        fields = [
            "id",
            "session",
            "session_title",
            "session_starts_at",
            "student",
            "student_name",
            "national_code",
            "classroom_name",
            "status",
            "status_label",
            "first_joined_at",
            "last_left_at",
            "attended_minutes",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "session",
            "student",
            "first_joined_at",
            "last_left_at",
            "created_at",
            "updated_at",
        ]

    def get_attended_minutes(self, attendance):
        return attendance.attended_seconds // 60


class StudentOnlineSessionSerializer(serializers.ModelSerializer):
    classroom_name = serializers.CharField(
        source="assignment.classroom.name", read_only=True
    )
    grade_name = serializers.CharField(
        source="assignment.classroom.grade.name_fa", read_only=True
    )
    subject_name = serializers.CharField(
        source="assignment.subject.name_fa", read_only=True
    )
    teacher_name = serializers.CharField(
        source="assignment.teacher.full_name", read_only=True
    )
    status_label = serializers.CharField(source="get_status_display", read_only=True)
    ends_at = serializers.DateTimeField(read_only=True)
    join_available = serializers.SerializerMethodField()
    join_message = serializers.SerializerMethodField()

    class Meta:
        model = OnlineSession
        fields = [
            "id",
            "title",
            "classroom_name",
            "grade_name",
            "subject_name",
            "teacher_name",
            "starts_at",
            "ends_at",
            "duration_minutes",
            "status",
            "status_label",
            "allow_recording",
            "recording_url",
            "join_available",
            "join_message",
        ]

    @staticmethod
    def _join_state(session):
        provider = get_online_class_provider()

        if not provider.is_configured:
            return False, "سرویس برگزاری کلاس هنوز متصل نشده است."

        if session.status not in {
            OnlineSession.Status.SCHEDULED,
            OnlineSession.Status.LIVE,
        }:
            return False, "این جلسه در وضعیت قابل ورود نیست."

        now = timezone.now()
        opens_at = session.starts_at - timedelta(
            minutes=session.join_window_minutes
        )

        if now < opens_at:
            return False, "زمان ورود به کلاس هنوز نرسیده است."

        if now > session.ends_at + timedelta(minutes=30):
            return False, "زمان این جلسه پایان یافته است."

        return True, "ورود به کلاس فعال است."

    def get_join_available(self, session):
        return self._join_state(session)[0]

    def get_join_message(self, session):
        return self._join_state(session)[1]
