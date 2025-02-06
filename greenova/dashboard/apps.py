from django.apps import AppConfig


class DashboardConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "dashboard"
    verbose_name = "Dashboard"

    def ready(self):
        """Perform app initialization."""
        try:
            import dashboard.signals  # noqa: F401
        except ImportError:
            pass
