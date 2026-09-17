def admin_user_authentication_rule(user):
    """Allow JWT authentication only for active Django staff users."""

    return bool(
        user
        and user.is_active
        and user.is_staff
    )
