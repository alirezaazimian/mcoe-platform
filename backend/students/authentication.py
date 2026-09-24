from django.contrib.auth import get_user_model

from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.settings import api_settings


User = get_user_model()


class StudentJWTAuthentication(JWTAuthentication):
    """Authenticate only tokens explicitly issued for the student portal."""

    def get_user(self, validated_token):
        if validated_token.get("portal") != "student":
            raise AuthenticationFailed(
                "Student portal token is required.",
                code="wrong_portal",
            )

        try:
            user_id = validated_token[api_settings.USER_ID_CLAIM]
        except KeyError as exc:
            raise AuthenticationFailed(
                "Token contained no recognizable user identification.",
                code="token_not_valid",
            ) from exc

        try:
            user = (
                User.objects
                .select_related("student_profile")
                .get(**{api_settings.USER_ID_FIELD: user_id})
            )
        except User.DoesNotExist as exc:
            raise AuthenticationFailed(
                "Student account was not found.",
                code="user_not_found",
            ) from exc

        student = getattr(user, "student_profile", None)

        if not student or not student.can_use_portal:
            raise AuthenticationFailed(
                "Student portal access is disabled.",
                code="user_inactive",
            )

        return user
