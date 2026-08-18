from rest_framework import serializers

from .models import WorkingGroup, WorkingGroupMember


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