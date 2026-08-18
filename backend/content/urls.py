from rest_framework.routers import DefaultRouter

from .views import WorkingGroupViewSet, WorkingGroupMemberViewSet


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


urlpatterns = router.urls