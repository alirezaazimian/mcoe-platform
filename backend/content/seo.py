from xml.etree import ElementTree

from django.http import HttpResponse
from django.views import View

from .models import (
    Article,
    Event,
    News,
    WorkingGroup,
)


SITE_URL = "https://mcoe.ir"

STATIC_URLS = [
    ("/", "weekly", "1.0"),
    ("/about", "monthly", "0.8"),
    ("/history", "yearly", "0.6"),
    ("/educational-space", "monthly", "0.7"),
    ("/levels", "monthly", "0.9"),
    ("/levels/kindergarten", "monthly", "0.9"),
    ("/levels/elementary1", "monthly", "0.9"),
    ("/levels/elementary2", "monthly", "0.9"),
    ("/levels/middleSchool", "monthly", "0.9"),
    ("/working-groups", "weekly", "0.7"),
    ("/associations", "monthly", "0.7"),
    ("/articles", "weekly", "0.7"),
    ("/news", "daily", "0.8"),
    ("/events", "weekly", "0.7"),
    ("/collaborate", "monthly", "0.5"),
]


def add_url(
    urlset,
    path,
    changefreq,
    priority,
    lastmod=None,
):
    url = ElementTree.SubElement(
        urlset,
        "url",
    )
    ElementTree.SubElement(
        url,
        "loc",
    ).text = f"{SITE_URL}{path}"

    if lastmod:
        ElementTree.SubElement(
            url,
            "lastmod",
        ).text = lastmod.date().isoformat()

    ElementTree.SubElement(
        url,
        "changefreq",
    ).text = changefreq
    ElementTree.SubElement(
        url,
        "priority",
    ).text = priority


class PublicSitemapView(View):
    http_method_names = ["get", "head", "options"]

    def get(self, request):
        del request

        urlset = ElementTree.Element(
            "urlset",
            {
                "xmlns": (
                    "http://www.sitemaps.org/"
                    "schemas/sitemap/0.9"
                ),
            },
        )

        for path, changefreq, priority in STATIC_URLS:
            add_url(
                urlset,
                path,
                changefreq,
                priority,
            )

        for group in WorkingGroup.objects.only(
            "slug",
            "updated_at",
        ):
            add_url(
                urlset,
                f"/working-groups/{group.slug}",
                "monthly",
                "0.6",
                group.updated_at,
            )

        for article in Article.objects.filter(
            status=Article.Status.PUBLISHED,
        ).only("id", "updated_at"):
            add_url(
                urlset,
                f"/articles/{article.id}",
                "monthly",
                "0.6",
                article.updated_at,
            )

        for item in News.objects.filter(
            status=News.Status.PUBLISHED,
        ).only("id", "updated_at"):
            add_url(
                urlset,
                f"/news/{item.id}",
                "weekly",
                "0.6",
                item.updated_at,
            )

        for event in Event.objects.only(
            "id",
            "updated_at",
        ):
            add_url(
                urlset,
                f"/events/{event.id}",
                "weekly",
                "0.6",
                event.updated_at,
            )

        payload = ElementTree.tostring(
            urlset,
            encoding="utf-8",
            xml_declaration=True,
        )
        response = HttpResponse(
            payload,
            content_type=(
                "application/xml; charset=utf-8"
            ),
        )
        response["Cache-Control"] = (
            "public, max-age=300"
        )

        return response
