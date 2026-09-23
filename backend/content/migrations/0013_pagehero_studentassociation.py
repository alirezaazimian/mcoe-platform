from django.db import migrations, models


def seed_editable_page_content(apps, schema_editor):
    PageHero = apps.get_model(
        "content",
        "PageHero",
    )
    StudentAssociation = apps.get_model(
        "content",
        "StudentAssociation",
    )

    page_heroes = [
        {
            "page": "kindergarten",
            "alt_fa": "کودکستان رویای کودکی",
            "alt_en": "Childhood Dream Kindergarten",
        },
        {
            "page": "about",
            "alt_fa": "مجتمع آموزشی معصومه عظیمیان",
            "alt_en": (
                "Masoumeh Azimian Educational Complex"
            ),
        },
    ]

    for item in page_heroes:
        PageHero.objects.get_or_create(
            page=item["page"],
            defaults={
                "alt_fa": item["alt_fa"],
                "alt_en": item["alt_en"],
            },
        )

    associations = [
        {
            "slug": "science",
            "name_fa": "انجمن علمی",
            "name_en": "Science Association",
            "description_fa": (
                "پژوهش، آزمایش و تجربه‌های "
                "علمی دانش‌آموزی"
            ),
            "description_en": (
                "Student research, experiments and "
                "scientific discovery"
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
                "Exploring society, culture and responsible "
                "participation"
            ),
            "icon": "landmark",
            "accent_color": "#D81B60",
            "sort_order": 4,
        },
    ]

    for item in associations:
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
            "0012_kindergartenslide_optional_title",
        ),
    ]

    operations = [
        migrations.CreateModel(
            name="PageHero",
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
                    "page",
                    models.CharField(
                        choices=[
                            (
                                "kindergarten",
                                "کودکستان",
                            ),
                            (
                                "about",
                                "درباره ما",
                            ),
                        ],
                        max_length=32,
                        unique=True,
                        verbose_name="صفحه",
                    ),
                ),
                (
                    "image",
                    models.ImageField(
                        blank=True,
                        null=True,
                        upload_to="page-heroes/%Y/%m/",
                        verbose_name="تصویر هیرو",
                    ),
                ),
                (
                    "alt_fa",
                    models.CharField(
                        blank=True,
                        max_length=250,
                        verbose_name=(
                            "متن جایگزین فارسی"
                        ),
                    ),
                ),
                (
                    "alt_en",
                    models.CharField(
                        blank=True,
                        max_length=250,
                        verbose_name=(
                            "متن جایگزین انگلیسی"
                        ),
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
                "verbose_name": "تصویر هیروی صفحه",
                "verbose_name_plural": (
                    "تصاویر هیروی صفحات"
                ),
                "ordering": ["page"],
            },
        ),
        migrations.CreateModel(
            name="StudentAssociation",
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
                    "slug",
                    models.SlugField(
                        max_length=100,
                        unique=True,
                        verbose_name="Slug",
                    ),
                ),
                (
                    "name_fa",
                    models.CharField(
                        max_length=200,
                        verbose_name="نام فارسی",
                    ),
                ),
                (
                    "name_en",
                    models.CharField(
                        blank=True,
                        max_length=200,
                        verbose_name="نام انگلیسی",
                    ),
                ),
                (
                    "description_fa",
                    models.TextField(
                        blank=True,
                        verbose_name="توضیحات فارسی",
                    ),
                ),
                (
                    "description_en",
                    models.TextField(
                        blank=True,
                        verbose_name="توضیحات انگلیسی",
                    ),
                ),
                (
                    "icon",
                    models.CharField(
                        blank=True,
                        max_length=100,
                        verbose_name="نام آیکن Lucide",
                    ),
                ),
                (
                    "accent_color",
                    models.CharField(
                        default="#2E7D32",
                        max_length=20,
                        verbose_name="رنگ تأکیدی",
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
                "verbose_name": "انجمن دانش‌آموزی",
                "verbose_name_plural": (
                    "انجمن‌های دانش‌آموزی"
                ),
                "ordering": ["sort_order", "id"],
            },
        ),
        migrations.RunPython(
            seed_editable_page_content,
            migrations.RunPython.noop,
        ),
    ]
