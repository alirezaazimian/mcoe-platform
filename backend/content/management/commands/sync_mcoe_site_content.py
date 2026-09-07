from pathlib import Path
from urllib.parse import urlparse
from urllib.request import Request, urlopen

from django.core.files.base import ContentFile
from django.core.management.base import BaseCommand, CommandError

from content.models import (
    EducationLevel,
    Facility,
    Partner,
    SiteImage,
    SiteSection,
    WorkingGroup,
)


SCHOOL_IMAGES = [
    {
        'url': 'https://mcoe.ir/wp-content/uploads/2023/04/9.jpg',
        'alt_fa': 'کتابخانه مجتمع آموزشی معصومه عظیمیان',
        'alt_en': 'Library at Masoumeh Azimian Educational Complex',
    },
    {
        'url': 'https://mcoe.ir/wp-content/uploads/2023/08/553A0748.jpg',
        'alt_fa': 'سالن اجتماعات مجتمع آموزشی',
        'alt_en': 'Assembly hall at the educational complex',
    },
    {
        'url': 'https://mcoe.ir/wp-content/uploads/2025/12/IMG_0387_2.jpg',
        'alt_fa': 'آزمایشگاه آموزشی مدرسه',
        'alt_en': 'School learning laboratory',
    },
    {
        'url': 'https://mcoe.ir/wp-content/uploads/2023/08/553A0713-scaled.jpg',
        'alt_fa': 'فضای بازی و استراحت دانش‌آموزان',
        'alt_en': 'Student recreation and play area',
    },
    {
        'url': 'https://mcoe.ir/wp-content/uploads/2023/08/553A0724.jpg',
        'alt_fa': 'نمازخانه مجتمع آموزشی',
        'alt_en': 'Prayer room at the educational complex',
    },
    {
        'url': 'https://mcoe.ir/wp-content/uploads/2024/01/IMG_9433-scaled.jpg',
        'alt_fa': 'فعالیت آموزشی دانش‌آموزان مجتمع',
        'alt_en': 'Students taking part in a learning activity',
    },
    {
        'url': 'https://mcoe.ir/wp-content/uploads/2023/04/22-1024x644.jpg',
        'alt_fa': 'محیط آموزشی مدرسه',
        'alt_en': 'School learning environment',
    },
    {
        'url': 'https://mcoe.ir/wp-content/uploads/2023/04/23-1024x644.jpg',
        'alt_fa': 'فضای داخلی مجتمع آموزشی',
        'alt_en': 'Interior of the educational complex',
    },
    {
        'url': 'https://mcoe.ir/wp-content/uploads/2023/04/11-1024x644.jpg',
        'alt_fa': 'فعالیت گروهی دانش‌آموزان',
        'alt_en': 'Students in a group activity',
    },
]


LEVELS = [
    {
        'slug': 'kindergarten',
        'title_fa': 'پیش‌دبستانی',
        'title_en': 'Kindergarten',
        'description_fa': 'یادگیری شاد و هدفمند با محوریت بازی، تجربه و رشد همه‌جانبه کودک.',
        'description_en': 'Joyful, purposeful learning through play, experience and whole-child development.',
        'age_label_fa': '۳ تا ۶ سال',
        'age_label_en': 'Ages 3–6',
        'sort_order': 1,
    },
    {
        'slug': 'elementary1',
        'title_fa': 'دوره اول دبستان',
        'title_en': 'Elementary — First Cycle',
        'description_fa': 'ساخت پایه‌های سواد، تفکر، خلاقیت و مهارت‌های فردی در محیطی امن.',
        'description_en': 'Building foundations in literacy, thinking, creativity and personal skills.',
        'age_label_fa': 'پایه ۱ تا ۳',
        'age_label_en': 'Grades 1–3',
        'sort_order': 2,
    },
    {
        'slug': 'elementary2',
        'title_fa': 'دوره دوم دبستان',
        'title_en': 'Elementary — Second Cycle',
        'description_fa': 'تعمیق دانش، مسئولیت‌پذیری و پرورش توانایی حل مسئله و همکاری.',
        'description_en': 'Deepening knowledge, responsibility, problem-solving and collaboration.',
        'age_label_fa': 'پایه ۴ تا ۶',
        'age_label_en': 'Grades 4–6',
        'sort_order': 3,
    },
    {
        'slug': 'middleSchool',
        'title_fa': 'دوره اول متوسطه',
        'title_en': 'Middle School — First Cycle',
        'description_fa': 'هدایت استعدادها و تقویت استقلال فکری برای ورود آگاهانه به نوجوانی.',
        'description_en': 'Guiding talents and strengthening independent thought through early adolescence.',
        'age_label_fa': 'پایه ۷ تا ۹',
        'age_label_en': 'Grades 7–9',
        'sort_order': 4,
    },
]


PARTNERS = [
    ('وزارت آموزش و پرورش', 'Ministry of Education', 'https://medu.ir', 'BookOpen'),
    ('کانون پرورش فکری کودکان و نوجوانان', 'Institute for the Intellectual Development of Children and Young Adults', 'https://kpf.ir', 'Lightbulb'),
    ('مؤسسه پژوهشی کودکان دنیا', "Children's World Research Institute", 'https://koodakandonya.org', 'Globe'),
    ('مؤسسه نوجهان', 'Nojahan Institute', 'https://nojahan.ir', 'GraduationCap'),
    ('انتشارات مدرسه', 'Madraseh Publications', 'https://madresehpub.ir', 'Library'),
    ('انتشارات بازی و اندیشه', 'Bazi & Andisheh Publications', 'https://baziandisheh.com', 'Puzzle'),
    ('موزه ایرانک', 'Iranak Museum', 'https://iranak.org', 'Landmark'),
    ('مؤسسه صلح درون', 'Solhe Daroun Institute', 'https://solhedaroun.com', 'Heart'),
    ('مؤسسه پژوهشی تاریخ و ادبیات', 'History & Literature Research Institute', 'https://koodaki.org', 'Scroll'),
]


FACILITIES = [
    ('کلاس‌های استاندارد', 'Standard Classrooms', 'مجهز به ابزار فناوری اطلاعات و امکانات چندرسانه‌ای', 'Equipped with IT tools and multimedia facilities', 'Building2'),
    ('آزمایشگاه‌های مجهز', 'Equipped Labs', 'آزمایشگاه‌های علوم، زیست‌شناسی، فیزیک و اپتیک برای آموزش عملی', 'Science, biology, physics and optics labs for hands-on learning', 'FlaskConical'),
    ('کتابخانه', 'Library', 'منبع غنی آموزشی و محیطی آرام برای مطالعه', 'A rich learning resource and a calm reading environment', 'Library'),
    ('فضای هنر', 'Art Space', 'کارگاه نقاشی، سفال و هنرهای دستی', 'Painting, pottery and crafts workshops', 'Palette'),
    ('سالن ورزشی', 'Sports Hall', 'فضای مناسب تربیت بدنی و فعالیت‌های ورزشی', 'A dedicated space for physical education and sports', 'Dumbbell'),
    ('حیاط و فضای باز', 'Yard & Open Space', 'فضای بازی و فعالیت‌های برون‌کلاسی', 'Playground and outdoor learning activities', 'Trees'),
    ('آشپزخانه و ناهارخوری', 'Kitchen & Dining Hall', 'پخت روزانه و سرو غذای گرم', 'Daily preparation and service of hot meals', 'UtensilsCrossed'),
    ('سایت کامپیوتر', 'Computer Lab', 'سیستم‌های به‌روز و شبکه داخلی فعال', 'Modern systems with an active internal network', 'Monitor'),
    ('کارگاه مونته‌سوری', 'Montessori Workshop', 'ابزارهای بازی، یادگیری و پرورش توانایی‌های شناختی', 'Play and learning tools for cognitive development', 'Puzzle'),
]


SECTIONS = {
    'education-levels': {
        'title_fa': 'مقاطع تحصیلی',
        'title_en': 'Educational Levels',
        'subtitle_fa': 'مسیر آموزشی',
        'subtitle_en': 'Educational Path',
        'body_fa': 'مسیر پیوسته رشد و یادگیری از پیش‌دبستانی تا متوسطه اول.',
        'body_en': 'A continuous path of growth and learning from kindergarten to middle school.',
    },
    'partners': {
        'title_fa': 'مؤسسه‌هایی که با آن‌ها در ارتباط هستیم',
        'title_en': 'Institutions We Are Connected With',
        'subtitle_fa': 'همراهان آموزشی',
        'subtitle_en': 'Educational Partners',
        'body_fa': '',
        'body_en': '',
    },
    'home-gallery': {
        'title_fa': 'نگاهی به مجتمع',
        'title_en': 'A Glimpse of Our Campus',
        'subtitle_fa': 'گالری',
        'subtitle_en': 'Gallery',
        'body_fa': '',
        'body_en': '',
    },
    'educational-space': {
        'title_fa': 'فضای آموزشی',
        'title_en': 'Educational Space',
        'subtitle_fa': 'فضایی برای یادگیری و رشد',
        'subtitle_en': 'A place to learn and grow',
        'body_fa': 'فضاهای آموزشی مجتمع برای تجربه، خلاقیت، تعامل و یادگیری ایمن طراحی شده‌اند.',
        'body_en': 'Our educational spaces are designed for safe learning, creativity, interaction and experience.',
    },
}


class Command(BaseCommand):
    help = 'Seed editable site content, import official school photos and assign workgroup artwork.'

    def add_arguments(self, parser):
        parser.add_argument(
            '--workgroup-assets',
            type=str,
            help='Directory containing <workgroup-slug>.png files.',
        )
        parser.add_argument(
            '--skip-downloads',
            action='store_true',
            help='Seed database records without downloading official school images.',
        )
        parser.add_argument(
            '--force',
            action='store_true',
            help='Replace existing managed images.',
        )

    def handle(self, *args, **options):
        self.seed_sections()
        self.seed_levels()
        self.seed_partners()
        self.seed_facilities()

        if not options['skip_downloads']:
            self.sync_school_images(force=options['force'])

        assets = options.get('workgroup_assets')
        if assets:
            self.sync_workgroup_assets(Path(assets), force=options['force'])

        self.stdout.write(self.style.SUCCESS('Editable site content is synchronized.'))

    def seed_sections(self):
        for key, defaults in SECTIONS.items():
            SiteSection.objects.update_or_create(key=key, defaults=defaults)
        self.stdout.write(f'Site sections: {len(SECTIONS)} synchronized')

    def seed_levels(self):
        for values in LEVELS:
            values = values.copy()
            slug = values.pop('slug')
            EducationLevel.objects.update_or_create(slug=slug, defaults=values)
        self.stdout.write(f'Education levels: {len(LEVELS)} synchronized')

    def seed_partners(self):
        for order, (name_fa, name_en, url, icon) in enumerate(PARTNERS, 1):
            Partner.objects.update_or_create(
                name_fa=name_fa,
                defaults={
                    'name_en': name_en,
                    'url': url,
                    'icon': icon,
                    'is_active': True,
                    'sort_order': order,
                },
            )
        self.stdout.write(f'Partners: {len(PARTNERS)} synchronized')

    def seed_facilities(self):
        for order, values in enumerate(FACILITIES, 1):
            name_fa, name_en, description_fa, description_en, icon = values
            Facility.objects.update_or_create(
                name_fa=name_fa,
                defaults={
                    'name_en': name_en,
                    'description_fa': description_fa,
                    'description_en': description_en,
                    'icon': icon,
                    'is_active': True,
                    'sort_order': order,
                },
            )
        self.stdout.write(f'Facilities: {len(FACILITIES)} synchronized')

    def download(self, url):
        request = Request(url, headers={'User-Agent': 'MCOE content sync/1.0'})
        with urlopen(request, timeout=30) as response:
            return response.read()

    def store_remote_image(self, instance, field_name, item, filename, force=False):
        field = getattr(instance, field_name)
        if field and not force:
            return False

        try:
            content = self.download(item['url'])
        except Exception as exc:
            self.stderr.write(self.style.WARNING(f'Image skipped: {item["url"]} ({exc})'))
            return False

        suffix = Path(urlparse(item['url']).path).suffix or '.jpg'
        field.save(f'{filename}{suffix}', ContentFile(content), save=True)
        return True

    def sync_school_images(self, force=False):
        saved = 0

        for index, item in enumerate(SCHOOL_IMAGES, 1):
            gallery_image, _ = SiteImage.objects.get_or_create(
                section=SiteImage.Section.HOME_GALLERY,
                sort_order=index,
                defaults={
                    'alt_fa': item['alt_fa'],
                    'alt_en': item['alt_en'],
                    'is_active': True,
                },
            )
            gallery_image.alt_fa = item['alt_fa']
            gallery_image.alt_en = item['alt_en']
            gallery_image.is_active = True
            gallery_image.save(update_fields=['alt_fa', 'alt_en', 'is_active', 'updated_at'])
            saved += int(self.store_remote_image(
                gallery_image,
                'image',
                item,
                f'home-gallery-{index:02d}',
                force,
            ))

        for index, item in enumerate(SCHOOL_IMAGES[:5], 1):
            space_image, _ = SiteImage.objects.get_or_create(
                section=SiteImage.Section.EDUCATIONAL_SPACE,
                sort_order=index,
                defaults={
                    'alt_fa': item['alt_fa'],
                    'alt_en': item['alt_en'],
                    'is_active': True,
                },
            )
            space_image.alt_fa = item['alt_fa']
            space_image.alt_en = item['alt_en']
            space_image.is_active = True
            space_image.save(update_fields=['alt_fa', 'alt_en', 'is_active', 'updated_at'])
            saved += int(self.store_remote_image(
                space_image,
                'image',
                item,
                f'educational-space-{index:02d}',
                force,
            ))

        for index, level_values in enumerate(LEVELS):
            level = EducationLevel.objects.get(slug=level_values['slug'])
            saved += int(self.store_remote_image(
                level,
                'image',
                SCHOOL_IMAGES[index + 5],
                f'education-level-{level.slug}',
                force,
            ))

        self.stdout.write(f'Official school images saved: {saved}')

    def sync_workgroup_assets(self, assets_dir, force=False):
        if not assets_dir.is_dir():
            raise CommandError(f'Workgroup asset directory not found: {assets_dir}')

        saved = 0
        missing = 0

        for group in WorkingGroup.objects.all():
            source = next(
                (
                    assets_dir / f'{group.slug}.{extension}'
                    for extension in ('webp', 'png', 'jpg', 'jpeg')
                    if (assets_dir / f'{group.slug}.{extension}').is_file()
                ),
                None,
            )
            if source is None:
                missing += 1
                self.stderr.write(self.style.WARNING(f'Missing artwork: {group.slug}'))
                continue

            if group.image and not force:
                continue

            group.image.save(
                f'{group.slug}{source.suffix.lower()}',
                ContentFile(source.read_bytes()),
                save=True,
            )
            saved += 1

        self.stdout.write(f'Workgroup images saved: {saved}; missing: {missing}')
