from rest_framework.routers import DefaultRouter

from .views import (
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


urlpatterns = router.urls