from django.conf import settings
from django.db import models


class DashboardPreference(models.Model):
    """Store user-specific dashboard preferences."""

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="dashboard_preferences",
    )
    show_completed = models.BooleanField(default=True)

    class Meta:
        app_label = "dashboard"
