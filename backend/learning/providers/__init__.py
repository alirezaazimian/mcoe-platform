from django.conf import settings
from django.utils.module_loading import import_string


class ProviderNotConfigured(RuntimeError):
    pass


def get_online_class_provider():
    backend_class = import_string(settings.ONLINE_CLASS_PROVIDER_BACKEND)
    return backend_class()
