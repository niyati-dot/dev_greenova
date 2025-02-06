from django.contrib import admin
from .models import Service, ServiceLog

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'status', 'last_check')
    list_filter = ('status', 'last_check')
    search_fields = ('name', 'description')

@admin.register(ServiceLog)
class ServiceLogAdmin(admin.ModelAdmin):
    list_display = ['id']  # Add only fields that exist in your model
    list_filter = []  # Add only fields that exist in your model
