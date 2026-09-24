from django.test import TestCase
from django.utils import timezone

from .models import (
    Article,
    Event,
    News,
    WorkingGroup,
)


class PublicSitemapTests(TestCase):
    def setUp(self):
        self.group = WorkingGroup.objects.create(
            name_fa="کارگروه آزمایشی",
            slug="seo-test-group",
        )
        self.article = Article.objects.create(
            title_fa="مقاله منتشر شده",
            status=Article.Status.PUBLISHED,
        )
        self.draft_article = Article.objects.create(
            title_fa="مقاله پیش‌نویس",
            status=Article.Status.DRAFT,
        )
        self.news = News.objects.create(
            title_fa="خبر منتشر شده",
            status=News.Status.PUBLISHED,
        )
        self.draft_news = News.objects.create(
            title_fa="خبر پیش‌نویس",
            status=News.Status.DRAFT,
        )
        self.event = Event.objects.create(
            title_fa="رویداد آزمایشی",
            event_date=timezone.now(),
        )

    def test_sitemap_is_public_xml_with_only_public_content(self):
        response = self.client.get(
            "/api/sitemap.xml"
        )

        self.assertEqual(response.status_code, 200)
        self.assertTrue(
            response["Content-Type"].startswith(
                "application/xml"
            )
        )

        body = response.content.decode("utf-8")

        self.assertIn(
            "https://mcoe.ir/levels/elementary1",
            body,
        )
        self.assertIn(
            f"https://mcoe.ir/working-groups/{self.group.slug}",
            body,
        )
        self.assertIn(
            f"https://mcoe.ir/articles/{self.article.id}",
            body,
        )
        self.assertNotIn(
            f"https://mcoe.ir/articles/{self.draft_article.id}",
            body,
        )
        self.assertIn(
            f"https://mcoe.ir/news/{self.news.id}",
            body,
        )
        self.assertNotIn(
            f"https://mcoe.ir/news/{self.draft_news.id}",
            body,
        )
        self.assertIn(
            f"https://mcoe.ir/events/{self.event.id}",
            body,
        )
