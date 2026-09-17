from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.test import APITestCase

from rest_framework_simplejwt.tokens import RefreshToken


User = get_user_model()


class DashboardAuthenticationSecurityTests(APITestCase):
    def setUp(self):
        self.password = "Secure-Test-Pass-9482"

        self.staff_user = User.objects.create_user(
            username="admin@example.com",
            email="admin@example.com",
            password=self.password,
            is_staff=True,
        )

        self.regular_user = User.objects.create_user(
            username="user@example.com",
            email="user@example.com",
            password=self.password,
            is_staff=False,
        )

    def test_public_registration_endpoint_is_removed(self):
        response = self.client.post(
            "/api/auth/register/",
            {
                "email": "new@example.com",
                "password": self.password,
                "confirm_password": self.password,
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_404_NOT_FOUND,
        )

        self.assertFalse(
            User.objects.filter(
                email="new@example.com"
            ).exists()
        )

    def test_regular_user_cannot_log_in_to_dashboard(self):
        response = self.client.post(
            "/api/auth/login/",
            {
                "email": self.regular_user.email,
                "password": self.password,
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
        )

        self.assertNotIn("access", response.data)
        self.assertNotIn("refresh", response.data)

    def test_staff_user_can_log_in(self):
        response = self.client.post(
            "/api/auth/login/",
            {
                "email": self.staff_user.email,
                "password": self.password,
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)
        self.assertTrue(
            response.data["user"]["is_staff"]
        )

    def test_regular_user_refresh_token_is_rejected(self):
        refresh = RefreshToken.for_user(
            self.regular_user
        )

        response = self.client.post(
            "/api/auth/refresh/",
            {
                "refresh": str(refresh),
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
        )

        self.assertNotIn("access", response.data)

    def test_staff_refresh_token_is_accepted(self):
        refresh = RefreshToken.for_user(
            self.staff_user
        )

        response = self.client.post(
            "/api/auth/refresh/",
            {
                "refresh": str(refresh),
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        self.assertIn("access", response.data)

    def test_current_user_endpoint_rejects_regular_user(self):
        self.client.force_authenticate(
            user=self.regular_user
        )

        response = self.client.get(
            "/api/auth/me/"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
        )

    def test_current_user_endpoint_allows_staff(self):
        self.client.force_authenticate(
            user=self.staff_user
        )

        response = self.client.get(
            "/api/auth/me/"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        self.assertTrue(
            response.data["is_staff"]
        )
