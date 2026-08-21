from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers


User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "first_name",
            "last_name",
            "role",
            "is_staff",
        ]

    def get_role(self, user):
        if user.is_superuser or user.is_staff:
            return "admin"

        return "user"


class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField()

    password = serializers.CharField(
        write_only=True,
        min_length=8,
    )

    confirm_password = serializers.CharField(
        write_only=True,
    )

    def validate_email(self, value):
        email = value.strip().lower()

        if User.objects.filter(
            email__iexact=email
        ).exists():
            raise serializers.ValidationError(
                "An account with this email already exists."
            )

        return email

    def validate(self, attrs):
        password = attrs["password"]
        confirm_password = attrs["confirm_password"]

        if password != confirm_password:
            raise serializers.ValidationError(
                {
                    "confirm_password":
                        "Passwords do not match."
                }
            )

        validate_password(password)

        return attrs

    def create(self, validated_data):
        email = validated_data["email"]
        password = validated_data["password"]

        user = User.objects.create_user(
            username=email,
            email=email,
            password=password,
        )

        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()

    password = serializers.CharField(
        write_only=True,
    )

    def validate(self, attrs):
        email = attrs["email"].strip().lower()
        password = attrs["password"]

        try:
            user = User.objects.get(
                email__iexact=email
            )

        except User.DoesNotExist:
            raise serializers.ValidationError(
                "Invalid email or password."
            )

        except User.MultipleObjectsReturned:
            raise serializers.ValidationError(
                "Unable to authenticate this account."
            )

        user = authenticate(
            username=user.username,
            password=password,
        )

        if not user:
            raise serializers.ValidationError(
                "Invalid email or password."
            )

        if not user.is_active:
            raise serializers.ValidationError(
                "This account is disabled."
            )

        attrs["user"] = user

        return attrs


class PasswordResetRequestSerializer(
    serializers.Serializer
):
    email = serializers.EmailField()


class PasswordResetConfirmSerializer(
    serializers.Serializer
):
    uid = serializers.CharField()

    token = serializers.CharField()

    new_password = serializers.CharField(
        write_only=True,
        min_length=8,
    )

    confirm_password = serializers.CharField(
        write_only=True,
    )

    def validate(self, attrs):
        if (
            attrs["new_password"]
            != attrs["confirm_password"]
        ):
            raise serializers.ValidationError(
                {
                    "confirm_password":
                        "Passwords do not match."
                }
            )

        return attrs