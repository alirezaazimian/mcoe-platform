from rest_framework.routers import DefaultRouter

from .views import (
    ArticleViewSet,
    CollaborationRequestCreateView,
    EducationLevelViewSet,
    EventViewSet,
    FacilityViewSet,
    HeroSlideViewSet,
    KindergartenSlideViewSet,
    NewsViewSet,
    PartnerViewSet,
    SiteImageViewSet,
    SiteSectionViewSet,
    WorkingGroupMemberViewSet,
    WorkingGroupViewSet,
)


router = DefaultRouter()

router.register(
    "working-groups",
    WorkingGroupViewSet,
    basename="working-group",
)

router.register(
    "working-group-members",
    WorkingGroupMemberViewSet,
    basename="working-group-member",
)

router.register(
    "education-levels",
    EducationLevelViewSet,
    basename="education-level",
)

router.register(
    "partners",
    PartnerViewSet,
    basename="partner",
)

router.register(
    "site-images",
    SiteImageViewSet,
    basename="site-image",
)

router.register(
    "facilities",
    FacilityViewSet,
    basename="facility",
)

router.register(
    "site-sections",
    SiteSectionViewSet,
    basename="site-section",
)

router.register(
    "news",
    NewsViewSet,
    basename="news",
)


router.register(
    "articles",
    ArticleViewSet,
    basename="article",
)


router.register(
    "events",
    EventViewSet,
    basename="event",
)

router.register(
    "hero-slides",
    HeroSlideViewSet,
    basename="hero-slide",
)

router.register(
    "kindergarten-slides",
    KindergartenSlideViewSet,
    basename="kindergarten-slide",
)

from django.urls import path

urlpatterns = [
    path(
        "collaboration-requests/",
        CollaborationRequestCreateView.as_view(),
        name="collaboration-request-create",
    ),
]

urlpatterns += router.urls
