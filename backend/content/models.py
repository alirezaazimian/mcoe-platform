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

class Article(models.Model):
    class Category(models.TextChoices):
        EDUCATION = "education", "آموزش"
        PARENTING = "parenting", "فرزندپروری"
        PEDAGOGY = "pedagogy", "روش‌های آموزشی"
        PSYCHOLOGY = "psychology", "روان‌شناسی"
        GENERAL = "general", "عمومی"

    class Status(models.TextChoices):
        DRAFT = "draft", "پیش‌نویس"
        PENDING_REVIEW = "pending_review", "در انتظار بررسی"
        APPROVED = "approved", "تأیید شده"
        PUBLISHED = "published", "منتشر شده"
        ARCHIVED = "archived", "آرشیو شده"

    title_fa = models.CharField(
        max_length=300,
        verbose_name="عنوان فارسی",
    )

    title_en = models.CharField(
        max_length=300,
        blank=True,
        verbose_name="عنوان انگلیسی",
    )

    summary_fa = models.TextField(
        blank=True,
        verbose_name="خلاصه فارسی",
    )

    summary_en = models.TextField(
        blank=True,
        verbose_name="خلاصه انگلیسی",
    )

    body_fa = models.TextField(
        blank=True,
        verbose_name="متن فارسی",
    )

    body_en = models.TextField(
        blank=True,
        verbose_name="متن انگلیسی",
    )

    featured_image = models.ImageField(
        upload_to="articles/%Y/%m/",
        blank=True,
        null=True,
        verbose_name="تصویر شاخص",
    )

    category = models.CharField(
        max_length=30,
        choices=Category.choices,
        default=Category.GENERAL,
        verbose_name="دسته‌بندی",
    )

    tags = models.JSONField(
        default=list,
        blank=True,
        verbose_name="برچسب‌ها",
        help_text="مثال: ['آموزش', 'دانش‌آموز', 'مدرسه']",
    )

    author_name = models.CharField(
        max_length=200,
        blank=True,
        verbose_name="نام نویسنده",
    )

    reading_time_min = models.PositiveIntegerField(
        default=5,
        verbose_name="زمان مطالعه به دقیقه",
    )

    status = models.CharField(
        max_length=30,
        choices=Status.choices,
        default=Status.DRAFT,
        verbose_name="وضعیت",
    )

    publish_date = models.DateField(
        blank=True,
        null=True,
        verbose_name="تاریخ انتشار",
    )

    slug_fa = models.SlugField(
        max_length=300,
        blank=True,
        allow_unicode=True,
        verbose_name="Slug فارسی",
    )

    slug_en = models.SlugField(
        max_length=300,
        blank=True,
        verbose_name="Slug انگلیسی",
    )

    is_featured = models.BooleanField(
        default=False,
        verbose_name="مقاله ویژه",
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        ordering = ["-publish_date", "-id"]
        verbose_name = "مقاله"
        verbose_name_plural = "مقالات"

    def __str__(self):
        return self.title_fa


class Event(models.Model):
    class Status(models.TextChoices):
        UPCOMING = "upcoming", "در پیش‌رو"
        COMPLETED = "completed", "برگزار شده"

    title_fa = models.CharField(
        max_length=300,
        verbose_name="عنوان فارسی",
    )

    title_en = models.CharField(
        max_length=300,
        blank=True,
        verbose_name="عنوان انگلیسی",
    )

    description_fa = models.TextField(
        blank=True,
        verbose_name="توضیحات فارسی",
    )

    description_en = models.TextField(
        blank=True,
        verbose_name="توضیحات انگلیسی",
    )

    banner_image = models.ImageField(
        upload_to="events/%Y/%m/",
        blank=True,
        null=True,
        verbose_name="تصویر رویداد",
    )

    category = models.CharField(
        max_length=100,
        blank=True,
        verbose_name="دسته‌بندی",
    )

    event_date = models.DateTimeField(
        verbose_name="تاریخ و ساعت رویداد",
    )

    venue_fa = models.CharField(
        max_length=300,
        blank=True,
        verbose_name="محل برگزاری فارسی",
    )

    venue_en = models.CharField(
        max_length=300,
        blank=True,
        verbose_name="محل برگزاری انگلیسی",
    )

    organizer_fa = models.CharField(
        max_length=300,
        blank=True,
        verbose_name="برگزارکننده فارسی",
    )

    organizer_en = models.CharField(
        max_length=300,
        blank=True,
        verbose_name="برگزارکننده انگلیسی",
    )

    capacity = models.PositiveIntegerField(
        blank=True,
        null=True,
        verbose_name="ظرفیت",
    )

    registration_deadline = models.DateTimeField(
        blank=True,
        null=True,
        verbose_name="مهلت ثبت‌نام",
    )

    registration_url = models.URLField(
        blank=True,
        verbose_name="لینک ثبت‌نام",
    )

    map_url = models.URLField(
        blank=True,
        verbose_name="لینک نقشه",
    )

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.UPCOMING,
        verbose_name="وضعیت",
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        ordering = ["event_date"]
        verbose_name = "رویداد"
        verbose_name_plural = "رویدادها"

    def __str__(self):
        return self.title_fa


class HeroSlide(models.Model):
    image = models.ImageField(
        upload_to="hero-slides/%Y/%m/",
        verbose_name="تصویر اسلاید",
    )

    alt_fa = models.CharField(
        max_length=250,
        blank=True,
        verbose_name="متن جایگزین فارسی",
    )

    alt_en = models.CharField(
        max_length=250,
        blank=True,
        verbose_name="متن جایگزین انگلیسی",
    )

    is_active = models.BooleanField(
        default=True,
        verbose_name="فعال",
    )

    sort_order = models.PositiveIntegerField(
        default=0,
        verbose_name="ترتیب نمایش",
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        ordering = ["sort_order", "id"]
        verbose_name = "اسلاید صفحه اصلی"
        verbose_name_plural = "اسلایدهای صفحه اصلی"

    def __str__(self):
        return f"Hero Slide #{self.id or 'new'}"


class CollaborationRequest(models.Model):
    class Status(models.TextChoices):
        NEW = "new", "جدید"
        REVIEWING = "reviewing", "در حال بررسی"
        CONTACTED = "contacted", "تماس گرفته شده"
        ACCEPTED = "accepted", "پذیرفته شده"
        REJECTED = "rejected", "رد شده"

    full_name = models.CharField(
        max_length=200,
        verbose_name="نام و نام خانوادگی",
    )

    email = models.EmailField(
        verbose_name="ایمیل",
    )

    phone = models.CharField(
        max_length=30,
        verbose_name="شماره تماس",
    )

    expertise_area = models.CharField(
        max_length=200,
        verbose_name="حوزه تخصص",
    )

    resume = models.FileField(
        upload_to="collaboration-resumes/%Y/%m/",
        blank=True,
        null=True,
        verbose_name="رزومه",
    )

    message = models.TextField(
        verbose_name="پیام",
    )

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.NEW,
        verbose_name="وضعیت",
    )

    admin_notes = models.TextField(
        blank=True,
        verbose_name="یادداشت مدیریت",
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "درخواست همکاری"
        verbose_name_plural = "درخواست‌های همکاری"

    def __str__(self):
        return f"{self.full_name} - {self.expertise_area}"