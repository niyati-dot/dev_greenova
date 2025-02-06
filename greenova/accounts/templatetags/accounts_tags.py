from django import template
from django.templatetags.static import static
from django.utils.html import format_html

register = template.Library()


@register.filter
def field_type(field):
    """Return the name of the field class."""
    return field.field.widget.__class__.__name__


@register.simple_tag
def user_avatar(user, size=40, html_output=True):
    """Generate user avatar HTML or URL with profile picture if available."""
    if hasattr(user, 'profile') and user.profile and user.profile.avatar:
        if html_output:
            return format_html(
                '<img src="{}" class="avatar" width="{}" height="{}" alt="{}\'s avatar">',
                user.profile.avatar.url,
                size,
                size,
                user.username,
            )
        return user.profile.avatar.url

    # Use Django's static() helper
    default_avatar = static('img/avatar.webp')
    if html_output:
        return format_html(
            '<img src="{}" class="avatar" width="{}" height="{}" alt="Default avatar">',
            default_avatar,
            size,
            size,
        )
    return default_avatar


@register.filter
def add_classes(field, classes):
    """Add CSS classes to a form field."""
    return field.as_widget(attrs={"class": classes})
