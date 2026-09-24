from django.apps import AppConfig


class StudentsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "students"
    verbose_name = "مدیریت دانش‌آموزان"

    def ready(self):
        from . import checks  # noqa: F401
