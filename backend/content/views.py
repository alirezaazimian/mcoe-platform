from rest_framework import generics, parsers, viewsets

from .models import (
    Article,
    CollaborationRequest,
    Event,
    HeroSlide,
    News,
    WorkingGroup,
    WorkingGroupMember,
)
from .serializers import (
    ArticleSerializer,
    CollaborationRequestSerializer,
    EventSerializer,
    HeroSlideSerializer,
    NewsSerializer,
    WorkingGroupMemberSerializer,
    WorkingGroupSerializer,
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

class ArticleViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ArticleSerializer

    def get_queryset(self):
        queryset = Article.objects.filter(
            status=Article.Status.PUBLISHED
        ).order_by("-publish_date", "-id")

        category = self.request.query_params.get("category")
        featured = self.request.query_params.get("featured")

        if category:
            queryset = queryset.filter(category=category)

        if featured == "true":
            queryset = queryset.filter(is_featured=True)

        return queryset

class EventViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = EventSerializer

    def get_queryset(self):
        queryset = Event.objects.all().order_by("event_date")

        status = self.request.query_params.get("status")
        category = self.request.query_params.get("category")

        if status:
            queryset = queryset.filter(status=status)

        if category:
            queryset = queryset.filter(category=category)

        return queryset


class HeroSlideViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = HeroSlideSerializer

    def get_queryset(self):
        return HeroSlide.objects.filter(
            is_active=True
        ).order_by(
            "sort_order",
            "id",
        )


class CollaborationRequestCreateView(generics.CreateAPIView):
    queryset = CollaborationRequest.objects.all()
    serializer_class = CollaborationRequestSerializer

    parser_classes = [
        parsers.MultiPartParser,
        parsers.FormParser,
    ]

