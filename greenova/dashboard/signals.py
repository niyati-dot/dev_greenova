import logging

from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone

from .models import DashboardPreference

logger = logging.getLogger("greenova.dashboard")


@receiver(post_save, sender=DashboardPreference)
def dashboard_preference_changed_handler(sender, instance, created, **kwargs):
    """Handle dashboard preference changes."""
    logger.info(f"Dashboard preferences updated for user: {instance.user}")

    if hasattr(instance, "user") and hasattr(settings, "AUDIT_SETTINGS"):
        from core.models import Audit

        Audit.objects.create(
            action="DASHBOARD_PREFS_UPDATED",
            user=instance.user,
            details=f"Dashboard preferences updated for {instance.user}",
            timestamp=timezone.now(),
        )
