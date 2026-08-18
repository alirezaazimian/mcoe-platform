from django.contrib import admin

from .models import WorkingGroup, WorkingGroupMember


class WorkingGroupMemberInline(admin.TabularInline):
    model = WorkingGroupMember
    extra = 0


@admin.register(WorkingGroup)
class WorkingGroupAdmin(admin.ModelAdmin):
    list_display = (
        'name_fa',
        'name_en',
        'slug',
        'sort_order',
        'updated_at',
    )

    list_editable = (
        'sort_order',
    )

    search_fields = (
        'name_fa',
        'name_en',
        'slug',
    )

    prepopulated_fields = {
        'slug': ('name_en',),
    }

    inlines = [
        WorkingGroupMemberInline,
    ]


@admin.register(WorkingGroupMember)
class WorkingGroupMemberAdmin(admin.ModelAdmin):
    list_display = (
        'name_fa',
        'group',
        'role_fa',
        'sort_order',
    )

    list_filter = (
        'group',
    )

    search_fields = (
        'name_fa',
        'name_en',
        'role_fa',
        'role_en',
    )

    list_editable = (
        'sort_order',
    )