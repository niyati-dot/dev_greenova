"""
ASGI config for greenova project.
"""
import os
import logging
from django.core.asgi import get_asgi_application

logger = logging.getLogger('greenova.startup')

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "greenova.settings")

try:
    # Remove unused settings import
    application = get_asgi_application()
    logger.info('ASGI application initialized successfully')
except Exception as e:
    logger.error(f'Failed to initialize ASGI application: {e}')
    raise
