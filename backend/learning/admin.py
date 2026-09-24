from django.contrib import admin

from .models import (
    OnlineSession,
    SessionAttendance,
    Subject,
    Teacher,
    TeachingAssignment,
)


@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    list_display = ("full_name", "personnel_code", "mobile", "is_active")
    search_fields = ("first_name", "last_name", "personnel_code", "mobile")
    list_filter = ("is_active",)


@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ("name_fa", "code", "sort_order", "is_active")
    search_fields = ("name_fa", "name_en", "code")
    list_filter = ("is_active",)


@admin.register(TeachingAssignment)
class TeachingAssignmentAdmin(admin.ModelAdmin):
    list_display = ("subject", "teacher", "classroom", "academic_year", "is_active")
    list_filter = ("academic_year", "classroom__grade", "subject", "is_active")
    search_fields = (
        "teacher__first_name",
        "teacher__last_name",
        "subject__name_fa",
        "classroom__name",
    )


class SessionAttendanceInline(admin.TabularInline):
    model = SessionAttendance
    extra = 0
    readonly_fields = ("student", "first_joined_at", "last_left_at")


@admin.register(OnlineSession)
class OnlineSessionAdmin(admin.ModelAdmin):
    list_display = ("title", "assignment", "starts_at", "status", "provider_key")
    list_filter = ("status", "assignment__academic_year", "assignment__classroom")
    search_fields = ("title", "assignment__teacher__last_name", "assignment__subject__name_fa")
    readonly_fields = ("provider_key", "external_meeting_id", "provider_metadata")
    inlines = (SessionAttendanceInline,)


@admin.register(SessionAttendance)
class SessionAttendanceAdmin(admin.ModelAdmin):
    list_display = ("session", "student", "status", "attended_seconds")
    list_filter = ("status", "session__assignment__classroom")
    search_fields = ("student__national_code", "student__first_name", "student__last_name")
