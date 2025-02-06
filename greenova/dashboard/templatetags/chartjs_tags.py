from django import template

register = template.Library()

@register.filter
def safe_json(value):
    """Convert data to JSON safe format for Chart.js"""
    import json
    return json.dumps(value)

@register.filter
def zip_lists(a, b):
    """Zip two lists together"""
    return zip(a, b)
