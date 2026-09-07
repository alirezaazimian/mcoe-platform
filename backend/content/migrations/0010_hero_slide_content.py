from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0009_content_hero_images'),
    ]

    operations = [
        migrations.AddField(
            model_name='heroslide',
            name='cta_label_en',
            field=models.CharField(blank=True, max_length=120, verbose_name='متن دکمه انگلیسی'),
        ),
        migrations.AddField(
            model_name='heroslide',
            name='cta_label_fa',
            field=models.CharField(blank=True, max_length=120, verbose_name='متن دکمه فارسی'),
        ),
        migrations.AddField(
            model_name='heroslide',
            name='cta_url',
            field=models.CharField(blank=True, max_length=500, verbose_name='پیوند دکمه'),
        ),
        migrations.AddField(
            model_name='heroslide',
            name='description_en',
            field=models.TextField(blank=True, verbose_name='توضیحات انگلیسی'),
        ),
        migrations.AddField(
            model_name='heroslide',
            name='description_fa',
            field=models.TextField(blank=True, verbose_name='توضیحات فارسی'),
        ),
        migrations.AddField(
            model_name='heroslide',
            name='eyebrow_en',
            field=models.CharField(blank=True, max_length=160, verbose_name='پیش‌عنوان انگلیسی'),
        ),
        migrations.AddField(
            model_name='heroslide',
            name='eyebrow_fa',
            field=models.CharField(blank=True, max_length=160, verbose_name='پیش‌عنوان فارسی'),
        ),
        migrations.AddField(
            model_name='heroslide',
            name='title_en',
            field=models.CharField(blank=True, max_length=300, verbose_name='عنوان انگلیسی'),
        ),
        migrations.AddField(
            model_name='heroslide',
            name='title_fa',
            field=models.CharField(blank=True, max_length=300, verbose_name='عنوان فارسی'),
        ),
    ]
