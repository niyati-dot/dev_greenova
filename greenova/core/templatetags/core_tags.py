from django import template
from django.contrib import messages
from django.utils.dateformat import format as date_format
from django.utils.html import format_html
import re

register = template.Library()

@register.filter
def format_date(value, format_string="%d %b %Y"):
    """Format a date according to the given format string."""
    if value:
        try:
            return date_format(value, format_string)
        except (ValueError, TypeError):
            return ""
    return ""

@register.simple_tag
def active_link(request, pattern):
    """Return 'active' if the pattern matches the current path."""
    if re.search(pattern, request.path):
        return "active"
    return ""

@register.filter
def status_badge(value):
    """Format a status value as a badge with appropriate color."""
    status_classes = {
        "pending": "badge-warning",
        "completed": "badge-success",
        "failed": "badge-danger",
        "in_progress": "badge-info",
    }
    css_class = status_classes.get(value.lower(), "badge-secondary")
    return format_html('<span class="badge {}">{}</span>', css_class, value)

@register.filter
def get_message_class(tags):
    """Get the appropriate CSS class for a message based on its tags."""
    classes = {
        messages.DEBUG: "info",
        messages.INFO: "info",
        messages.SUCCESS: "success",
        messages.WARNING: "warning",
        messages.ERROR: "error",
    }

    if isinstance(tags, str):
        tags = tags.split()

    for tag in tags:
        if tag.lower() in classes.values():
            return tag.lower()
        if (
            hasattr(messages, tag.upper())
            and getattr(messages, tag.upper()) in classes
        ):
            return classes[getattr(messages, tag.upper())]

    return "info"

@register.filter
def format_message(message):
    """Format a message with appropriate styling."""
    return str(message)
