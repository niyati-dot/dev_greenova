"""Middleware for handling authentication-related functionality."""

import logging
from collections.abc import Callable

from django.http import HttpRequest, HttpResponse
from django_htmx.middleware import HtmxDetails

logger = logging.getLogger(__name__)


class CustomHttpRequest(HttpRequest):
    """Custom HttpRequest class with additional attributes."""

    is_post_logout: bool = False


class LogoutStateMiddleware:
    """Middleware to handle post-logout state and ensure proper page rendering."""

    def __init__(self, get_response: Callable[[HttpRequest], HttpResponse]) -> None:
        """Initialize the middleware.

        Args:
            get_response: The next middleware/view in the chain
        """
        self.get_response = get_response

    def __call__(self, request: CustomHttpRequest) -> HttpResponse:
        """Process the request through the middleware.

        Args:
            request: The incoming HTTP request

        Returns:
            HttpResponse: The response from the next middleware/view
        """
        htmx = getattr(request, "htmx", None)
        was_authenticated = request.session.get("_was_authenticated", False)
        is_landing = request.path == "/landing/"

        # Mark if user just logged out
        if was_authenticated and not request.user.is_authenticated:
            request.session["_post_logout"] = True
            logger.debug("Post-logout state set for user")

        # Check if this is a post-logout request
        request.is_post_logout = (
            request.session.pop("_post_logout", False) and is_landing
        )

        if request.is_post_logout:
            logger.debug("Processing post-logout request to landing page")
            if isinstance(htmx, HtmxDetails) and htmx.is_htmx:
                # For HTMX requests, ensure smooth transition
                request.session["_htmx_redirect"] = True
            else:
                # For regular requests, ensure full page load
                request.session["_force_refresh"] = True

        # Update authentication state for next request
        request.session["_was_authenticated"] = request.user.is_authenticated

        response = self.get_response(request)

        # Clean up session flags
        request.session.pop("_htmx_redirect", None)
        request.session.pop("_force_refresh", None)

        return response
