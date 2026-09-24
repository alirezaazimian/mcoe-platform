import hashlib
import re
from dataclasses import dataclass, field
from pathlib import Path

from django.contrib.auth import get_user_model
from django.db import transaction

from students.models import (
    Classroom,
    Enrollment,
    GradeLevel,
    GuardianContact,
    Student,
    StudentImportBatch,
)
from students.validators import (
    is_valid_mobile,
    is_valid_national_code,
    mask_national_code,
    normalize_mobile,
    normalize_national_code,
)

from .xlsx import XlsxReadError, read_first_sheet


User = get_user_model()

PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹"
ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩"

GRADE_ALIASES = {
    "پیشدبستان2": "preschool-2",
    "پیشدبستان۲": "preschool-2",
    "اولدبستان": "grade-1",
    "اول": "grade-1",
    "دومدبستان": "grade-2",
    "دوم": "grade-2",
    "سومدبستان": "grade-3",
    "سوم": "grade-3",
    "چهارمدبستان": "grade-4",
    "چهارم": "grade-4",
    "پنجمدبستان": "grade-5",
    "پنجم": "grade-5",
    "ششمدبستان": "grade-6",
    "ششم": "grade-6",
    "هفتم": "grade-7",
    "هشتم": "grade-8",
    "نهم": "grade-9",
}


def clean_text(value):
    return re.sub(
        r"\s+",
        " ",
        str(value or "").replace("ي", "ی").replace("ك", "ک"),
    ).strip()


def compact(value):
    return (
        clean_text(value)
        .replace("\u200c", "")
        .replace(" ", "")
    )


def ascii_digits(value):
    return str(value or "").translate(
        str.maketrans(
            PERSIAN_DIGITS + ARABIC_DIGITS,
            "0123456789" * 2,
        )
    )


def plain_number(value):
    text = ascii_digits(value).strip()

    if re.fullmatch(r"\d+\.0", text):
        return text[:-2]

    return text


def safe_filename(value):
    return Path(str(value or "students.xlsx")).name[:255]


def indexes_for(headers):
    result = {}

    for index, header in enumerate(headers):
        key = compact(header)

        if key:
            result.setdefault(key, []).append(index)

    return result


def index_of(indexes, header, occurrence=0):
    matches = indexes.get(compact(header), [])
    return matches[occurrence] if len(matches) > occurrence else None


def cell(row, index):
    if index is None or index >= len(row):
        return ""

    return clean_text(row[index])


def grade_code(value):
    return GRADE_ALIASES.get(compact(value), "")


def gender_code(value):
    normalized = compact(value)

    if normalized in {"دختر", "مونث", "زن"}:
        return Student.Gender.FEMALE

    if normalized in {"پسر", "مذکر", "مرد"}:
        return Student.Gender.MALE

    return Student.Gender.UNSPECIFIED


def valid_or_blank_mobile(value):
    mobile = normalize_mobile(plain_number(value))
    return mobile if is_valid_mobile(mobile) else ""


def valid_or_blank_national_code(value):
    code = normalize_national_code(plain_number(value))
    return code if is_valid_national_code(code) else ""


@dataclass
class ImportIssue:
    filename: str
    row: int
    masked_code: str
    message: str

    def as_dict(self):
        return {
            "filename": self.filename,
            "row": self.row,
            "masked_code": self.masked_code,
            "message": self.message,
        }


@dataclass
class ImportedStudent:
    filename: str
    row: int
    national_code: str
    first_name: str
    last_name: str
    father_name: str
    gender: str
    birth_date_jalali: str
    primary_mobile: str
    sms_mobile: str
    home_phone: str
    postal_code: str
    address: str
    organization: str
    grade_code: str
    grade_name: str
    classroom_name: str
    father: dict
    mother: dict
    extra_data: dict


@dataclass
class ImportPlan:
    checksum: str
    filenames: list
    source_rows: int
    records: dict = field(default_factory=dict)
    duplicate_rows: int = 0
    errors: list = field(default_factory=list)
    warnings: list = field(default_factory=list)

    def report(self):
        grade_counts = {}
        missing_class = 0
        missing_sms = 0

        for record in self.records.values():
            grade_counts[record.grade_name] = (
                grade_counts.get(record.grade_name, 0) + 1
            )

            if not record.classroom_name:
                missing_class += 1

            if not record.sms_mobile:
                missing_sms += 1

        return {
            "filenames": self.filenames,
            "source_rows": self.source_rows,
            "unique_students": len(self.records),
            "duplicate_rows": self.duplicate_rows,
            "missing_class": missing_class,
            "missing_sms_mobile": missing_sms,
            "grade_counts": grade_counts,
            "errors": [issue.as_dict() for issue in self.errors],
            "warnings": [issue.as_dict() for issue in self.warnings],
            "ready_to_commit": not self.errors and bool(self.records),
        }


def _header_row(rows):
    for index, row in enumerate(rows):
        values = {compact(value) for value in row}

        if {"نام", "نامخانوادگی", "کدملی"}.issubset(values):
            return index

    raise XlsxReadError("ردیف عنوان ستون‌های دانش‌آموزان پیدا نشد.")


def _extra_data(headers, row):
    result = {}
    seen = {}

    for index, header in enumerate(headers):
        label = clean_text(header)
        value = cell(row, index)

        if not label or not value:
            continue

        seen[label] = seen.get(label, 0) + 1
        key = label if seen[label] == 1 else f"{label} ({seen[label]})"
        result[key] = value

    return result


def _record_from_row(filename, row_number, headers, indexes, row):
    national_code = normalize_national_code(
        plain_number(cell(row, index_of(indexes, "کد ملی")))
    )
    first_name = cell(row, index_of(indexes, "نام"))
    last_name = cell(row, index_of(indexes, "نام خانوادگی"))
    grade_name = cell(row, index_of(indexes, "پایه"))
    resolved_grade_code = grade_code(grade_name)

    primary_mobile = valid_or_blank_mobile(
        cell(row, index_of(indexes, "موبایل"))
    )
    father_mobile = valid_or_blank_mobile(
        cell(row, index_of(indexes, "همراه پدر"))
    )
    mother_mobile = valid_or_blank_mobile(
        cell(row, index_of(indexes, "همراه مادر"))
    )
    student_mobile = valid_or_blank_mobile(
        cell(row, index_of(indexes, "شماره همراه دانش آموز"))
    )
    emergency_mobile = valid_or_blank_mobile(
        cell(row, index_of(indexes, "شماره تماس ضروری"))
    )
    sms_mobile = next(
        (
            value
            for value in [
                primary_mobile,
                mother_mobile,
                father_mobile,
                student_mobile,
                emergency_mobile,
            ]
            if value
        ),
        "",
    )

    father = {
        "full_name": cell(row, index_of(indexes, "نام پدر")),
        "national_code": valid_or_blank_national_code(
            cell(row, index_of(indexes, "کدملی پدر"))
        ),
        "mobile": father_mobile,
        "email": cell(row, index_of(indexes, "ایمیل پدر")),
        "extra_data": {
            "birth_date": cell(row, index_of(indexes, "تاریخ تولد پدر")),
            "education": cell(row, index_of(indexes, "تحصیلات", 0)),
            "field_of_study": cell(
                row, index_of(indexes, "رشته تحصیلی", 0)
            ),
            "job": cell(row, index_of(indexes, "شغل", 0)),
            "position": cell(row, index_of(indexes, "سمت", 0)),
        },
    }
    mother = {
        "full_name": cell(row, index_of(indexes, "مادر")),
        "national_code": valid_or_blank_national_code(
            cell(row, index_of(indexes, "کدملی مادر"))
        ),
        "mobile": mother_mobile,
        "email": cell(row, index_of(indexes, "ایمیل مادر")),
        "extra_data": {
            "birth_date": cell(row, index_of(indexes, "تاریخ تولد مادر")),
            "education": cell(row, index_of(indexes, "تحصیلات", 1)),
            "field_of_study": cell(
                row, index_of(indexes, "رشته تحصیلی", 1)
            ),
            "job": cell(row, index_of(indexes, "شغل", 1)),
            "position": cell(row, index_of(indexes, "سمت", 1)),
        },
    }

    return ImportedStudent(
        filename=filename,
        row=row_number,
        national_code=national_code,
        first_name=first_name,
        last_name=last_name,
        father_name=father["full_name"],
        gender=gender_code(cell(row, index_of(indexes, "جنسیت"))),
        birth_date_jalali=cell(row, index_of(indexes, "تاریخ تولد")),
        primary_mobile=primary_mobile,
        sms_mobile=sms_mobile,
        home_phone=plain_number(cell(row, index_of(indexes, "تلفن"))),
        postal_code=plain_number(cell(row, index_of(indexes, "کد پستی"))),
        address=cell(row, index_of(indexes, "آدرس")),
        organization=cell(row, index_of(indexes, "سازمان")),
        grade_code=resolved_grade_code,
        grade_name=grade_name,
        classroom_name=cell(row, index_of(indexes, "کلاس")),
        father=father,
        mother=mother,
        extra_data=_extra_data(headers, row),
    )


def _validate_record(record):
    messages = []

    if not is_valid_national_code(record.national_code):
        messages.append("کد ملی معتبر نیست.")

    if not record.first_name or not record.last_name:
        messages.append("نام یا نام خانوادگی ثبت نشده است.")

    if not record.grade_code:
        messages.append("پایه تحصیلی شناخته نشد.")

    return messages


def _merge_record(plan, current, incoming):
    conflicts = []

    for attribute, label in [
        ("first_name", "نام"),
        ("last_name", "نام خانوادگی"),
        ("grade_code", "پایه"),
        ("sms_mobile", "شماره پیامک"),
    ]:
        left = getattr(current, attribute)
        right = getattr(incoming, attribute)

        if left and right and compact(left) != compact(right):
            conflicts.append(label)

    if (
        current.classroom_name
        and incoming.classroom_name
        and compact(current.classroom_name) != compact(incoming.classroom_name)
    ):
        conflicts.append("کلاس")

    if conflicts:
        plan.errors.append(
            ImportIssue(
                filename=incoming.filename,
                row=incoming.row,
                masked_code=mask_national_code(incoming.national_code),
                message=(
                    "رکورد تکراری با اطلاعات متفاوت: "
                    + "، ".join(conflicts)
                ),
            )
        )
        return current

    for attribute in [
        "father_name",
        "birth_date_jalali",
        "primary_mobile",
        "sms_mobile",
        "home_phone",
        "postal_code",
        "address",
        "organization",
        "classroom_name",
    ]:
        if not getattr(current, attribute) and getattr(incoming, attribute):
            setattr(current, attribute, getattr(incoming, attribute))

    for relation, relation_label in [
        ("father", "پدر"),
        ("mother", "مادر"),
    ]:
        current_guardian = getattr(current, relation)
        incoming_guardian = getattr(incoming, relation)

        for key, label in [
            ("national_code", "کد ملی"),
            ("mobile", "موبایل"),
        ]:
            left = current_guardian.get(key, "")
            right = incoming_guardian.get(key, "")

            if left and right and left != right:
                plan.errors.append(
                    ImportIssue(
                        filename=incoming.filename,
                        row=incoming.row,
                        masked_code=mask_national_code(
                            incoming.national_code
                        ),
                        message=(
                            f"رکورد تکراری با {label} متفاوت برای "
                            f"{relation_label}."
                        ),
                    )
                )

        for key in ["full_name", "national_code", "mobile", "email"]:
            if not current_guardian.get(key) and incoming_guardian.get(key):
                current_guardian[key] = incoming_guardian[key]

        current_extra = current_guardian.setdefault("extra_data", {})
        current_extra.update(
            {
                key: value
                for key, value in incoming_guardian.get(
                    "extra_data", {}
                ).items()
                if key not in current_extra and value
            }
        )

    current.extra_data.update(
        {
            key: value
            for key, value in incoming.extra_data.items()
            if key not in current.extra_data
        }
    )
    return current


def build_import_plan(uploaded_files):
    plan = ImportPlan(
        checksum="",
        filenames=[],
        source_rows=0,
    )
    digest = hashlib.sha256()

    for uploaded in uploaded_files:
        filename = safe_filename(uploaded.name)
        data = uploaded.read()
        uploaded.seek(0)
        plan.filenames.append(filename)
        digest.update(filename.encode("utf-8"))
        digest.update(data)

        try:
            rows = read_first_sheet(data)
            header_index = _header_row(rows)
        except XlsxReadError as exc:
            plan.errors.append(
                ImportIssue(filename, 0, "", str(exc))
            )
            continue

        headers = [clean_text(value) for value in rows[header_index]]
        indexes = indexes_for(headers)

        for offset, row in enumerate(rows[header_index + 1 :], start=1):
            row_number = header_index + offset + 1
            identity_values = [
                cell(row, index_of(indexes, "نام")),
                cell(row, index_of(indexes, "نام خانوادگی")),
                cell(row, index_of(indexes, "کد ملی")),
            ]

            if not any(identity_values):
                continue

            plan.source_rows += 1
            record = _record_from_row(
                filename,
                row_number,
                headers,
                indexes,
                row,
            )
            messages = _validate_record(record)

            if messages:
                for message in messages:
                    plan.errors.append(
                        ImportIssue(
                            filename,
                            row_number,
                            mask_national_code(record.national_code),
                            message,
                        )
                    )
                continue

            if record.national_code in plan.records:
                plan.duplicate_rows += 1
                plan.records[record.national_code] = _merge_record(
                    plan,
                    plan.records[record.national_code],
                    record,
                )
            else:
                plan.records[record.national_code] = record

            if not record.classroom_name:
                plan.warnings.append(
                    ImportIssue(
                        filename,
                        row_number,
                        mask_national_code(record.national_code),
                        "کلاس مشخص نشده و ثبت‌نام بدون کلاس ایجاد می‌شود.",
                    )
                )

            if not record.sms_mobile:
                plan.warnings.append(
                    ImportIssue(
                        filename,
                        row_number,
                        mask_national_code(record.national_code),
                        "شماره معتبر برای ورود پیامکی پیدا نشد.",
                    )
                )

    plan.checksum = digest.hexdigest()
    return plan


def _student_user(record, existing_student=None):
    if existing_student and existing_student.user_id:
        return existing_student.user, False

    user = User.objects.filter(username=record.national_code).first()

    if user:
        if (
            existing_student
            and existing_student.user_id == user.pk
            and not user.is_staff
        ):
            return user, False

        raise ValueError(
            f"کد کاربری {mask_national_code(record.national_code)} "
            "با حساب دیگری تداخل دارد."
        )

    user = User.objects.create_user(
        username=record.national_code,
        first_name=record.first_name,
        last_name=record.last_name,
        email="",
        is_active=True,
        is_staff=False,
    )
    user.set_unusable_password()
    user.save(update_fields=["password"])
    return user, True


@transaction.atomic
def commit_import_plan(*, plan, academic_year, created_by):
    report = plan.report()

    if not report["ready_to_commit"]:
        raise ValueError("گزارش واردسازی دارای خطاست و قابل ثبت نیست.")

    counters = {
        "students_created": 0,
        "students_updated": 0,
        "users_created": 0,
        "classrooms_created": 0,
        "enrollments_created": 0,
        "enrollments_updated": 0,
    }

    grades = {
        grade.code: grade
        for grade in GradeLevel.objects.filter(
            code__in={record.grade_code for record in plan.records.values()}
        )
    }

    for record in plan.records.values():
        grade = grades.get(record.grade_code)

        if not grade:
            raise ValueError(f"پایه {record.grade_code} در سیستم تعریف نشده است.")

        existing_student = (
            Student.objects
            .select_related("user")
            .filter(national_code=record.national_code)
            .first()
        )
        user, user_created = _student_user(record, existing_student)
        counters["users_created"] += int(user_created)

        sms_mobile = record.sms_mobile

        if (
            existing_student
            and existing_student.sms_mobile_verified_at
            and existing_student.sms_mobile != sms_mobile
        ):
            sms_mobile = existing_student.sms_mobile

        student_defaults = {
            "user": user,
            "first_name": record.first_name,
            "last_name": record.last_name,
            "father_name": record.father_name,
            "gender": record.gender,
            "birth_date_jalali": record.birth_date_jalali,
            "primary_mobile": record.primary_mobile,
            "sms_mobile": sms_mobile,
            "home_phone": record.home_phone,
            "postal_code": record.postal_code,
            "address": record.address,
            "extra_data": record.extra_data,
            "is_active": True,
        }
        student, student_created = Student.objects.update_or_create(
            national_code=record.national_code,
            defaults=student_defaults,
        )
        counter_key = (
            "students_created" if student_created else "students_updated"
        )
        counters[counter_key] += 1

        user_changes = []

        if user.first_name != record.first_name:
            user.first_name = record.first_name
            user_changes.append("first_name")

        if user.last_name != record.last_name:
            user.last_name = record.last_name
            user_changes.append("last_name")

        if user_changes:
            user.save(update_fields=user_changes)

        for relation, guardian in [
            (GuardianContact.Relation.FATHER, record.father),
            (GuardianContact.Relation.MOTHER, record.mother),
        ]:
            if not any(
                guardian.get(key)
                for key in ["full_name", "national_code", "mobile", "email"]
            ):
                continue

            GuardianContact.objects.update_or_create(
                student=student,
                relation=relation,
                defaults=guardian,
            )

        classroom = None

        if record.classroom_name:
            classroom, classroom_created = Classroom.objects.get_or_create(
                academic_year=academic_year,
                grade=grade,
                name=record.classroom_name,
            )
            counters["classrooms_created"] += int(classroom_created)

        _, enrollment_created = Enrollment.objects.update_or_create(
            student=student,
            academic_year=academic_year,
            defaults={
                "grade": grade,
                "classroom": classroom,
                "status": Enrollment.Status.ACTIVE,
                "source_file": record.filename,
                "source_row": record.row,
            },
        )
        counters[
            "enrollments_created"
            if enrollment_created
            else "enrollments_updated"
        ] += 1

    report["commit"] = counters
    batch = StudentImportBatch.objects.create(
        checksum=plan.checksum,
        academic_year=academic_year,
        filenames=plan.filenames,
        report=report,
        created_by=created_by,
    )
    report["batch_id"] = batch.pk
    return report
