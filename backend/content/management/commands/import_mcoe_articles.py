import json
from pathlib import Path

from django.core.files.base import ContentFile
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction

from content.models import Article


IMAGE_FIELDS = {
    "thumbnail_image": "thumbnail",
    "hero_image": "hero",
    "featured_image": "detail",
}


class Command(BaseCommand):
    help = (
        "Import the curated MCOE article-poster bundle. The command is "
        "idempotent and keeps the three image roles separate."
    )

    def add_arguments(self, parser):
        parser.add_argument(
            "--source",
            required=True,
            help="Directory containing articles.json and its image folders.",
        )
        parser.add_argument(
            "--force-images",
            action="store_true",
            help="Replace existing thumbnail, hero and detail images.",
        )
        parser.add_argument(
            "--dry-run",
            action="store_true",
            help="Validate and report without changing the database or media storage.",
        )

    def handle(self, *args, **options):
        source_dir = Path(options["source"]).expanduser().resolve()
        manifest_path = source_dir / "articles.json"

        if not source_dir.is_dir():
            raise CommandError(f"Article bundle directory not found: {source_dir}")
        if not manifest_path.is_file():
            raise CommandError(f"Manifest not found: {manifest_path}")

        manifest = self.load_manifest(manifest_path)
        articles = manifest.get("articles")
        if manifest.get("schema_version") != 1 or not isinstance(articles, list):
            raise CommandError("Unsupported or invalid article bundle manifest.")

        validated = [
            self.validate_article(source_dir, index, item)
            for index, item in enumerate(articles, 1)
        ]

        self.stdout.write(
            f"Validated {len(validated)} articles and {len(validated) * 3} image assets."
        )

        if options["dry_run"]:
            for item in validated:
                self.stdout.write(f"DRY RUN: {item['key']} — {item['title_fa']}")
            self.stdout.write(self.style.SUCCESS("Dry run completed; no changes were made."))
            return

        created_count = 0
        updated_count = 0
        image_count = 0

        with transaction.atomic():
            for item in validated:
                article = (
                    Article.objects.filter(slug_en=item["slug_en"])
                    .order_by("id")
                    .first()
                )
                created = article is None
                if created:
                    article = Article(slug_en=item["slug_en"])

                for field_name in (
                    "title_fa",
                    "title_en",
                    "summary_fa",
                    "summary_en",
                    "body_fa",
                    "body_en",
                    "category",
                    "tags",
                    "author_name",
                    "reading_time_min",
                    "status",
                    "publish_date",
                    "slug_fa",
                    "slug_en",
                    "is_featured",
                ):
                    setattr(article, field_name, item.get(field_name))

                article.save()

                for field_name, filename_role in IMAGE_FIELDS.items():
                    field = getattr(article, field_name)
                    if field and not options["force_images"]:
                        continue

                    if field and options["force_images"]:
                        field.delete(save=False)

                    source = item["resolved_images"][field_name]
                    destination_name = (
                        f"mcoe-{item['key']}-{filename_role}{source.suffix.lower()}"
                    )
                    field.save(
                        destination_name,
                        ContentFile(source.read_bytes()),
                        save=True,
                    )
                    image_count += 1

                if created:
                    created_count += 1
                else:
                    updated_count += 1

                action = "created" if created else "updated"
                self.stdout.write(f"{action}: {article.title_fa}")

        self.stdout.write(
            self.style.SUCCESS(
                "Article import completed — "
                f"{created_count} created, {updated_count} updated, "
                f"{image_count} images saved."
            )
        )

    def load_manifest(self, manifest_path):
        try:
            return json.loads(manifest_path.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError) as exc:
            raise CommandError(f"Cannot read manifest: {exc}") from exc

    def validate_article(self, source_dir, index, raw_item):
        if not isinstance(raw_item, dict):
            raise CommandError(f"Article #{index} must be an object.")

        item = raw_item.copy()
        required = (
            "key",
            "title_fa",
            "slug_fa",
            "slug_en",
            "category",
            "status",
            "images",
        )
        missing = [key for key in required if not item.get(key)]
        if missing:
            raise CommandError(
                f"Article #{index} is missing required values: {', '.join(missing)}"
            )

        if item["category"] not in Article.Category.values:
            raise CommandError(
                f"Invalid category for {item['key']}: {item['category']}"
            )
        if item["status"] not in Article.Status.values:
            raise CommandError(f"Invalid status for {item['key']}: {item['status']}")

        images = item["images"]
        if not isinstance(images, dict):
            raise CommandError(f"Images for {item['key']} must be an object.")

        resolved_images = {}
        for field_name in IMAGE_FIELDS:
            relative_value = images.get(field_name)
            if not relative_value:
                raise CommandError(f"Missing {field_name} for {item['key']}.")

            candidate = (source_dir / relative_value).resolve()
            try:
                candidate.relative_to(source_dir)
            except ValueError as exc:
                raise CommandError(
                    f"Image path escapes the bundle for {item['key']}: {relative_value}"
                ) from exc

            if not candidate.is_file():
                raise CommandError(f"Image not found for {item['key']}: {candidate}")
            resolved_images[field_name] = candidate

        item["resolved_images"] = resolved_images
        item.setdefault("title_en", "")
        item.setdefault("summary_fa", "")
        item.setdefault("summary_en", "")
        item.setdefault("body_fa", "")
        item.setdefault("body_en", "")
        item.setdefault("tags", [])
        item.setdefault("author_name", "")
        item.setdefault("reading_time_min", 2)
        item.setdefault("publish_date", None)
        item.setdefault("is_featured", False)
        return item
