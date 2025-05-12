"""apps.py for the settings app in Greenova."""

from django.apps import AppConfig


class SettingsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "settings"
    verbose_name = "Settings"
