from rest_framework import viewsets

from .models import News, WorkingGroup, WorkingGroupMember
from .serializers import (
    NewsSerializer,
    WorkingGroupSerializer,
    WorkingGroupMemberSerializer,
)


class WorkingGroupViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = WorkingGroup.objects.all()
    serializer_class = WorkingGroupSerializer
    lookup_field = "slug"


class WorkingGroupMemberViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = WorkingGroupMemberSerializer

    def get_queryset(self):
        queryset = WorkingGroupMember.objects.select_related("group").all()

        group_slug = self.request.query_params.get("group_slug")

        if group_slug:
            queryset = queryset.filter(group__slug=group_slug)

        return queryset

class NewsViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = NewsSerializer

    def get_queryset(self):
        queryset = News.objects.filter(
            status=News.Status.PUBLISHED
        ).order_by("-publish_date", "-id")

        category = self.request.query_params.get("category")
        featured = self.request.query_params.get("featured")

        if category:
            queryset = queryset.filter(category=category)

        if featured == "true":
            queryset = queryset.filter(is_featured=True)

        return queryset