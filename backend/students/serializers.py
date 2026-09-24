from django.contrib.auth import get_user_model
from django.db import transaction

from rest_framework import serializers

from .models import (
    AcademicYear,
    Classroom,
    Enrollment,
    GradeLevel,
    GuardianContact,
    Student,
)
from .validators import (
    normalize_mobile,
    normalize_national_code,
    validate_national_code,
)


User = get_user_model()


class AcademicYearSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicYear
        fields = [
            "id",
            "title",
            "slug",
            "is_active",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["created_at", "updated_at"]

    def _deactivate_other_years(self, instance):
        if instance.is_active:
            AcademicYear.objects.exclude(pk=instance.pk).update(
                is_active=False
            )

    @transaction.atomic
    def create(self, validated_data):
        instance = super().create(validated_data)
        self._deactivate_other_years(instance)
        return instance

    @transaction.atomic
    def update(self, instance, validated_data):
        instance = super().update(instance, validated_data)
        self._deactivate_other_years(instance)
        return instance


class GradeLevelSerializer(serializers.ModelSerializer):
    stage_label = serializers.CharField(
        source="get_stage_display",
        read_only=True,
    )

    class Meta:
        model = GradeLevel
        fields = [
            "id",
            "code",
            "name_fa",
            "stage",
            "stage_label",
            "sort_order",
            "is_active",
        ]


class ClassroomSerializer(serializers.ModelSerializer):
    academic_year_title = serializers.CharField(
        source="academic_year.title",
        read_only=True,
    )
    grade_name = serializers.CharField(
        source="grade.name_fa",
        read_only=True,
    )
    student_count = serializers.SerializerMethodField()

    class Meta:
        model = Classroom
        fields = [
            "id",
            "academic_year",
            "academic_year_title",
            "grade",
            "grade_name",
            "name",
            "capacity",
            "student_count",
            "is_active",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["created_at", "updated_at"]

    def get_student_count(self, classroom):
        annotated = getattr(
            classroom,
            "active_student_count",
            None,
        )

        if annotated is not None:
            return annotated

        return classroom.enrollments.filter(
            status=Enrollment.Status.ACTIVE
        ).count()


class GuardianContactSerializer(serializers.ModelSerializer):
    relation_label = serializers.CharField(
        source="get_relation_display",
        read_only=True,
    )

    class Meta:
        model = GuardianContact
        fields = [
            "id",
            "relation",
            "relation_label",
            "full_name",
            "national_code",
            "mobile",
            "email",
            "can_receive_sms",
            "extra_data",
        ]
        read_only_fields = ["id"]


class EnrollmentSummarySerializer(serializers.ModelSerializer):
    academic_year_title = serializers.CharField(
        source="academic_year.title",
        read_only=True,
    )
    grade_name = serializers.CharField(
        source="grade.name_fa",
        read_only=True,
    )
    classroom_name = serializers.CharField(
        source="classroom.name",
        read_only=True,
        allow_null=True,
    )
    status_label = serializers.CharField(
        source="get_status_display",
        read_only=True,
    )

    class Meta:
        model = Enrollment
        fields = [
            "id",
            "academic_year",
            "academic_year_title",
            "grade",
            "grade_name",
            "classroom",
            "classroom_name",
            "status",
            "status_label",
        ]


class StudentSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(read_only=True)
    username = serializers.CharField(
        source="user.username",
        read_only=True,
        allow_null=True,
    )
    guardians = GuardianContactSerializer(many=True, read_only=True)
    current_enrollment = serializers.SerializerMethodField()
    current_academic_year = serializers.SerializerMethodField()
    current_grade = serializers.SerializerMethodField()
    current_classroom = serializers.SerializerMethodField()

    class Meta:
        model = Student
        fields = [
            "id",
            "username",
            "national_code",
            "first_name",
            "last_name",
            "full_name",
            "father_name",
            "gender",
            "birth_date_jalali",
            "primary_mobile",
            "sms_mobile",
            "sms_mobile_verified_at",
            "home_phone",
            "postal_code",
            "address",
            "portal_enabled",
            "is_active",
            "extra_data",
            "guardians",
            "current_enrollment",
            "current_academic_year",
            "current_grade",
            "current_classroom",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "username",
            "sms_mobile_verified_at",
            "created_at",
            "updated_at",
        ]

    def get_current_enrollment(self, student):
        active = self._active_enrollment(student)

        if not active:
            return None

        return EnrollmentSummarySerializer(active).data

    @staticmethod
    def _active_enrollment(student):
        cached = getattr(
            student,
            "_mcoe_active_enrollment",
            None,
        )

        if cached is not None:
            return cached

        enrollments = list(student.enrollments.all())
        enrollment = next(
            (
                item
                for item in enrollments
                if item.academic_year.is_active
            ),
            enrollments[0] if enrollments else None,
        )
        student._mcoe_active_enrollment = enrollment or False
        return enrollment

    def get_current_academic_year(self, student):
        enrollment = self._active_enrollment(student)
        return enrollment.academic_year.title if enrollment else ""

    def get_current_grade(self, student):
        enrollment = self._active_enrollment(student)
        return enrollment.grade.name_fa if enrollment else ""

    def get_current_classroom(self, student):
        enrollment = self._active_enrollment(student)
        return (
            enrollment.classroom.name
            if enrollment and enrollment.classroom_id
            else ""
        )

    def validate_national_code(self, value):
        code = normalize_national_code(value)
        validate_national_code(code)
        return code

    def validate_primary_mobile(self, value):
        return normalize_mobile(value)

    def validate_sms_mobile(self, value):
        return normalize_mobile(value)

    def validate(self, attrs):
        instance = getattr(self, "instance", None)
        portal_enabled = attrs.get(
            "portal_enabled",
            getattr(instance, "portal_enabled", False),
        )
        sms_mobile = attrs.get(
            "sms_mobile",
            getattr(instance, "sms_mobile", ""),
        )

        if portal_enabled and not sms_mobile:
            raise serializers.ValidationError(
                {"sms_mobile": "برای فعال‌سازی پرتال، شماره پیامک لازم است."}
            )

        return attrs

    @transaction.atomic
    def create(self, validated_data):
        national_code = validated_data["national_code"]
        user, created = User.objects.get_or_create(
            username=national_code,
            defaults={
                "first_name": validated_data.get("first_name", ""),
                "last_name": validated_data.get("last_name", ""),
                "email": "",
                "is_active": True,
                "is_staff": False,
            },
        )

        if not created:
            raise serializers.ValidationError(
                {"national_code": "این کد کاربری قبلاً استفاده شده است."}
            )

        if created:
            user.set_unusable_password()
            user.save(update_fields=["password"])

        validated_data["user"] = user
        return super().create(validated_data)

    @transaction.atomic
    def update(self, instance, validated_data):
        if (
            "national_code" in validated_data
            and validated_data["national_code"] != instance.national_code
        ):
            raise serializers.ValidationError(
                {"national_code": "کد ملی پس از ایجاد قابل تغییر نیست."}
            )

        student = super().update(instance, validated_data)

        if student.user_id:
            user = student.user
            changed = []

            if user.first_name != student.first_name:
                user.first_name = student.first_name
                changed.append("first_name")

            if user.last_name != student.last_name:
                user.last_name = student.last_name
                changed.append("last_name")

            if changed:
                user.save(update_fields=changed)

        return student


class EnrollmentSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(
        source="student.full_name",
        read_only=True,
    )
    national_code = serializers.CharField(
        source="student.national_code",
        read_only=True,
    )
    academic_year_title = serializers.CharField(
        source="academic_year.title",
        read_only=True,
    )
    grade_name = serializers.CharField(
        source="grade.name_fa",
        read_only=True,
    )
    classroom_name = serializers.CharField(
        source="classroom.name",
        read_only=True,
        allow_null=True,
    )

    class Meta:
        model = Enrollment
        fields = [
            "id",
            "student",
            "student_name",
            "national_code",
            "academic_year",
            "academic_year_title",
            "grade",
            "grade_name",
            "classroom",
            "classroom_name",
            "status",
            "source_file",
            "source_row",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "source_file",
            "source_row",
            "created_at",
            "updated_at",
        ]

    def validate(self, attrs):
        instance = getattr(self, "instance", None)
        academic_year = attrs.get(
            "academic_year",
            getattr(instance, "academic_year", None),
        )
        grade = attrs.get(
            "grade",
            getattr(instance, "grade", None),
        )
        classroom = attrs.get(
            "classroom",
            getattr(instance, "classroom", None),
        )

        if classroom and (
            classroom.academic_year_id != academic_year.id
            or classroom.grade_id != grade.id
        ):
            raise serializers.ValidationError(
                "کلاس باید متعلق به همین سال تحصیلی و پایه باشد."
            )

        return attrs


class OtpRequestSerializer(serializers.Serializer):
    national_code = serializers.CharField(max_length=16)

    def validate_national_code(self, value):
        code = normalize_national_code(value)
        validate_national_code(code)
        return code


class OtpVerifySerializer(OtpRequestSerializer):
    code = serializers.RegexField(r"^\d{6}$")


class StudentPortalSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(read_only=True)
    current_enrollment = serializers.SerializerMethodField()

    class Meta:
        model = Student
        fields = [
            "id",
            "national_code",
            "first_name",
            "last_name",
            "full_name",
            "current_enrollment",
        ]

    def get_current_enrollment(self, student):
        enrollment = (
            student.enrollments
            .filter(academic_year__is_active=True)
            .select_related("academic_year", "grade", "classroom")
            .first()
        )

        if not enrollment:
            return None

        return EnrollmentSummarySerializer(enrollment).data
