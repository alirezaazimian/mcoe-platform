from django.urls import path

from .views import (
    CurrentUserView,
    LoginView,
    LogoutView,
    PasswordResetConfirmView,
    PasswordResetRequestView,
    StaffTokenRefreshView,
)


urlpatterns = [
    path(
        "login/",
        LoginView.as_view(),
        name="auth-login",
    ),

    path(
        "refresh/",
        StaffTokenRefreshView.as_view(),
        name="auth-refresh",
    ),

    path(
        "me/",
        CurrentUserView.as_view(),
        name="auth-me",
    ),

    path(
        "logout/",
        LogoutView.as_view(),
        name="auth-logout",
    ),

    path(
        "password-reset/",
        PasswordResetRequestView.as_view(),
        name="password-reset",
    ),

    path(
        "password-reset/confirm/",
        PasswordResetConfirmView.as_view(),
        name="password-reset-confirm",
    ),
]
