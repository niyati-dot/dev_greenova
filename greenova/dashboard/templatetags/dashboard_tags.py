from django import template
from django.utils.html import format_html
import json
from django.utils.safestring import mark_safe

register = template.Library()

@register.simple_tag
def chart_data(data_dict):
    """Convert Python dictionary to JSON for Chart.js."""
    return mark_safe(json.dumps(data_dict))

@register.simple_tag
def stat_card(title, value, change=None, icon=None):
    """Generate a statistics card with optional trend indicator."""
    trend_class = ''
    if change:
        trend_class = 'trend-up' if float(change) > 0 else 'trend-down'

    return format_html(
        '<div class="stat-card">'
        '<div class="stat-header">{}{}</div>'
        '<div class="stat-value">{}</div>'
        '{}'
        '</div>',
        icon or '', title,
        value,
        format_html('<div class="stat-trend {}">{}%</div>', trend_class, change) if change else ''
    )

@register.filter
def format_metric(value, metric_type):
    """Format dashboard metrics based on type."""
    formats = {
        'percentage': lambda x: f"{x}%",
        'currency': lambda x: f"${x:,.2f}",
        'number': lambda x: f"{x:,}",
        'duration': lambda x: f"{x} days"
    }
    return formats.get(metric_type, lambda x: x)(value)
