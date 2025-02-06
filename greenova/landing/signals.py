from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from django.core.cache import cache
import logging

logger = logging.getLogger('greenova.landing')

@receiver(post_save)
def clear_landing_cache_handler(sender, **kwargs):
    """Clear landing page cache when related models are updated."""
    if sender._meta.app_label == 'landing':
        logger.info('Clearing landing page cache')
        cache.delete('landing_page_content')
        cache.delete('landing_page_stats')
