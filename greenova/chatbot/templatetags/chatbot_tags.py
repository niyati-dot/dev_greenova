from typing import Any, Dict

from django import template

register = template.Library()


@register.inclusion_tag('chatbot/chat_widget.html')
def chat_widget() -> Dict[str, Any]:
    """Render the chat widget."""
    return {}
