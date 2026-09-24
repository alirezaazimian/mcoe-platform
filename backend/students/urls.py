from django.urls import include, path

from rest_framework.routers import DefaultRouter

from .views import (
    AcademicYearViewSet,
    ClassroomViewSet,
    EnrollmentViewSet,
    GradeLevelViewSet,
    StudentOtpRequestView,
    StudentOtpVerifyView,
    StudentImportView,
    StudentPortalLogoutView,
    StudentPortalMeView,
    StudentTokenRefreshView,
    StudentViewSet,
)


router = DefaultRouter()
router.register("academic-years", AcademicYearViewSet)
router.register("grades", GradeLevelViewSet)
router.register("classrooms", ClassroomViewSet, basename="classroom")
router.register("students", StudentViewSet, basename="student")
router.register("enrollments", EnrollmentViewSet, basename="enrollment")


urlpatterns = [
    path("", include(router.urls)),
    path(
        "student-import/",
        StudentImportView.as_view(),
        name="student-import",
    ),
    path(
        "student-auth/request-otp/",
        StudentOtpRequestView.as_view(),
        name="student-request-otp",
    ),
    path(
        "student-auth/verify-otp/",
        StudentOtpVerifyView.as_view(),
        name="student-verify-otp",
    ),
    path(
        "student-auth/refresh/",
        StudentTokenRefreshView.as_view(),
        name="student-token-refresh",
    ),
    path(
        "student-auth/me/",
        StudentPortalMeView.as_view(),
        name="student-portal-me",
    ),
    path(
        "student-auth/logout/",
        StudentPortalLogoutView.as_view(),
        name="student-portal-logout",
    ),
]
