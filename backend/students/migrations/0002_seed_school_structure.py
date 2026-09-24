from django.db import migrations


GRADES = [
    ("preschool-2", "پیش‌دبستان ۲", "preschool", 1),
    ("grade-1", "اول دبستان", "elementary_first", 2),
    ("grade-2", "دوم دبستان", "elementary_first", 3),
    ("grade-3", "سوم دبستان", "elementary_first", 4),
    ("grade-4", "چهارم دبستان", "elementary_second", 5),
    ("grade-5", "پنجم دبستان", "elementary_second", 6),
    ("grade-6", "ششم دبستان", "elementary_second", 7),
    ("grade-7", "هفتم", "middle_first", 8),
    ("grade-8", "هشتم", "middle_first", 9),
    ("grade-9", "نهم", "middle_first", 10),
]


def seed_school_structure(apps, schema_editor):
    AcademicYear = apps.get_model("students", "AcademicYear")
    GradeLevel = apps.get_model("students", "GradeLevel")

    AcademicYear.objects.get_or_create(
        slug="1405-1406",
        defaults={
            "title": "۱۴۰۵-۱۴۰۶",
            "is_active": True,
        },
    )

    for code, name_fa, stage, sort_order in GRADES:
        GradeLevel.objects.update_or_create(
            code=code,
            defaults={
                "name_fa": name_fa,
                "stage": stage,
                "sort_order": sort_order,
                "is_active": True,
            },
        )


class Migration(migrations.Migration):
    dependencies = [
        ("students", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(
            seed_school_structure,
            migrations.RunPython.noop,
        ),
    ]
