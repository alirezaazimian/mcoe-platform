from django.conf import settings
from django.core.checks import Warning, register


@register()
def student_sms_backend_check(app_configs, **kwargs):
    if (
        not settings.DEBUG
        and settings.STUDENT_SMS_BACKEND
        == "students.sms.ConsoleSmsBackend"
    ):
        return [
            Warning(
                "Production SMS backend is not configured; student OTP "
                "delivery will remain disabled.",
                hint=(
                    "Set STUDENT_SMS_BACKEND after the SMS provider "
                    "adapter is installed."
                ),
                id="students.W001",
            )
        ]

    return []
