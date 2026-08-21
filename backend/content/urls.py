from rest_framework.routers import DefaultRouter

from .views import (
    ArticleViewSet,
    CollaborationRequestCreateView,
    EventViewSet,
    HeroSlideViewSet,
    NewsViewSet,
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

from django.urls import path

urlpatterns = [
    path(
        "collaboration-requests/",
        CollaborationRequestCreateView.as_view(),
        name="collaboration-request-create",
    ),
]

urlpatterns += router.urls