from django.db import migrations, models


def seed_initial_slides(apps, schema_editor):
    EducationHeroSlide = apps.get_model(
        "content",
        "EducationHeroSlide",
    )

    initial_slides = [
        {
            "level": "elementary-first",
            "source_url": (
                "/media/site/"
                "762d5af46_generated_2f7e8049.jpg"
            ),
            "alt_fa": "دانش‌آموزان دبستان دوره اول",
            "alt_en": "Elementary first-cycle students",
        },
        {
            "level": "elementary-second",
            "source_url": (
                "/media/site/"
                "762d5af46_generated_2f7e8049.jpg"
            ),
            "alt_fa": "دانش‌آموزان دبستان دوره دوم",
            "alt_en": "Elementary second-cycle students",
        },
        {
            "level": "middle-first",
            "source_url": (
                "/media/site/"
                "79b290cdc_generated_d244f2b5.jpg"
            ),
            "alt_fa": "دانش‌آموزان متوسطه دوره اول",
            "alt_en": "Middle school first-cycle students",
        },
    ]

    for item in initial_slides:
        EducationHeroSlide.objects.get_or_create(
            level=item["level"],
            sort_order=0,
            defaults={
                "source_url": item["source_url"],
                "alt_fa": item["alt_fa"],
                "alt_en": item["alt_en"],
                "is_active": True,
            },
        )


def remove_initial_slides(apps, schema_editor):
    EducationHeroSlide = apps.get_model(
        "content",
        "EducationHeroSlide",
    )

    EducationHeroSlide.objects.filter(
        source_url__in=[
            (
                "/media/site/"
                "762d5af46_generated_2f7e8049.jpg"
            ),
            (
                "/media/site/"
                "79b290cdc_generated_d244f2b5.jpg"
            ),
        ],
        image__isnull=True,
        sort_order=0,
    ).delete()


class Migration(migrations.Migration):

    dependencies = [
        (
            "content",
            "0012_kindergartenslide_optional_title",
        ),
    ]

    operations = [
        migrations.CreateModel(
            name="EducationHeroSlide",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "level",
                    models.CharField(
                        choices=[
                            (
                                "elementary-first",
                                "دبستان دوره اول",
                            ),
                            (
                                "elementary-second",
                                "دبستان دوره دوم",
                            ),
                            (
                                "middle-first",
                                "متوسطه دوره اول",
                            ),
                        ],
                        db_index=True,
                        max_length=32,
                        verbose_name="مقطع تحصیلی",
                    ),
                ),
                (
                    "image",
                    models.ImageField(
                        blank=True,
                        null=True,
                        upload_to=(
                            "education-hero-slides/%Y/%m/"
                        ),
                        verbose_name="تصویر اسلاید",
                    ),
                ),
                (
                    "source_url",
                    models.CharField(
                        blank=True,
                        editable=False,
                        max_length=500,
                        verbose_name="نشانی تصویر اولیه",
                    ),
                ),
                (
                    "alt_fa",
                    models.CharField(
                        blank=True,
                        max_length=250,
                        verbose_name="متن جایگزین فارسی",
                    ),
                ),
                (
                    "alt_en",
                    models.CharField(
                        blank=True,
                        max_length=250,
                        verbose_name="متن جایگزین انگلیسی",
                    ),
                ),
                (
                    "is_active",
                    models.BooleanField(
                        default=True,
                        verbose_name="فعال",
                    ),
                ),
                (
                    "sort_order",
                    models.PositiveIntegerField(
                        default=0,
                        verbose_name="ترتیب نمایش",
                    ),
                ),
                (
                    "created_at",
                    models.DateTimeField(auto_now_add=True),
                ),
                (
                    "updated_at",
                    models.DateTimeField(auto_now=True),
                ),
            ],
            options={
                "verbose_name": (
                    "اسلاید هیرو مقطع تحصیلی"
                ),
                "verbose_name_plural": (
                    "اسلایدهای هیرو مقاطع تحصیلی"
                ),
                "ordering": [
                    "level",
                    "sort_order",
                    "id",
                ],
            },
        ),
        migrations.RunPython(
            seed_initial_slides,
            remove_initial_slides,
        ),
    ]
