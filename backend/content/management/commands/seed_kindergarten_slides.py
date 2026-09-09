from pathlib import Path

from django.conf import settings
from django.core.files import File
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction

from content.models import KindergartenSlide


DEFAULT_SLIDES = [
    {
        "filename": "fc1ec2660_generated_c31ef5f8.jpg",
        "title_fa": "یادگیری از مسیر بازی",
        "title_en": "Learning through play",
        "text_fa": (
            "بازی برای کودک فقط سرگرمی نیست؛ راهی برای تجربه، "
            "کشف و فهم جهان است."
        ),
        "text_en": (
            "For children, play is not just entertainment. It is a way "
            "to explore, experience and understand the world."
        ),
        "tag_fa": "بازی گروهی",
        "tag_en": "Group play",
        "alt_fa": "کودکان در حال یادگیری از مسیر بازی گروهی",
        "alt_en": "Children learning through group play",
    },
    {
        "filename": "af4db7d64_6.jpg",
        "title_fa": "هنر، خلاقیت و بیان",
        "title_en": "Art, creativity and expression",
        "text_fa": (
            "کودکان با رنگ، فرم، ساختن و تخیل، دنیای درونی خود را "
            "بیان می‌کنند."
        ),
        "text_en": (
            "Children express their inner worlds through color, form, "
            "making and imagination."
        ),
        "tag_fa": "کارگاه خلاقیت",
        "tag_en": "Creative workshop",
        "alt_fa": "فعالیت هنری و خلاقانه کودکان",
        "alt_en": "Children taking part in a creative art activity",
    },
    {
        "filename": "7a95f3af1_IMG_7095.jpg",
        "title_fa": "تجربه، لمس و کشف",
        "title_en": "Touch, experience and discover",
        "text_fa": (
            "کشف جهان با مشاهده، لمس، گفت‌وگو و ارتباط با محیط اطراف "
            "اتفاق می‌افتد."
        ),
        "text_en": (
            "Discovery happens through observation, touch, dialogue and "
            "connection with the environment."
        ),
        "tag_fa": "کشف و تجربه",
        "tag_en": "Explore & discover",
        "alt_fa": "کودکان در حال تجربه و کشف محیط پیرامون",
        "alt_en": "Children exploring and discovering their surroundings",
    },
]


class Command(BaseCommand):
    help = (
        "Import the current Childhood Dream slider into editable "
        "KindergartenSlide records."
    )

    def add_arguments(self, parser):
        parser.add_argument(
            "--assets-dir",
            help=(
                "Directory containing the three current slider images. "
                "Defaults to <project-root>/public/media/site."
            ),
        )

    def handle(self, *args, **options):
        if KindergartenSlide.objects.exists():
            self.stdout.write(
                self.style.WARNING(
                    "Kindergarten slides already exist; no records were changed."
                )
            )
            return

        assets_dir = Path(
            options.get("assets_dir")
            or Path(settings.BASE_DIR).parent / "public" / "media" / "site"
        ).expanduser().resolve()

        if not assets_dir.is_dir():
            raise CommandError(
                f"Slider assets directory does not exist: {assets_dir}"
            )

        missing = [
            item["filename"]
            for item in DEFAULT_SLIDES
            if not (assets_dir / item["filename"]).is_file()
        ]

        if missing:
            raise CommandError(
                "Missing slider image(s): " + ", ".join(missing)
            )

        created_files = []

        try:
            with transaction.atomic():
                for sort_order, item in enumerate(DEFAULT_SLIDES, start=1):
                    image_path = assets_dir / item["filename"]
                    slide_data = {
                        key: value
                        for key, value in item.items()
                        if key != "filename"
                    }
                    slide = KindergartenSlide(
                        **slide_data,
                        sort_order=sort_order,
                        is_active=True,
                    )

                    with image_path.open("rb") as image_file:
                        slide.image.save(
                            image_path.name,
                            File(image_file),
                            save=False,
                        )

                    created_files.append(slide.image.name)
                    slide.save()
        except Exception:
            storage = KindergartenSlide._meta.get_field("image").storage

            for filename in created_files:
                storage.delete(filename)

            raise

        self.stdout.write(
            self.style.SUCCESS(
                f"Imported {len(created_files)} editable kindergarten slides."
            )
        )
