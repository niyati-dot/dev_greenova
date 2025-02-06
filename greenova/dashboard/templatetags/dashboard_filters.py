from django import template

register = template.Library()

@register.filter(name='abs')  # Register with explicit name
def abs_value(value):
    """Return absolute value of a number."""
    try:
        return abs(float(value))
    except (TypeError, ValueError):
        return value
