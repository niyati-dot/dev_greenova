from django import template
from django.utils.html import format_html
from django.utils.safestring import mark_safe

register = template.Library()

@register.filter
def format_price(value):
    """Format a price value with currency symbol."""
    try:
        return f"${value:,.2f}"
    except (TypeError, ValueError):
        return "N/A"

@register.simple_tag
def service_status_icon(status):
    """Return an appropriate icon for the service status."""
    icons = {
        'active': '✅',
        'inactive': '❌',
        'pending': '⏳',
        'suspended': '⚠️'
    }
    return icons.get(status.lower(), '❔')

@register.filter
def progress_bar(value, max_value=100):
    """Generate a progress bar with the given value."""
    percentage = min(int((value / max_value) * 100), 100)
    return format_html(
        '<div class="progress"><div class="progress-bar" role="progressbar" '
        'style="width: {}%;" aria-valuenow="{}" aria-valuemin="0" '
        'aria-valuemax="{}">{}</div></div>',
        percentage, value, max_value, f"{percentage}%"
    )

@register.filter(name='service_status_class')
def service_status_class(status):
    status_classes = {
        'active': 'badge-success',
        'inactive': 'badge-danger',
        'pending': 'badge-warning'
    }
    return status_classes.get(status.lower(), 'badge-secondary')
