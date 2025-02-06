from django import forms
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

class BaseForm(forms.Form):
    """Base form with common validation and clean methods."""

    def clean(self):
        cleaned_data = super().clean()
        self.validate_xss(cleaned_data)
        return cleaned_data

    def validate_xss(self, cleaned_data):
        """Basic XSS validation for text fields."""
        for field_name, value in cleaned_data.items():
            if isinstance(value, str):
                if '<script' in value.lower():
                    raise ValidationError(_('Invalid characters detected'))

class SecureForm(BaseForm):
    """Form with additional security features."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.enable_csrf = True
        self.enable_rate_limit = True
