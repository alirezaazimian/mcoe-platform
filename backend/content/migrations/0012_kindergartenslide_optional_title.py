from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0011_merge_0010_content_migrations'),
    ]

    operations = [
        migrations.AlterField(
            model_name='kindergartenslide',
            name='title_fa',
            field=models.CharField(
                blank=True,
                max_length=250,
                verbose_name='عنوان فارسی',
            ),
        ),
    ]
