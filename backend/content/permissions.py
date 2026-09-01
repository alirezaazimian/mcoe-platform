from rest_framework.permissions import (
    BasePermission,
    SAFE_METHODS,
)


class PublicReadAdminWritePermission(BasePermission):
    """
    Public visitors may read content.

    Create, update, partial update, and delete operations
    are restricted to authenticated Django staff users.
    """

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True

        user = request.user

        return bool(
            user
            and user.is_authenticated
            and user.is_staff
        )
