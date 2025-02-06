from django.urls import path
from . import views

app_name = 'core'

urlpatterns = [
    path('system/status/', views.system_status, name='system_status'),
    path('system/health/', views.system_health, name='system_health'),
]
