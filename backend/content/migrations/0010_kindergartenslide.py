from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0009_content_hero_images'),
    ]

    operations = [
        migrations.CreateModel(
            name='KindergartenSlide',
            fields=[
                (
                    'id',
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name='ID',
                    ),
                ),
                (
                    'image',
                    models.ImageField(
                        upload_to='kindergarten-slides/%Y/%m/',
                        verbose_name='تصویر اسلاید کودکستان',
                    ),
                ),
                (
                    'title_fa',
                    models.CharField(
                        max_length=250,
                        verbose_name='عنوان فارسی',
                    ),
                ),
                (
                    'title_en',
                    models.CharField(
                        blank=True,
                        max_length=250,
                        verbose_name='عنوان انگلیسی',
                    ),
                ),
                (
                    'text_fa',
                    models.TextField(
                        blank=True,
                        verbose_name='متن فارسی',
                    ),
                ),
                (
                    'text_en',
                    models.TextField(
                        blank=True,
                        verbose_name='متن انگلیسی',
                    ),
                ),
                (
                    'tag_fa',
                    models.CharField(
                        blank=True,
                        max_length=120,
                        verbose_name='برچسب فارسی',
                    ),
                ),
                (
                    'tag_en',
                    models.CharField(
                        blank=True,
                        max_length=120,
                        verbose_name='برچسب انگلیسی',
                    ),
                ),
                (
                    'alt_fa',
                    models.CharField(
                        blank=True,
                        max_length=250,
                        verbose_name='متن جایگزین فارسی',
                    ),
                ),
                (
                    'alt_en',
                    models.CharField(
                        blank=True,
                        max_length=250,
                        verbose_name='متن جایگزین انگلیسی',
                    ),
                ),
                (
                    'is_active',
                    models.BooleanField(
                        default=True,
                        verbose_name='فعال',
                    ),
                ),
                (
                    'sort_order',
                    models.PositiveIntegerField(
                        default=0,
                        verbose_name='ترتیب نمایش',
                    ),
                ),
                (
                    'created_at',
                    models.DateTimeField(auto_now_add=True),
                ),
                (
                    'updated_at',
                    models.DateTimeField(auto_now=True),
                ),
            ],
            options={
                'verbose_name': 'اسلاید کودکستان',
                'verbose_name_plural': 'اسلایدهای کودکستان',
                'ordering': ['sort_order', 'id'],
            },
        ),
    ]
