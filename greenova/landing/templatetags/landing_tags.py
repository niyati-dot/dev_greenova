from django import template
from django.utils.html import format_html

register = template.Library()

@register.simple_tag
def feature_card(title, description, icon):
    """Generate a feature card with icon and description."""
    return format_html(
        '<div class="feature-card">'
        '<div class="feature-icon">{}</div>'
        '<h3>{}</h3>'
        '<p>{}</p>'
        '</div>',
        icon, title, description
    )

@register.filter
def truncate_chars(value, max_length=50):
    """Truncate text to specified length and add ellipsis."""
    if len(value) > max_length:
        return value[:max_length-3] + '...'
    return value

@register.inclusion_tag('landing/components/social_links.html')
def social_links():
    """Render social media links."""
    return {
        'social_links': [
            {'name': 'LinkedIn', 'url': '#', 'icon': 'linkedin'},
            {'name': 'Twitter', 'url': '#', 'icon': 'twitter'},
            {'name': 'Facebook', 'url': '#', 'icon': 'facebook'}
        ]
    }
