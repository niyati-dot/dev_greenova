from django import template
from django.utils.safestring import mark_safe

register = template.Library()

@register.simple_tag(takes_context=True)
def active_url(context, url_name):
    request = context['request']
    if request.resolver_match.url_name == url_name:
        return 'active'
    return ''

@register.filter
def add_error_class(field, css_class='is-invalid'):
    if field.errors:
        return mark_safe(f'{field} <div class="{css_class}-feedback">{field.errors[0]}</div>')
    return field

@register.filter
def service_status_class(status):
    status_classes = {
        'active': 'badge-success',
        'inactive': 'badge-danger',

        'maintenance': 'badge-warning'
    }
    return status_classes.get(status.lower(), 'badge-secondary')
