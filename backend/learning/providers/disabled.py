from . import ProviderNotConfigured


class DisabledOnlineClassProvider:
    key = "unconfigured"
    is_configured = False

    def create_meeting(self, *, session):
        raise ProviderNotConfigured(
            "Online-class provider has not been configured."
        )

    def join_url(self, *, session, participant, role):
        raise ProviderNotConfigured(
            "Online-class provider has not been configured."
        )
