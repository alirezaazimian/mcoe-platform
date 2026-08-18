from rest_framework import viewsets

from .models import WorkingGroup, WorkingGroupMember
from .serializers import (
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