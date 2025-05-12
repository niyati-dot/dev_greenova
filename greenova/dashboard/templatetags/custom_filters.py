"""Custom template filters for the dashboard app."""

from django import template

register = template.Library()


@register.filter
def abs_value(value):
    """Return the absolute value of the input."""
    try:
        return abs(value)
    except Exception:
        return value
