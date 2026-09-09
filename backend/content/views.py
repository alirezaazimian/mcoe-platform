from rest_framework import (
    generics,
    parsers,
    viewsets,
)

from .models import (
    Article,
    CollaborationRequest,
    EducationLevel,
    Event,
    Facility,
    HeroSlide,
    KindergartenSlide,
    News,
    Partner,
    SiteImage,
    SiteSection,
    WorkingGroup,
    WorkingGroupMember,
)
from .permissions import (
    PublicReadAdminWritePermission,
)
from .serializers import (
    ArticleSerializer,
    CollaborationRequestSerializer,
    EducationLevelSerializer,
    EventSerializer,
    FacilitySerializer,
    HeroSlideSerializer,
    KindergartenSlideSerializer,
    NewsSerializer,
    PartnerSerializer,
    SiteImageSerializer,
    SiteSectionSerializer,
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
    viewsets.ModelViewSet
):
    serializer_class = (
        WorkingGroupMemberSerializer
    )

    permission_classes = [
        PublicReadAdminWritePermission
    ]

    parser_classes = CONTENT_PARSERS

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


def is_staff_request(request):
    user = request.user

    return bool(
        user
        and user.is_authenticated
        and user.is_staff
    )


class ActiveContentViewSet(viewsets.ModelViewSet):
    permission_classes = [
        PublicReadAdminWritePermission
    ]
    parser_classes = CONTENT_PARSERS

    def get_queryset(self):
        queryset = self.queryset.all()

        if is_staff_request(self.request):
            return queryset

        return queryset.filter(is_active=True)


class EducationLevelViewSet(ActiveContentViewSet):
    queryset = EducationLevel.objects.all()
    serializer_class = EducationLevelSerializer
    lookup_field = 'slug'


class PartnerViewSet(ActiveContentViewSet):
    queryset = Partner.objects.all()
    serializer_class = PartnerSerializer


class SiteImageViewSet(ActiveContentViewSet):
    queryset = SiteImage.objects.all()
    serializer_class = SiteImageSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        section = self.request.query_params.get('section')

        if section:
            queryset = queryset.filter(section=section)

        return queryset


class FacilityViewSet(ActiveContentViewSet):
    queryset = Facility.objects.all()
    serializer_class = FacilitySerializer


class SiteSectionViewSet(viewsets.ModelViewSet):
    queryset = SiteSection.objects.all()
    serializer_class = SiteSectionSerializer
    lookup_field = 'key'
    permission_classes = [
        PublicReadAdminWritePermission
    ]
    parser_classes = CONTENT_PARSERS


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
    viewsets.ModelViewSet
):
    serializer_class = HeroSlideSerializer

    permission_classes = [
        PublicReadAdminWritePermission
    ]

    parser_classes = CONTENT_PARSERS

    def get_queryset(self):
        queryset = HeroSlide.objects.all().order_by(
            "sort_order",
            "id",
        )

        user = self.request.user

        is_staff_request = bool(
            user
            and user.is_authenticated
            and user.is_staff
        )

        if is_staff_request:
            return queryset

        return queryset.filter(
            is_active=True
        )


class KindergartenSlideViewSet(
    ActiveContentViewSet
):
    queryset = KindergartenSlide.objects.all()
    serializer_class = KindergartenSlideSerializer


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
