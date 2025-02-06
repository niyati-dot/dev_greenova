from django import forms
from .models import DashboardPreference

class DashboardPreferenceForm(forms.ModelForm):
    """Form for updating dashboard preferences."""
    class Meta:
        model = DashboardPreference
        fields = ['show_completed', 'chart_type', 'refresh_interval']
        widgets = {
            'refresh_interval': forms.NumberInput(attrs={'min': 15, 'max': 300})
        }

    def clean_refresh_interval(self):
        interval = self.cleaned_data['refresh_interval']
        if interval < 15:
            raise forms.ValidationError("Minimum refresh interval is 15 seconds")
        if interval > 300:
            raise forms.ValidationError("Maximum refresh interval is 300 seconds")
        return interval
