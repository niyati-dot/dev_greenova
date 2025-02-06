from django.core.management.base import BaseCommand
from django.conf import settings
import os

class Command(BaseCommand):
    help = 'Verify static files configuration and collection'

    def handle(self, *args, **options):
        # Check STATIC_ROOT
        if not hasattr(settings, 'STATIC_ROOT'):
            self.stdout.write(self.style.ERROR('STATIC_ROOT not configured'))
            return

        # Create STATIC_ROOT if it doesn't exist
        if not os.path.exists(settings.STATIC_ROOT):
            os.makedirs(settings.STATIC_ROOT)
            self.stdout.write(self.style.SUCCESS(f'Created STATIC_ROOT at {settings.STATIC_ROOT}'))

        # Check STATICFILES_DIRS
        for static_dir in settings.STATICFILES_DIRS:
            if not os.path.exists(static_dir):
                self.stdout.write(
                    self.style.WARNING(f'Static directory not found: {static_dir}')
                )
            else:
                self.stdout.write(
                    self.style.SUCCESS(f'Found static directory: {static_dir}')
                )

        # Verify WhiteNoise configuration
        if 'whitenoise.middleware.WhiteNoiseMiddleware' in settings.MIDDLEWARE:
            self.stdout.write(self.style.SUCCESS('WhiteNoise middleware configured'))
        else:
            self.stdout.write(self.style.ERROR('WhiteNoise middleware not found'))
