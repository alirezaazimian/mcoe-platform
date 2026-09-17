from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.authentication import JWTAuthentication

from .authentication_rule import (
    admin_user_authentication_rule,
)


class StaffJWTAuthentication(JWTAuthentication):
    """Authenticate JWTs only for active Django staff users."""

    def get_user(self, validated_token):
        user = super().get_user(validated_token)

        if not user.is_staff:
            raise AuthenticationFailed(
                "No active administrator account found.",
                code="user_not_found",
            )

        return user
