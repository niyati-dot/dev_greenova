from django import forms
from django.contrib.auth import get_user_model
from .models import SystemConfig, Audit

User = get_user_model()

class SystemConfigForm(forms.ModelForm):
    class Meta:
        model = SystemConfig
        fields = ['key', 'value', 'description']
        widgets = {
            'description': forms.Textarea(attrs={'rows': 3}),
        }

class AuditFilterForm(forms.Form):
    start_date = forms.DateField(required=False)
    end_date = forms.DateField(required=False)
    action = forms.ChoiceField(choices=[('', 'All')] + Audit.ACTION_CHOICES, required=False)
    user = forms.ModelChoiceField(queryset=User.objects.all(), required=False)
