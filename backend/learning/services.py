from students.models import Enrollment

from .models import SessionAttendance


def sync_session_roster(session):
    students = (
        Enrollment.objects
        .filter(
            academic_year=session.assignment.academic_year,
            classroom=session.assignment.classroom,
            status=Enrollment.Status.ACTIVE,
            student__is_active=True,
        )
        .values_list("student_id", flat=True)
        .distinct()
    )
    existing_ids = set(
        session.attendance_records.values_list("student_id", flat=True)
    )
    new_records = [
        SessionAttendance(session=session, student_id=student_id)
        for student_id in students
        if student_id not in existing_ids
    ]

    if new_records:
        SessionAttendance.objects.bulk_create(new_records)

    return {
        "created": len(new_records),
        "total": session.attendance_records.count(),
    }
