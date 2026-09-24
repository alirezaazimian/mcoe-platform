from django.contrib import admin

from .models import (
    AcademicYear,
    Classroom,
    Enrollment,
    GradeLevel,
    GuardianContact,
    OtpChallenge,
    SmsDelivery,
    Student,
    StudentImportBatch,
)


@admin.register(AcademicYear)
class AcademicYearAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "is_active")
    list_filter = ("is_active",)


@admin.register(GradeLevel)
class GradeLevelAdmin(admin.ModelAdmin):
    list_display = ("name_fa", "code", "stage", "sort_order")
    list_filter = ("stage", "is_active")
    ordering = ("sort_order",)


@admin.register(Classroom)
class ClassroomAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "grade",
        "academic_year",
        "capacity",
        "is_active",
    )
    list_filter = ("academic_year", "grade", "is_active")


class GuardianContactInline(admin.TabularInline):
    model = GuardianContact
    extra = 0


class EnrollmentInline(admin.TabularInline):
    model = Enrollment
    extra = 0


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = (
        "national_code",
        "first_name",
        "last_name",
        "sms_mobile",
        "portal_enabled",
        "is_active",
    )
    search_fields = (
        "national_code",
        "first_name",
        "last_name",
        "primary_mobile",
        "sms_mobile",
    )
    list_filter = ("portal_enabled", "is_active")
    inlines = (GuardianContactInline, EnrollmentInline)


@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = (
        "student",
        "academic_year",
        "grade",
        "classroom",
        "status",
    )
    list_filter = ("academic_year", "grade", "classroom", "status")
    search_fields = (
        "student__national_code",
        "student__first_name",
        "student__last_name",
    )


@admin.register(StudentImportBatch)
class StudentImportBatchAdmin(admin.ModelAdmin):
    list_display = (
        "created_at",
        "academic_year",
        "status",
        "created_by",
    )
    readonly_fields = (
        "checksum",
        "filenames",
        "report",
        "created_at",
    )


@admin.register(SmsDelivery)
class SmsDeliveryAdmin(admin.ModelAdmin):
    list_display = (
        "created_at",
        "destination_masked",
        "purpose",
        "provider",
        "status",
    )
    list_filter = ("status", "provider", "purpose")
    readonly_fields = (
        "student",
        "destination_masked",
        "purpose",
        "provider",
        "provider_message_id",
        "status",
        "error_code",
        "created_at",
        "updated_at",
    )


@admin.register(OtpChallenge)
class OtpChallengeAdmin(admin.ModelAdmin):
    list_display = (
        "student",
        "created_at",
        "expires_at",
        "attempt_count",
        "consumed_at",
    )
    readonly_fields = (
        "student",
        "mobile",
        "code_hash",
        "expires_at",
        "attempt_count",
        "max_attempts",
        "consumed_at",
        "request_ip",
        "created_at",
    )

    def has_add_permission(self, request):
        return False


    def has_change_permission(self, request, obj=None):
        return False
