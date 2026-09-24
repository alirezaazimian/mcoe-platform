import logging
from dataclasses import dataclass

from django.conf import settings
from django.core.exceptions import ImproperlyConfigured
from django.utils.module_loading import import_string

from .models import SmsDelivery
from .validators import mask_mobile


logger = logging.getLogger(__name__)


@dataclass(frozen=True)
class SmsResult:
    message_id: str = ""
    provider: str = ""


class ConsoleSmsBackend:
    """Development-only backend. It never runs when DEBUG is false."""

    provider_name = "console"

    def send_otp(self, *, mobile, code, student):
        if not settings.DEBUG:
            raise ImproperlyConfigured(
                "A production SMS backend must be configured."
            )

        logger.warning(
            "Development OTP for student_id=%s mobile=%s code=%s",
            student.pk,
            mask_mobile(mobile),
            code,
        )
        return SmsResult(
            message_id=f"console-{student.pk}",
            provider=self.provider_name,
        )


def get_sms_backend():
    backend_class = import_string(settings.STUDENT_SMS_BACKEND)
    return backend_class()


def send_student_otp(*, student, mobile, code):
    backend = get_sms_backend()
    delivery = SmsDelivery.objects.create(
        student=student,
        purpose="login_otp",
        destination_masked=mask_mobile(mobile),
        provider=getattr(backend, "provider_name", ""),
        status=SmsDelivery.Status.QUEUED,
    )

    try:
        result = backend.send_otp(
            mobile=mobile,
            code=code,
            student=student,
        )
    except Exception as exc:
        delivery.status = SmsDelivery.Status.FAILED
        delivery.error_code = type(exc).__name__[:80]
        delivery.save(
            update_fields=["status", "error_code", "updated_at"]
        )
        raise

    delivery.status = SmsDelivery.Status.SENT
    delivery.provider = result.provider or delivery.provider
    delivery.provider_message_id = result.message_id
    delivery.save(
        update_fields=[
            "status",
            "provider",
            "provider_message_id",
            "updated_at",
        ]
    )
    return delivery
