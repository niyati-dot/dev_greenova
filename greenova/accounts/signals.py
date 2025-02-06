from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver
from django.contrib.auth.models import User
from django.utils import timezone
from django.conf import settings
import logging

logger = logging.getLogger('greenova.accounts')

from django.contrib.auth import get_user_model
from .models import UserProfile

User = get_user_model()

@receiver(post_save, sender=User)
def user_created_handler(sender, instance, created, **kwargs):
    """Handle user creation events."""
    if created:
        logger.info(f'New user created: {instance.username}')
        if hasattr(settings, 'AUDIT_SETTINGS'):
            from core.models import Audit
            Audit.objects.create(
                action='USER_CREATED',
                user=instance,
                details=f'User {instance.username} created',
                timestamp=timezone.now()
            )

@receiver(pre_delete, sender=User)
def user_delete_handler(sender, instance, **kwargs):
    """Handle user deletion events."""
    logger.info(f'User deletion initiated: {instance.username}')
    if hasattr(settings, 'AUDIT_SETTINGS'):
        from core.models import Audit
        Audit.objects.create(
            action='USER_DELETED',
            user=instance,
            details=f'User {instance.username} deleted',
            timestamp=timezone.now()
        )

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    """Update UserProfile when User is updated."""
    if hasattr(instance, 'profile'):
        instance.profile.save()
