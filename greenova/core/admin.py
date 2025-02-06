from django.contrib import admin
from .models import SystemConfig, Audit

@admin.register(SystemConfig)
class SystemConfigAdmin(admin.ModelAdmin):
    list_display = ('key', 'value', 'updated_at')
    search_fields = ('key', 'value')
    readonly_fields = ('created_at', 'updated_at')

@admin.register(Audit)
class AuditAdmin(admin.ModelAdmin):
    list_display = ('action', 'user', 'timestamp', 'ip_address')
    list_filter = ('action', 'timestamp')
    search_fields = ('user__username', 'action', 'details')
    readonly_fields = ('timestamp', 'ip_address')
