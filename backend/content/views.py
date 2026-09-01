from rest_framework import (
    generics,
    parsers,
    viewsets,
)

from .models import (
    Article,
    CollaborationRequest,
    Event,
    HeroSlide,
    News,
    WorkingGroup,
    WorkingGroupMember,
)
from .permissions import (
    PublicReadAdminWritePermission,
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


CONTENT_PARSERS = [
    parsers.JSONParser,
    parsers.MultiPartParser,
    parsers.FormParser,
]


class WorkingGroupViewSet(
    viewsets.ModelViewSet
):
    queryset = WorkingGroup.objects.all()
    serializer_class = WorkingGroupSerializer
    lookup_field = "slug"

    permission_classes = [
        PublicReadAdminWritePermission
    ]

    parser_classes = CONTENT_PARSERS


class WorkingGroupMemberViewSet(
    viewsets.ReadOnlyModelViewSet
):
    serializer_class = (
        WorkingGroupMemberSerializer
    )

    def get_queryset(self):
        queryset = (
            WorkingGroupMember.objects
            .select_related("group")
            .all()
        )

        group_slug = (
            self.request.query_params.get(
                "group_slug"
            )
        )

        if group_slug:
            queryset = queryset.filter(
                group__slug=group_slug
            )

        return queryset


class NewsViewSet(
    viewsets.ModelViewSet
):
    serializer_class = NewsSerializer

    permission_classes = [
        PublicReadAdminWritePermission
    ]

    parser_classes = CONTENT_PARSERS

    def get_queryset(self):
        queryset = News.objects.all().order_by(
            "-publish_date",
            "-id",
        )

        admin_requested = (
            self.request.query_params.get(
                "admin"
            )
            == "true"
        )

        user = self.request.user

        is_staff_request = bool(
            user
            and user.is_authenticated
            and user.is_staff
        )

        if not (
            admin_requested
            and is_staff_request
        ):
            queryset = queryset.filter(
                status=News.Status.PUBLISHED
            )

        category = (
            self.request.query_params.get(
                "category"
            )
        )

        featured = (
            self.request.query_params.get(
                "featured"
            )
        )

        if category:
            queryset = queryset.filter(
                category=category
            )

        if featured == "true":
            queryset = queryset.filter(
                is_featured=True
            )

        return queryset


class ArticleViewSet(
    viewsets.ModelViewSet
):
    serializer_class = ArticleSerializer

    permission_classes = [
        PublicReadAdminWritePermission
    ]

    parser_classes = CONTENT_PARSERS

    def get_queryset(self):
        queryset = Article.objects.all().order_by(
            "-publish_date",
            "-id",
        )

        admin_requested = (
            self.request.query_params.get(
                "admin"
            )
            == "true"
        )

        user = self.request.user

        is_staff_request = bool(
            user
            and user.is_authenticated
            and user.is_staff
        )

        if not (
            admin_requested
            and is_staff_request
        ):
            queryset = queryset.filter(
                status=Article.Status.PUBLISHED
            )

        category = (
            self.request.query_params.get(
                "category"
            )
        )

        featured = (
            self.request.query_params.get(
                "featured"
            )
        )

        if category:
            queryset = queryset.filter(
                category=category
            )

        if featured == "true":
            queryset = queryset.filter(
                is_featured=True
            )

        return queryset


class EventViewSet(
    viewsets.ModelViewSet
):
    serializer_class = EventSerializer

    permission_classes = [
        PublicReadAdminWritePermission
    ]

    parser_classes = CONTENT_PARSERS

    def get_queryset(self):
        queryset = Event.objects.all().order_by(
            "event_date"
        )

        status = (
            self.request.query_params.get(
                "status"
            )
        )

        category = (
            self.request.query_params.get(
                "category"
            )
        )

        if status:
            queryset = queryset.filter(
                status=status
            )

        if category:
            queryset = queryset.filter(
                category=category
            )

        return queryset


class HeroSlideViewSet(
    viewsets.ReadOnlyModelViewSet
):
    serializer_class = HeroSlideSerializer

    def get_queryset(self):
        return HeroSlide.objects.filter(
            is_active=True
        ).order_by(
            "sort_order",
            "id",
        )


class CollaborationRequestCreateView(
    generics.CreateAPIView
):
    queryset = (
        CollaborationRequest.objects.all()
    )

    serializer_class = (
        CollaborationRequestSerializer
    )

    parser_classes = [
        parsers.MultiPartParser,
        parsers.FormParser,
    ]
