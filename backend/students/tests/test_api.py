from unittest.mock import patch

from django.contrib.auth import get_user_model
from django.test import override_settings

from rest_framework import status
from rest_framework.test import APITestCase

from students.models import AcademicYear, Enrollment, GradeLevel, Student
from students.models import OtpChallenge

from .helpers import valid_national_code


User = get_user_model()


@override_settings(
    STUDENT_OTP_COOLDOWN_SECONDS=0,
    STUDENT_OTP_TTL_SECONDS=120,
    STUDENT_OTP_MAX_ATTEMPTS=5,
)
class StudentPortalApiTests(APITestCase):
    def setUp(self):
        self.code = valid_national_code(2468135)
        self.user = User.objects.create_user(
            username=self.code,
            password=None,
            is_active=True,
            is_staff=False,
        )
        self.student = Student.objects.create(
            user=self.user,
            national_code=self.code,
            first_name="دانش",
            last_name="آموز",
            sms_mobile="09121234567",
            portal_enabled=True,
        )
        self.year = AcademicYear.objects.get(slug="1405-1406")
        self.grade = GradeLevel.objects.get(code="grade-1")
        Enrollment.objects.create(
            student=self.student,
            academic_year=self.year,
            grade=self.grade,
        )

    def test_otp_login_issues_student_only_token(self):
        captured = {}

        def fake_send_student_otp(*, student, mobile, code):
            captured["code"] = code

        with patch(
            "students.views.send_student_otp",
            side_effect=fake_send_student_otp,
        ):
            request_response = self.client.post(
                "/api/school/student-auth/request-otp/",
                {"national_code": self.code},
                format="json",
            )

        self.assertEqual(request_response.status_code, status.HTTP_200_OK)
        self.assertRegex(captured["code"], r"^\d{6}$")
        self.assertNotEqual(
            OtpChallenge.objects.get().code_hash,
            captured["code"],
        )

        verify_response = self.client.post(
            "/api/school/student-auth/verify-otp/",
            {
                "national_code": self.code,
                "code": captured["code"],
            },
            format="json",
        )

        self.assertEqual(verify_response.status_code, status.HTTP_200_OK)
        self.assertIn("access", verify_response.data)
        self.assertIn("refresh", verify_response.data)

        access = verify_response.data["access"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {access}")
        me_response = self.client.get("/api/school/student-auth/me/")
        admin_response = self.client.get("/api/school/students/")

        self.assertEqual(me_response.status_code, status.HTTP_200_OK)
        self.assertEqual(me_response.data["national_code"], self.code)
        self.assertEqual(admin_response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_unknown_student_gets_same_generic_request_response(self):
        existing = self.client.post(
            "/api/school/student-auth/request-otp/",
            {"national_code": self.code},
            format="json",
        )
        unknown = self.client.post(
            "/api/school/student-auth/request-otp/",
            {"national_code": valid_national_code(9876543)},
            format="json",
        )

        self.assertEqual(existing.status_code, status.HTTP_200_OK)
        self.assertEqual(unknown.status_code, status.HTTP_200_OK)
        self.assertEqual(existing.data, unknown.data)

    def test_portal_disabled_student_cannot_request_otp(self):
        self.student.portal_enabled = False
        self.student.save(update_fields=["portal_enabled"])

        with patch("students.views.send_student_otp") as sender:
            response = self.client.post(
                "/api/school/student-auth/request-otp/",
                {"national_code": self.code},
                format="json",
            )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        sender.assert_not_called()

    def test_otp_is_invalid_after_sms_mobile_changes(self):
        captured = {}

        def fake_send_student_otp(*, student, mobile, code):
            captured["code"] = code

        with patch(
            "students.views.send_student_otp",
            side_effect=fake_send_student_otp,
        ):
            self.client.post(
                "/api/school/student-auth/request-otp/",
                {"national_code": self.code},
                format="json",
            )

        self.student.sms_mobile = "09129876543"
        self.student.save(update_fields=["sms_mobile", "updated_at"])
        response = self.client.post(
            "/api/school/student-auth/verify-otp/",
            {
                "national_code": self.code,
                "code": captured["code"],
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class StudentAdminApiTests(APITestCase):
    def setUp(self):
        self.staff = User.objects.create_user(
            username="admin-students",
            email="admin-students@example.com",
            password="safe-test-password-9284",
            is_staff=True,
        )

    def test_student_endpoints_require_staff(self):
        anonymous = self.client.get("/api/school/students/")
        self.client.force_authenticate(user=self.staff)
        staff = self.client.get("/api/school/students/")

        self.assertEqual(anonymous.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(staff.status_code, status.HTTP_200_OK)
