import shutil
import tempfile
from io import BytesIO

from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile

from PIL import Image

from rest_framework import status
from rest_framework.test import APITestCase

from .models import (
    EducationHeroSlide,
    PageHero,
    StudentAssociation,
)


User = get_user_model()


def test_image(name="test-slide.png"):
    output = BytesIO()
    Image.new(
        "RGB",
        (2, 2),
        color="#2E7D32",
    ).save(output, format="PNG")

    return SimpleUploadedFile(
        name,
        output.getvalue(),
        content_type="image/png",
    )


class EditablePublicContentApiTests(APITestCase):
    def setUp(self):
        self.media_root = tempfile.mkdtemp()
        self.settings_override = self.settings(
            MEDIA_ROOT=self.media_root
        )
        self.settings_override.enable()

        self.staff_user = User.objects.create_user(
            username="content-admin@example.com",
            email="content-admin@example.com",
            password="Secure-Test-Pass-9482",
            is_staff=True,
        )

    def tearDown(self):
        self.settings_override.disable()
        shutil.rmtree(
            self.media_root,
            ignore_errors=True,
        )

    def test_education_slides_filter_by_level_and_visibility(self):
        visible = EducationHeroSlide.objects.create(
            level="elementary-first",
            source_url="/media/visible.jpg",
            is_active=True,
            sort_order=1,
        )
        hidden = EducationHeroSlide.objects.create(
            level="elementary-first",
            source_url="/media/hidden.jpg",
            is_active=False,
            sort_order=2,
        )
        EducationHeroSlide.objects.create(
            level="middle-first",
            source_url="/media/middle.jpg",
            is_active=True,
        )

        response = self.client.get(
            "/api/education-hero-slides/",
            {"level": "elementary-first"},
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )
        response_ids = {
            record["id"]
            for record in response.data
        }
        self.assertIn(
            visible.id,
            response_ids,
        )
        self.assertNotIn(
            hidden.id,
            response_ids,
        )
        self.assertTrue(
            all(
                record["level"]
                == "elementary-first"
                for record in response.data
            )
        )

    def test_staff_can_create_update_and_delete_education_slide(self):
        self.client.force_authenticate(
            user=self.staff_user
        )

        create_response = self.client.post(
            "/api/education-hero-slides/",
            {
                "level": "elementary-second",
                "image": test_image(),
                "alt_fa": "تصویر آزمایشی",
                "is_active": True,
                "sort_order": 3,
            },
            format="multipart",
        )

        self.assertEqual(
            create_response.status_code,
            status.HTTP_201_CREATED,
        )
        self.assertTrue(
            create_response.data["image_url"]
        )

        slide_id = create_response.data["id"]
        update_response = self.client.patch(
            f"/api/education-hero-slides/{slide_id}/",
            {"alt_en": "Updated slide"},
            format="json",
        )

        self.assertEqual(
            update_response.status_code,
            status.HTTP_200_OK,
        )
        self.assertEqual(
            update_response.data["alt_en"],
            "Updated slide",
        )

        delete_response = self.client.delete(
            f"/api/education-hero-slides/{slide_id}/"
        )
        self.assertEqual(
            delete_response.status_code,
            status.HTTP_204_NO_CONTENT,
        )

    def test_page_hero_is_publicly_readable_and_staff_editable(self):
        hero, _ = PageHero.objects.update_or_create(
            page="about",
            defaults={
                "alt_fa": "درباره ما",
            },
        )

        public_response = self.client.get(
            "/api/page-heroes/about/"
        )
        self.assertEqual(
            public_response.status_code,
            status.HTTP_200_OK,
        )

        forbidden_response = self.client.patch(
            "/api/page-heroes/about/",
            {"alt_fa": "غیرمجاز"},
            format="json",
        )
        self.assertEqual(
            forbidden_response.status_code,
            status.HTTP_401_UNAUTHORIZED,
        )

        self.client.force_authenticate(
            user=self.staff_user
        )
        update_response = self.client.patch(
            "/api/page-heroes/about/",
            {
                "alt_en": "About MCOE",
                "image": test_image(
                    "about.png"
                ),
            },
            format="multipart",
        )

        self.assertEqual(
            update_response.status_code,
            status.HTTP_200_OK,
        )
        self.assertTrue(
            update_response.data["image_url"]
        )

        hero.refresh_from_db()
        self.assertEqual(
            hero.alt_en,
            "About MCOE",
        )

    def test_association_crud_and_public_visibility(self):
        StudentAssociation.objects.create(
            slug="hidden",
            name_fa="پنهان",
            accent_color="#2E7D32",
            is_active=False,
        )

        public_response = self.client.get(
            "/api/student-associations/"
        )
        self.assertEqual(
            public_response.status_code,
            status.HTTP_200_OK,
        )
        public_slugs = {
            record["slug"]
            for record in public_response.data
        }
        self.assertNotIn(
            "hidden",
            public_slugs,
        )

        self.client.force_authenticate(
            user=self.staff_user
        )
        create_response = self.client.post(
            "/api/student-associations/",
            {
                "slug": "robotics",
                "name_fa": "انجمن رباتیک",
                "name_en": "Robotics Association",
                "description_fa": "طراحی و ساخت",
                "description_en": "Design and making",
                "icon": "bot",
                "accent_color": "#D81B60",
                "is_active": True,
                "sort_order": 5,
            },
            format="json",
        )

        self.assertEqual(
            create_response.status_code,
            status.HTTP_201_CREATED,
        )

        update_response = self.client.patch(
            "/api/student-associations/robotics/",
            {"sort_order": 2},
            format="json",
        )
        self.assertEqual(
            update_response.status_code,
            status.HTTP_200_OK,
        )

        delete_response = self.client.delete(
            "/api/student-associations/robotics/"
        )
        self.assertEqual(
            delete_response.status_code,
            status.HTTP_204_NO_CONTENT,
        )
