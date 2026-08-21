from django.contrib import admin

from .models import (
    Article,
    CollaborationRequest,
    Event,
    HeroSlide,
    News,
    WorkingGroup,
    WorkingGroupMember,
)


class WorkingGroupMemberInline(admin.TabularInline):
    model = WorkingGroupMember
    extra = 0


@admin.register(WorkingGroup)
class WorkingGroupAdmin(admin.ModelAdmin):
    list_display = (
        "name_fa",
        "name_en",
        "slug",
        "sort_order",
        "updated_at",
    )

    list_editable = (
        "sort_order",
    )

    search_fields = (
        "name_fa",
        "name_en",
        "slug",
    )

    prepopulated_fields = {
        "slug": ("name_en",),
    }

    inlines = [
        WorkingGroupMemberInline,
    ]


@admin.register(WorkingGroupMember)
class WorkingGroupMemberAdmin(admin.ModelAdmin):
    list_display = (
        "name_fa",
        "group",
        "role_fa",
        "sort_order",
    )

    list_filter = (
        "group",
    )

    search_fields = (
        "name_fa",
        "name_en",
        "role_fa",
        "role_en",
    )

    list_editable = (
        "sort_order",
    )


@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = (
        "title_fa",
        "category",
        "status",
        "publish_date",
        "is_featured",
        "updated_at",
    )

    list_filter = (
        "status",
        "category",
        "is_featured",
        "publish_date",
    )

    search_fields = (
        "title_fa",
        "title_en",
        "summary_fa",
        "summary_en",
        "author_name",
    )

    list_editable = (
        "status",
        "is_featured",
    )

    date_hierarchy = "publish_date"


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = (
        "title_fa",
        "category",
        "author_name",
        "status",
        "publish_date",
        "reading_time_min",
        "is_featured",
        "updated_at",
    )

    list_filter = (
        "status",
        "category",
        "is_featured",
        "publish_date",
    )

    search_fields = (
        "title_fa",
        "title_en",
        "summary_fa",
        "summary_en",
        "author_name",
    )

    list_editable = (
        "status",
        "is_featured",
    )

    date_hierarchy = "publish_date"

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = (
        "title_fa",
        "category",
        "status",
        "event_date",
        "capacity",
        "updated_at",
    )

    list_filter = (
        "status",
        "category",
        "event_date",
    )

    search_fields = (
        "title_fa",
        "title_en",
        "description_fa",
        "description_en",
        "venue_fa",
        "venue_en",
        "organizer_fa",
        "organizer_en",
    )

    list_editable = (
        "status",
    )

    date_hierarchy = "event_date"


@admin.register(HeroSlide)
class HeroSlideAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "is_active",
        "sort_order",
        "updated_at",
    )

    list_filter = (
        "is_active",
    )

    list_editable = (
        "is_active",
        "sort_order",
    )

    ordering = (
        "sort_order",
        "id",
    )


@admin.register(CollaborationRequest)
class CollaborationRequestAdmin(admin.ModelAdmin):
    list_display = (
        "full_name",
        "expertise_area",
        "phone",
        "status",
        "created_at",
    )

    list_filter = (
        "status",
        "expertise_area",
        "created_at",
    )

    search_fields = (
        "full_name",
        "email",
        "phone",
        "expertise_area",
        "message",
    )

    list_editable = (
        "status",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    date_hierarchy = "created_at"