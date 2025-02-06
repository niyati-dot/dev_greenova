from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.utils import timezone
from django.conf import settings
from .models import Service, ServiceLog
import logging

logger = logging.getLogger('greenova.services')

@receiver(post_save, sender=Service)
def service_changed_handler(sender, instance, created, **kwargs):
    """Handle service creation and updates by logging the event."""
    if created:
        message = f"Service '{instance.name}' created"
        level = 'INFO'
    else:
        message = f"Service '{instance.name}' updated"
        level = 'INFO'

    # Create log entry with only required fields
    ServiceLog.objects.create(
        service=instance,
        message=message,
        level=level
    )

    # Log to system logger
    logger.info(message)

@receiver([post_save, post_delete], sender=ServiceLog)
def service_log_handler(sender, instance, **kwargs):
    """Handle service log events."""
    logger.info(f'Service log entry: {instance.service.name} - {instance.message}')
