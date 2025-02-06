from django.apps import AppConfig

class ServicesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'services'

    def ready(self):
        """Initialize app and connect signals."""
        from django.conf import settings
        # Initialize services app settings
        settings.SERVICES_SETTINGS = {
            'CHECK_INTERVAL': 300,  # 5 minutes
            'ALERT_THRESHOLD': 3
        }
        # Import signals
        from . import signals  # noqa: F401
