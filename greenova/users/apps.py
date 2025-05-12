"""Django application configuration for the users app."""

from django.apps import AppConfig


class UsersConfig(AppConfig):
    """Configuration for the users app."""

    name = "users"
    default_auto_field = "django.db.models.BigAutoField"

    def ready(self):
        """Import signals when the app is ready."""
