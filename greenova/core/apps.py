from django.apps import AppConfig

class CoreConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'core'

    def ready(self):
        """Initialize app and connect signals."""
        from django.conf import settings
        # Initialize core app settings
        settings.CORE_SETTINGS = {
            'AUDIT_ENABLED': True,
            'SYSTEM_MONITORING': True
        }
        # Import signals
        from . import signals  # noqa: F401
