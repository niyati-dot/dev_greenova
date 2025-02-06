from django.apps import AppConfig

class LandingConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "landing"

    def ready(self):
        """Initialize app and connect signals."""
        try:
            import landing.signals  # noqa: F401
        except ImportError:
            pass
