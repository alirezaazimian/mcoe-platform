from django.db import migrations, models
from django.utils import timezone


PAGE_HERO_DEFAULTS = [
    {
        "page": "kindergarten",
        "alt_fa": "کودکستان رویای کودکی",
        "alt_en": "Childhood Dream Kindergarten",
    },
    {
        "page": "about",
        "alt_fa": "مجتمع آموزشی معصومه عظیمیان",
        "alt_en": "Masoumeh Azimian Educational Complex",
    },
]


ASSOCIATION_DEFAULTS = [
    {
        "slug": "science",
        "name_fa": "انجمن علمی",
        "name_en": "Science Association",
        "description_fa": (
            "پژوهش، آزمایش و تجربه‌های "
            "علمی دانش‌آموزی"
        ),
        "description_en": (
            "Student research, experiments and scientific discovery"
        ),
        "icon": "flask-conical",
        "accent_color": "#2E7D32",
        "sort_order": 1,
    },
    {
        "slug": "literary",
        "name_fa": "انجمن ادبی",
        "name_en": "Literary Association",
        "description_fa": (
            "برگزاری محفل‌های ادبی و ترویج "
            "کتاب‌خوانی"
        ),
        "description_en": (
            "Literary gatherings and promoting reading"
        ),
        "icon": "pen-line",
        "accent_color": "#6C5CE7",
        "sort_order": 2,
    },
    {
        "slug": "environment",
        "name_fa": "انجمن محیط زیست",
        "name_en": "Environment Association",
        "description_fa": (
            "حفاظت از طبیعت و ترویج فرهنگ سبز"
        ),
        "description_en": (
            "Nature conservation and green culture"
        ),
        "icon": "leaf",
        "accent_color": "#2E7D32",
        "sort_order": 3,
    },
    {
        "slug": "social-studies",
        "name_fa": "انجمن مطالعات اجتماعی",
        "name_en": "Social Studies Association",
        "description_fa": (
            "شناخت جامعه، فرهنگ و مشارکت "
            "مسئولانه"
        ),
        "description_en": (
            "Exploring society, culture and responsible participation"
        ),
        "icon": "landmark",
        "accent_color": "#D81B60",
        "sort_order": 4,
    },
]


def ensure_legacy_timestamp_columns(apps, schema_editor):
    """Repair tables created by the earlier production migration.

    The first production version of PageHero and StudentAssociation did
    not create every timestamp column that is present in the current
    migration state.  Migration 0013 is already recorded as applied on
    those installations, so the missing columns must be repaired before
    the historical models are queried below.
    """
    connection = schema_editor.connection

    for model_name in (
        "PageHero",
        "StudentAssociation",
    ):
        model = apps.get_model(
            "content",
            model_name,
        )
        table_name = model._meta.db_table

        with connection.cursor() as cursor:
            columns = {
                column.name
                for column in connection.introspection.get_table_description(
                    cursor,
                    table_name,
                )
            }

        for field_name in (
            "created_at",
            "updated_at",
        ):
            if field_name in columns:
                continue

            field = models.DateTimeField(
                default=timezone.now,
            )
            field.set_attributes_from_name(
                field_name,
            )
            schema_editor.add_field(
                model,
                field,
            )
            columns.add(field_name)


def ensure_editable_page_content(apps, schema_editor):
    PageHero = apps.get_model(
        "content",
        "PageHero",
    )
    StudentAssociation = apps.get_model(
        "content",
        "StudentAssociation",
    )

    for item in PAGE_HERO_DEFAULTS:
        PageHero.objects.get_or_create(
            page=item["page"],
            defaults={
                "alt_fa": item["alt_fa"],
                "alt_en": item["alt_en"],
            },
        )

    science_exists = StudentAssociation.objects.filter(
        slug="science"
    ).exists()

    if not science_exists:
        art = StudentAssociation.objects.filter(
            slug="art"
        ).first()

        if art:
            science = ASSOCIATION_DEFAULTS[0]
            art.slug = science["slug"]
            art.name_fa = science["name_fa"]
            art.name_en = science["name_en"]
            art.description_fa = science["description_fa"]
            art.description_en = science["description_en"]
            art.icon = science["icon"]
            art.accent_color = science["accent_color"]
            art.sort_order = science["sort_order"]
            art.save()

    for item in ASSOCIATION_DEFAULTS:
        slug = item["slug"]
        defaults = {
            key: value
            for key, value in item.items()
            if key != "slug"
        }
        StudentAssociation.objects.get_or_create(
            slug=slug,
            defaults=defaults,
        )


class Migration(migrations.Migration):

    dependencies = [
        (
            "content",
            "0014_merge_20260915_1700",
        ),
    ]

    operations = [
        migrations.RunPython(
            ensure_legacy_timestamp_columns,
            migrations.RunPython.noop,
        ),
        migrations.RunPython(
            ensure_editable_page_content,
            migrations.RunPython.noop,
        ),
    ]
