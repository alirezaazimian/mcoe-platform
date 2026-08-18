from django.db import models

# Create your models here.
from django.db import models


class WorkingGroup(models.Model):
    name_fa = models.CharField(
        max_length=200,
        verbose_name='نام فارسی',
    )

    name_en = models.CharField(
        max_length=200,
        blank=True,
        verbose_name='نام انگلیسی',
    )

    slug = models.SlugField(
        max_length=200,
        unique=True,
        verbose_name='Slug',
    )

    description_fa = models.TextField(
        blank=True,
        verbose_name='توضیحات فارسی',
    )

    description_en = models.TextField(
        blank=True,
        verbose_name='توضیحات انگلیسی',
    )

    icon = models.CharField(
        max_length=100,
        blank=True,
        verbose_name='نام آیکن Lucide',
    )

    image = models.ImageField(
        upload_to='working-groups/',
        blank=True,
        null=True,
        verbose_name='تصویر',
    )

    sort_order = models.PositiveIntegerField(
        default=0,
        verbose_name='ترتیب نمایش',
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        ordering = ['sort_order', 'id']
        verbose_name = 'کارگروه'
        verbose_name_plural = 'کارگروه‌ها'

    def __str__(self):
        return self.name_fa

class WorkingGroupMember(models.Model):
    group = models.ForeignKey(
        WorkingGroup,
        on_delete=models.CASCADE,
        related_name='members',
        verbose_name='کارگروه',
    )

    name_fa = models.CharField(
        max_length=200,
        verbose_name='نام فارسی',
    )

    name_en = models.CharField(
        max_length=200,
        blank=True,
        verbose_name='نام انگلیسی',
    )

    role_fa = models.CharField(
        max_length=200,
        blank=True,
        verbose_name='سمت فارسی',
    )

    role_en = models.CharField(
        max_length=200,
        blank=True,
        verbose_name='سمت انگلیسی',
    )

    summary_fa = models.TextField(
        blank=True,
        verbose_name='خلاصه فارسی',
    )

    summary_en = models.TextField(
        blank=True,
        verbose_name='خلاصه انگلیسی',
    )

    photo = models.ImageField(
        upload_to='working-group-members/',
        blank=True,
        null=True,
        verbose_name='تصویر',
    )

    linkedin_url = models.URLField(
        blank=True,
        verbose_name='LinkedIn',
    )

    sort_order = models.PositiveIntegerField(
        default=0,
        verbose_name='ترتیب نمایش',
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        ordering = ['sort_order', 'id']
        verbose_name = 'عضو کارگروه'
        verbose_name_plural = 'اعضای کارگروه'

    def __str__(self):
        return f'{self.name_fa} - {self.group.name_fa}'


class News(models.Model):
    class Category(models.TextChoices):
        GENERAL = 'general', 'عمومی'
        ANNOUNCEMENT = 'announcement', 'اطلاعیه'
        EVENT = 'event', 'رویداد'
        ACADEMIC = 'academic', 'آموزشی'
        CULTURAL = 'cultural', 'فرهنگی'

    class Status(models.TextChoices):
        DRAFT = 'draft', 'پیش‌نویس'
        PENDING_REVIEW = 'pending_review', 'در انتظار بررسی'
        APPROVED = 'approved', 'تأیید شده'
        PUBLISHED = 'published', 'منتشر شده'
        ARCHIVED = 'archived', 'آرشیو شده'

    title_fa = models.CharField(
        max_length=300,
        verbose_name='عنوان فارسی',
    )

    title_en = models.CharField(
        max_length=300,
        blank=True,
        verbose_name='عنوان انگلیسی',
    )

    summary_fa = models.TextField(
        blank=True,
        verbose_name='خلاصه فارسی',
    )

    summary_en = models.TextField(
        blank=True,
        verbose_name='خلاصه انگلیسی',
    )

    body_fa = models.TextField(
        blank=True,
        verbose_name='متن فارسی',
    )

    body_en = models.TextField(
        blank=True,
        verbose_name='متن انگلیسی',
    )

    featured_image = models.ImageField(
        upload_to='news/%Y/%m/',
        blank=True,
        null=True,
        verbose_name='تصویر شاخص',
    )

    category = models.CharField(
        max_length=30,
        choices=Category.choices,
        default=Category.GENERAL,
        verbose_name='دسته‌بندی',
    )

    tags = models.JSONField(
        default=list,
        blank=True,
        verbose_name='برچسب‌ها',
        help_text="مثال:['ثبت‌نام', 'اطلاعیه', 'آموزشی']",
    )

    author_name = models.CharField(
        max_length=200,
        blank=True,
        verbose_name='نام نویسنده',
    )

    status = models.CharField(
        max_length=30,
        choices=Status.choices,
        default=Status.DRAFT,
        verbose_name='وضعیت',
    )

    publish_date = models.DateField(
        blank=True,
        null=True,
        verbose_name='تاریخ انتشار',
    )

    slug_fa = models.SlugField(
        max_length=300,
        blank=True,
        allow_unicode=True,
        verbose_name='Slug فارسی',
    )

    slug_en = models.SlugField(
        max_length=300,
        blank=True,
        verbose_name='Slug انگلیسی',
    )

    is_featured = models.BooleanField(
        default=False,
        verbose_name='خبر ویژه',
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        ordering = ['-publish_date', '-id']
        verbose_name = 'خبر'
        verbose_name_plural = 'اخبار'

    def __str__(self):
        return self.title_fa