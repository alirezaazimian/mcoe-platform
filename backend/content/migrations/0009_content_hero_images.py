from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0008_content_thumbnail_images'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='hero_image',
            field=models.ImageField(
                blank=True,
                null=True,
                upload_to='article-heroes/%Y/%m/',
                verbose_name='تصویر هیرو',
            ),
        ),
        migrations.AddField(
            model_name='event',
            name='hero_image',
            field=models.ImageField(
                blank=True,
                null=True,
                upload_to='event-heroes/%Y/%m/',
                verbose_name='تصویر هیرو رویداد',
            ),
        ),
        migrations.AddField(
            model_name='news',
            name='hero_image',
            field=models.ImageField(
                blank=True,
                null=True,
                upload_to='news-heroes/%Y/%m/',
                verbose_name='تصویر هیرو',
            ),
        ),
    ]
