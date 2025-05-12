"""urls.py for the settings app in Greenova."""

from django.urls import path

from .views import SettingsView

app_name = "settings"

urlpatterns = [
    path("", SettingsView.as_view(), name="settings"),
]
