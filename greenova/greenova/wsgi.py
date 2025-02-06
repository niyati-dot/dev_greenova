"""
WSGI config for greenova project.
"""

import logging
import os
import pathlib

from django.core.wsgi import get_wsgi_application
from whitenoise import WhiteNoise

logger = logging.getLogger("greenova.startup")

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "greenova.settings")

try:
    application = get_wsgi_application()
    application = WhiteNoise(application)
    static_dir = pathlib.Path(__file__).parent / "static"
    if static_dir.exists():
        application.add_files(str(static_dir), prefix="static/")
    logger.info("WSGI application initialized successfully")
except Exception as e:
    logger.error(f"Failed to initialize WSGI application: {e}")
    raise
