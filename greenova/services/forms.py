import json

from django import forms

from .models import Service


class ServiceForm(forms.ModelForm):
    # Define config as a CharField with TextArea widget
    config = forms.CharField(
        widget=forms.Textarea(attrs={'rows': 3}),
        required=False,
        help_text='Enter valid JSON configuration'
    )

    class Meta:
        model = Service
        fields = ['name', 'description', 'config']
        widgets = {'description': forms.Textarea(attrs={'rows': 3})}

    def clean_config(self):
        """Convert the config string to JSON"""
        config_str = self.cleaned_data.get('config', '')
        if not config_str:
            return {}
        try:
            return json.loads(config_str)
        except json.JSONDecodeError:
            raise forms.ValidationError("Invalid JSON format")
