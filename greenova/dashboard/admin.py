from django.contrib import admin

from .models import DashboardPreference


@admin.register(DashboardPreference)
class DashboardPreferenceAdmin(admin.ModelAdmin):
    list_display = ("user", "chart_type", "refresh_interval", "show_completed")
    list_filter = ("chart_type", "show_completed")
    search_fields = ("user__username", "user__email")
