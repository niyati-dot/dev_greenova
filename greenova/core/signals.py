from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from .models import SystemConfig, Audit
import logging

logger = logging.getLogger('greenova.core')

@receiver(post_save, sender=SystemConfig)
def system_config_changed_handler(sender, instance, created, **kwargs):
    """Handle system configuration changes."""
    action = 'SYSTEM_CONFIG_CREATED' if created else 'SYSTEM_CONFIG_UPDATED'
    logger.info(f'System config change: {instance.key}={instance.value}')

    Audit.objects.create(
        action=action,
        details=f'System configuration {instance.key} {"created" if created else "updated"}',
        timestamp=timezone.now()
    )

@receiver(post_save, sender=Audit)
def audit_entry_created_handler(sender, instance, created, **kwargs):
    """Handle new audit entries."""
    if created:
        logger.info(f'Audit entry created: {instance.action}')
        # Implement audit retention policy
        if hasattr(instance, 'clean_old_entries'):
            instance.clean_old_entries()
