from django.apps import AppConfig


class AccountsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'accounts'

    def ready(self):
        """Initialize app and connect signals."""
        from django.conf import settings

        settings.LOGIN_URL = 'accounts:login'
        settings.LOGIN_REDIRECT_URL = 'dashboard:index'
        settings.LOGOUT_REDIRECT_URL = 'accounts:logout'
        # Import signals
        from . import signals  # noqa: F401
