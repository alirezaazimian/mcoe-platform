from rest_framework import serializers

from .models import HeroSlide, Event, Article, News, WorkingGroup, WorkingGroupMember


class WorkingGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkingGroup
        fields = [
            'id',
            'name_fa',
            'name_en',
            'slug',
            'description_fa',
            'description_en',
            'icon',
            'image',
            'sort_order',
        ]


class WorkingGroupMemberSerializer(serializers.ModelSerializer):
    group_slug = serializers.SlugRelatedField(
        source='group',
        slug_field='slug',
        read_only=True,
    )

    photo_url = serializers.ImageField(
        source='photo',
        read_only=True,
    )

    class Meta:
        model = WorkingGroupMember
        fields = [
            'id',
            'name_fa',
            'name_en',
            'role_fa',
            'role_en',
            'summary_fa',
            'summary_en',
            'photo_url',
            'linkedin_url',
            'group_slug',
            'sort_order',
        ]

class NewsSerializer(serializers.ModelSerializer):
    created_date = serializers.DateTimeField(
        source="created_at",
        read_only=True,
    )

    class Meta:
        model = News
        fields = [
            "id",
            "title_fa",
            "title_en",
            "summary_fa",
            "summary_en",
            "body_fa",
            "body_en",
            "featured_image",
            "category",
            "tags",
            "author_name",
            "status",
            "publish_date",
            "slug_fa",
            "slug_en",
            "is_featured",
            "created_date",
        ]


class ArticleSerializer(serializers.ModelSerializer):
    created_date = serializers.DateTimeField(
        source="created_at",
        read_only=True,
    )

    class Meta:
        model = Article
        fields = [
            "id",
            "title_fa",
            "title_en",
            "summary_fa",
            "summary_en",
            "body_fa",
            "body_en",
            "featured_image",
            "category",
            "tags",
            "author_name",
            "reading_time_min",
            "status",
            "publish_date",
            "slug_fa",
            "slug_en",
            "is_featured",
            "created_date",
        ]


class EventSerializer(serializers.ModelSerializer):
    created_date = serializers.DateTimeField(
        source="created_at",
        read_only=True,
    )

    class Meta:
        model = Event
        fields = [
            "id",
            "title_fa",
            "title_en",
            "description_fa",
            "description_en",
            "banner_image",
            "category",
            "event_date",
            "venue_fa",
            "venue_en",
            "organizer_fa",
            "organizer_en",
            "capacity",
            "registration_deadline",
            "registration_url",
            "map_url",
            "status",
            "created_date",
        ]

class HeroSlideSerializer(serializers.ModelSerializer):
    image_url = serializers.ImageField(
        source="image",
        read_only=True,
    )

    class Meta:
        model = HeroSlide
        fields = [
            "id",
            "image_url",
            "alt_fa",
            "alt_en",
            "is_active",
            "sort_order",
        ]