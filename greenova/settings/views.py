"""views.py for the settings app in Greenova."""

from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import TemplateView


class SettingsView(LoginRequiredMixin, TemplateView):
    """Display site or user settings."""

    template_name = "settings/settings.html"
