from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import (
    validate_password,
)
from django.contrib.auth.tokens import (
    default_token_generator,
)
from django.core.exceptions import (
    ValidationError as DjangoValidationError,
)
from django.core.mail import send_mail
from django.utils.encoding import force_bytes, force_str
from django.utils.http import (
    urlsafe_base64_decode,
    urlsafe_base64_encode,
)

from rest_framework import (
    generics,
    permissions,
    status,
)
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework_simplejwt.tokens import (
    RefreshToken,
)

from .serializers import (
    LoginSerializer,
    PasswordResetConfirmSerializer,
    PasswordResetRequestSerializer,
    RegisterSerializer,
    UserSerializer,
)


User = get_user_model()


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [
        permissions.AllowAny
    ]

    def create(
        self,
        request,
        *args,
        **kwargs
    ):
        serializer = self.get_serializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        user = serializer.save()

        refresh = RefreshToken.for_user(
            user
        )

        return Response(
            {
                "user":
                    UserSerializer(user).data,
                "access":
                    str(refresh.access_token),
                "refresh":
                    str(refresh),
            },
            status=status.HTTP_201_CREATED,
        )


class LoginView(APIView):
    permission_classes = [
        permissions.AllowAny
    ]

    def post(self, request):
        serializer = LoginSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        user = (
            serializer
            .validated_data["user"]
        )

        refresh = RefreshToken.for_user(
            user
        )

        return Response(
            {
                "user":
                    UserSerializer(user).data,
                "access":
                    str(refresh.access_token),
                "refresh":
                    str(refresh),
            }
        )


class CurrentUserView(APIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get(self, request):
        return Response(
            UserSerializer(
                request.user
            ).data
        )


class LogoutView(APIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def post(self, request):
        refresh_token = (
            request.data.get("refresh")
        )

        if not refresh_token:
            return Response(
                {
                    "detail":
                        "Refresh token is required."
                },
                status=
                    status.HTTP_400_BAD_REQUEST,
            )

        try:
            token = RefreshToken(
                refresh_token
            )

            token.blacklist()

        except Exception:
            return Response(
                {
                    "detail":
                        "Invalid refresh token."
                },
                status=
                    status.HTTP_400_BAD_REQUEST,
            )

        return Response(
            status=status.HTTP_204_NO_CONTENT
        )


class PasswordResetRequestView(
    APIView
):
    permission_classes = [
        permissions.AllowAny
    ]

    def post(self, request):
        serializer = (
            PasswordResetRequestSerializer(
                data=request.data
            )
        )

        serializer.is_valid(
            raise_exception=True
        )

        email = (
            serializer
            .validated_data["email"]
            .strip()
            .lower()
        )

        user = (
            User.objects
            .filter(
                email__iexact=email,
                is_active=True,
            )
            .first()
        )

        if user:
            uid = (
                urlsafe_base64_encode(
                    force_bytes(user.pk)
                )
            )

            token = (
                default_token_generator
                .make_token(user)
            )

            frontend_url = (
                settings
                .FRONTEND_URL
                .rstrip("/")
            )

            reset_url = (
                f"{frontend_url}"
                f"/reset-password"
                f"?uid={uid}"
                f"&token={token}"
            )

            send_mail(
                subject=
                    "Reset your MCOE password",
                message=(
                    "Use the following link "
                    "to reset your password:\n\n"
                    f"{reset_url}\n\n"
                    "If you did not request "
                    "a password reset, "
                    "you can ignore this message."
                ),
                from_email=
                    settings.DEFAULT_FROM_EMAIL,
                recipient_list=[
                    user.email
                ],
                fail_silently=False,
            )

        return Response(
            {
                "detail": (
                    "If an account exists "
                    "with that email, "
                    "a password reset link "
                    "has been sent."
                )
            }
        )


class PasswordResetConfirmView(
    APIView
):
    permission_classes = [
        permissions.AllowAny
    ]

    def post(self, request):
        serializer = (
            PasswordResetConfirmSerializer(
                data=request.data
            )
        )

        serializer.is_valid(
            raise_exception=True
        )

        uid = (
            serializer
            .validated_data["uid"]
        )

        token = (
            serializer
            .validated_data["token"]
        )

        new_password = (
            serializer
            .validated_data[
                "new_password"
            ]
        )

        try:
            user_id = force_str(
                urlsafe_base64_decode(uid)
            )

            user = User.objects.get(
                pk=user_id
            )

        except (
            TypeError,
            ValueError,
            OverflowError,
            User.DoesNotExist,
        ):
            return Response(
                {
                    "detail":
                        "Invalid or expired reset link."
                },
                status=
                    status.HTTP_400_BAD_REQUEST,
            )

        if not (
            default_token_generator
            .check_token(
                user,
                token
            )
        ):
            return Response(
                {
                    "detail":
                        "Invalid or expired reset link."
                },
                status=
                    status.HTTP_400_BAD_REQUEST,
            )

        try:
            validate_password(
                new_password,
                user=user,
            )

        except DjangoValidationError as exc:
            return Response(
                {
                    "new_password":
                        list(exc.messages)
                },
                status=
                    status.HTTP_400_BAD_REQUEST,
            )

        user.set_password(
            new_password
        )

        user.save(
            update_fields=[
                "password"
            ]
        )

        return Response(
            {
                "detail":
                    "Password has been reset successfully."
            }
        )