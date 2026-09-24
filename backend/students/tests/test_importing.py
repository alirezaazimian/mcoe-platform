from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIClient

from students.importing.service import (
    build_import_plan,
    commit_import_plan,
)
from students.models import (
    AcademicYear,
    Classroom,
    Enrollment,
    Student,
)

from .helpers import valid_national_code, xlsx_bytes


User = get_user_model()


HEADERS = [
    "نام",
    "نام خانوادگی",
    "کد ملی",
    "نام پدر",
    "جنسیت",
    "تاریخ تولد",
    "سازمان",
    "پایه",
    "موبایل",
    "آدرس",
    "تلفن",
    "کد پستی",
    "همراه پدر",
    "ایمیل پدر",
    "مادر",
    "همراه مادر",
    "ایمیل مادر",
    "کلاس",
    "شماره همراه دانش آموز",
    "شماره تماس ضروری",
]


class StudentImportTests(TestCase):
    def setUp(self):
        self.staff = User.objects.create_user(
            username="staff",
            password="test-pass-9842",
            is_staff=True,
        )
        self.year = AcademicYear.objects.get(slug="1405-1406")
        self.client = APIClient()
        self.code = valid_national_code(1354978)
        self.rows = [
            ["دانش‌آموزان ۱۴۰۵-۱۴۰۶"],
            HEADERS,
            [
                "دانش",
                "آموز",
                self.code,
                "ولی",
                "دختر",
                "۱۳۹۷/۰۱/۰۲",
                "دبستان دوره اول",
                "اول دبستان",
                "09121234567",
                "تهران",
                "02122000000",
                "1234567890",
                "09123334444",
                "father@example.com",
                "مادر دانش‌آموز",
                "09125556666",
                "mother@example.com",
                "کلاس اول",
                "",
                "",
            ],
        ]

    def upload(self, name="students.xlsx", rows=None):
        return SimpleUploadedFile(
            name,
            xlsx_bytes(rows or self.rows),
            content_type=(
                "application/vnd.openxmlformats-officedocument."
                "spreadsheetml.sheet"
            ),
        )

    def test_preview_deduplicates_multiple_files(self):
        plan = build_import_plan(
            [self.upload("a.xlsx"), self.upload("b.xlsx")]
        )
        report = plan.report()

        self.assertTrue(report["ready_to_commit"])
        self.assertEqual(report["source_rows"], 2)
        self.assertEqual(report["unique_students"], 1)
        self.assertEqual(report["duplicate_rows"], 1)
        self.assertEqual(report["missing_class"], 0)
        self.assertEqual(report["missing_sms_mobile"], 0)

    def test_commit_is_idempotent_and_creates_unusable_password(self):
        plan = build_import_plan([self.upload()])
        first = commit_import_plan(
            plan=plan,
            academic_year=self.year,
            created_by=self.staff,
        )
        second = commit_import_plan(
            plan=build_import_plan([self.upload()]),
            academic_year=self.year,
            created_by=self.staff,
        )

        self.assertEqual(Student.objects.count(), 1)
        self.assertEqual(Enrollment.objects.count(), 1)
        self.assertEqual(Classroom.objects.count(), 1)

        student = Student.objects.select_related("user").get()
        self.assertEqual(student.user.username, self.code)
        self.assertFalse(student.user.has_usable_password())
        self.assertEqual(student.sms_mobile, "09121234567")
        self.assertFalse(student.portal_enabled)
        self.assertEqual(first["commit"]["students_created"], 1)
        self.assertEqual(second["commit"]["students_updated"], 1)

    def test_invalid_national_code_blocks_commit(self):
        rows = [list(item) for item in self.rows]
        rows[2][2] = "1111111111"
        report = build_import_plan([self.upload(rows=rows)]).report()

        self.assertFalse(report["ready_to_commit"])
        self.assertEqual(report["unique_students"], 0)
        self.assertEqual(len(report["errors"]), 1)

    def test_duplicate_with_different_sms_mobile_blocks_commit(self):
        other_rows = [list(item) for item in self.rows]
        other_rows[2][8] = "09129998877"
        report = build_import_plan(
            [
                self.upload("first.xlsx"),
                self.upload("conflict.xlsx", rows=other_rows),
            ]
        ).report()

        self.assertFalse(report["ready_to_commit"])
        self.assertEqual(report["duplicate_rows"], 1)
        self.assertIn("شماره پیامک", report["errors"][0]["message"])

    def test_staff_can_preview_and_commit_uploaded_xlsx(self):
        self.client.force_authenticate(user=self.staff)
        preview = self.client.post(
            "/api/school/student-import/",
            {
                "academic_year": self.year.pk,
                "commit": "false",
                "files": [
                    self.upload("first.xlsx"),
                    self.upload("duplicate.xlsx"),
                ],
            },
            format="multipart",
        )

        self.assertEqual(preview.status_code, status.HTTP_200_OK)
        self.assertEqual(preview.data["unique_students"], 1)
        self.assertEqual(preview.data["duplicate_rows"], 1)
        self.assertTrue(preview.data["ready_to_commit"])
        self.assertEqual(Student.objects.count(), 0)

        committed = self.client.post(
            "/api/school/student-import/",
            {
                "academic_year": self.year.pk,
                "commit": "true",
                "files": [self.upload("students.xlsx")],
            },
            format="multipart",
        )

        self.assertEqual(committed.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Student.objects.count(), 1)
        self.assertEqual(committed.data["commit"]["students_created"], 1)
