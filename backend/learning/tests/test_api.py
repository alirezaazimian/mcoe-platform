from datetime import timedelta

from django.contrib.auth import get_user_model
from django.utils import timezone

from rest_framework import status
from rest_framework.test import APITestCase

from students.models import (
    AcademicYear,
    Classroom,
    Enrollment,
    GradeLevel,
    Student,
)
from students.tests.helpers import valid_national_code
from students.views import issue_student_tokens

from learning.models import (
    OnlineSession,
    SessionAttendance,
    Subject,
    Teacher,
    TeachingAssignment,
)


User = get_user_model()


class OnlineClassApiTests(APITestCase):
    def setUp(self):
        self.staff = User.objects.create_user(
            username="learning-admin",
            password="safe-test-password-4928",
            is_staff=True,
        )
        self.year = AcademicYear.objects.get(slug="1405-1406")
        self.grade = GradeLevel.objects.get(code="grade-1")
        self.classroom = Classroom.objects.create(
            academic_year=self.year,
            grade=self.grade,
            name="اول الف",
        )
        self.other_classroom = Classroom.objects.create(
            academic_year=self.year,
            grade=self.grade,
            name="اول ب",
        )
        self.teacher = Teacher.objects.create(
            first_name="معلم",
            last_name="آزمایشی",
            mobile="09121234567",
        )
        self.subject = Subject.objects.create(
            code="math",
            name_fa="ریاضی",
        )
        self.assignment = TeachingAssignment.objects.create(
            academic_year=self.year,
            classroom=self.classroom,
            subject=self.subject,
            teacher=self.teacher,
        )
        self.other_assignment = TeachingAssignment.objects.create(
            academic_year=self.year,
            classroom=self.other_classroom,
            subject=self.subject,
            teacher=self.teacher,
        )
        self.student = self.create_student(1200456, self.classroom)
        self.other_student = self.create_student(9200456, self.other_classroom)

    def create_student(self, prefix, classroom):
        code = valid_national_code(prefix)
        user = User.objects.create_user(
            username=code,
            password=None,
            is_active=True,
            is_staff=False,
        )
        student = Student.objects.create(
            user=user,
            national_code=code,
            first_name="دانش",
            last_name=classroom.name,
            sms_mobile="09123334444",
            portal_enabled=True,
        )
        Enrollment.objects.create(
            student=student,
            academic_year=self.year,
            grade=self.grade,
            classroom=classroom,
        )
        return student

    def test_staff_endpoints_are_private(self):
        anonymous = self.client.get("/api/learning/teachers/")
        self.client.force_authenticate(user=self.staff)
        staff = self.client.get("/api/learning/teachers/")

        self.assertEqual(anonymous.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(staff.status_code, status.HTTP_200_OK)

    def test_session_creation_builds_roster_for_only_its_class(self):
        self.client.force_authenticate(user=self.staff)
        response = self.client.post(
            "/api/learning/sessions/",
            {
                "assignment": self.assignment.pk,
                "title": "جلسه اول ریاضی",
                "starts_at": (timezone.now() + timedelta(hours=1)).isoformat(),
                "duration_minutes": 60,
                "join_window_minutes": 15,
                "status": "scheduled",
                "allow_recording": True,
                "notes": "",
                "recording_url": "",
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        session = OnlineSession.objects.get()
        attendance = SessionAttendance.objects.get(session=session)
        self.assertEqual(attendance.student, self.student)
        self.assertEqual(response.data["roster_count"], 1)
        self.assertFalse(response.data["provider_configured"])

    def test_student_sees_only_non_draft_sessions_for_own_class(self):
        starts_at = timezone.now() + timedelta(hours=1)
        own = OnlineSession.objects.create(
            assignment=self.assignment,
            title="کلاس خود دانش‌آموز",
            starts_at=starts_at,
            status=OnlineSession.Status.SCHEDULED,
            created_by=self.staff,
        )
        OnlineSession.objects.create(
            assignment=self.assignment,
            title="پیش‌نویس",
            starts_at=starts_at + timedelta(hours=1),
            status=OnlineSession.Status.DRAFT,
            created_by=self.staff,
        )
        OnlineSession.objects.create(
            assignment=self.other_assignment,
            title="کلاس دیگر",
            starts_at=starts_at + timedelta(hours=2),
            status=OnlineSession.Status.SCHEDULED,
            created_by=self.staff,
        )
        token = issue_student_tokens(self.student)["access"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.get("/api/learning/student/sessions/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["id"], own.pk)
        self.assertNotIn("external_meeting_id", response.data[0])
        self.assertFalse(response.data[0]["join_available"])

    def test_join_is_safely_disabled_until_provider_is_configured(self):
        session = OnlineSession.objects.create(
            assignment=self.assignment,
            title="کلاس بدون سرویس",
            starts_at=timezone.now() + timedelta(minutes=5),
            status=OnlineSession.Status.SCHEDULED,
            created_by=self.staff,
        )
        token = issue_student_tokens(self.student)["access"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.post(
            f"/api/learning/student/sessions/{session.pk}/join/",
            {},
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_503_SERVICE_UNAVAILABLE,
        )
        self.assertIn("متصل نشده", response.data["detail"])

    def test_assignment_rejects_classroom_from_another_year(self):
        other_year = AcademicYear.objects.create(
            title="۱۴۰۴-۱۴۰۵",
            slug="1404-1405",
        )
        self.client.force_authenticate(user=self.staff)
        response = self.client.post(
            "/api/learning/assignments/",
            {
                "academic_year": other_year.pk,
                "classroom": self.classroom.pk,
                "subject": self.subject.pk,
                "teacher": self.teacher.pk,
                "is_active": True,
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
