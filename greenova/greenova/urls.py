import logging

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.http import HttpRequest, HttpResponse
from django.shortcuts import redirect, render
from django.urls import include, path
from django.urls.resolvers import URLPattern, URLResolver

logger = logging.getLogger(__name__)


def home_router(request: HttpRequest) -> HttpResponse:
    """Route to appropriate home page based on auth status."""
    logger.debug("Home router - User authenticated: %s", request.user.is_authenticated)

    # If user is not authenticated, always go to landing page
    if not request.user.is_authenticated:
        logger.info("Unauthenticated user - rendering landing page directly")
        # Add additional context data that may be needed for correct rendering
        context = {
            "show_landing_content": True,
            "user_authenticated": request.user.is_authenticated,
        }
        return render(request, "landing/index.html", context)

    # Only redirect to dashboard if authenticated
    logger.info("Authenticated user - redirecting to dashboard")
    return redirect("dashboard:home")


# This is a view that will trigger an error
def trigger_error(request: HttpRequest) -> None:
    """Trigger an error for Sentry testing."""
    logger.debug("Triggering error for Sentry testing - User: %s", request.user)
    # This will raise a ZeroDivisionError
    # to test Sentry error reporting
    # You can also use this to test Sentry
    _ = 1 / 0  # Using _ to indicate intentional error


urlpatterns: list[URLPattern | URLResolver] = [
    path("__reload__/", include("django_browser_reload.urls")),
    # Landing page should be first to take precedence
    path("", home_router, name="home"),
    path("landing/", include("landing.urls")),
    path("admin/", admin.site.urls),
    # Authentication URLs
    path("accounts/", include("allauth.account.urls")),
    path("dashboard/", include("dashboard.urls", namespace="dashboard")),
    path("chatbot/", include("chatbot.urls", namespace="chatbot")),
    path("users/", include("users.urls", namespace="users")),
    path("projects/", include("projects.urls")),
    path("obligations/", include("obligations.urls")),
    # Use a different namespace for the /chat/ URL pattern
    path("chat/", include("chatbot.urls", namespace="chat")),
    path("mechanisms/", include("mechanisms.urls")),
    path("procedures/", include("procedures.urls")),
    # Add company URLs
    path("company/", include("company.urls", namespace="company")),
    # Add responsibility URLs - create a new file for this
    path("responsibility/", include("responsibility.urls")),
    # Add feedback URLs
    path("feedback/", include("feedback.urls", namespace="feedback")),
    # Include reports URLs
    path("reports/", include("reports.urls", namespace="reports")),
    # Include settings URLs
    path("settings/", include("settings.urls", namespace="settings")),
    # Sentry error page to verify Sentry is working
    path("sentry-debug/", trigger_error),
]
# + debug_toolbar_urls()

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
#    urlpatterns += [path("silk/", include("silk.urls", namespace="silk"))]
