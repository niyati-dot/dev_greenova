from django import template

register = template.Library()

@register.filter(name='add_error_class')
def add_error_class(field, css_class='error'):
    return field.as_widget(attrs={'class': css_class})
