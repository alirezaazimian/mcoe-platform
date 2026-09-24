from django.urls import include, path

from rest_framework.routers import DefaultRouter

from .views import (
    OnlineSessionViewSet,
    SessionAttendanceViewSet,
    StudentOnlineSessionJoinView,
    StudentOnlineSessionListView,
    SubjectViewSet,
    TeacherViewSet,
    TeachingAssignmentViewSet,
)


router = DefaultRouter()
router.register("teachers", TeacherViewSet)
router.register("subjects", SubjectViewSet)
router.register("assignments", TeachingAssignmentViewSet, basename="assignment")
router.register("sessions", OnlineSessionViewSet, basename="session")
router.register("attendance", SessionAttendanceViewSet, basename="attendance")


urlpatterns = [
    path("", include(router.urls)),
    path(
        "student/sessions/",
        StudentOnlineSessionListView.as_view(),
        name="student-online-sessions",
    ),
    path(
        "student/sessions/<int:pk>/join/",
        StudentOnlineSessionJoinView.as_view(),
        name="student-online-session-join",
    ),
]
