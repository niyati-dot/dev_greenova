from django.conf import settings
from django.utils import timezone

def global_settings(request):
    """Add global template variables."""
    return {
        'ENVIRONMENT': settings.ENVIRONMENT,
        'VERSION': settings.VERSION,
        'SITE_TITLE': 'Greenova EMS',
        'DEBUG': settings.DEBUG,
        'CURRENT_YEAR': timezone.now().year,  # Fix year calculation
        'IS_PRODUCTION': settings.ENVIRONMENT == 'production',
        'USER_IS_AUTHENTICATED': request.user.is_authenticated,
        'USER_IS_STAFF': request.user.is_authenticated and request.user.is_staff,
        'HAS_DASHBOARD_ACCESS': request.user.is_authenticated  # Add dashboard access check
    }
