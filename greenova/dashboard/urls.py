from django.urls import path

from . import views

app_name = 'dashboard'

urlpatterns = [
    path('', views.DashboardView.as_view(), name='index'),
    path(
        'refresh/stats/',
        views.DashboardStatsView.as_view(),
        name='refresh_stats',
    ),
    path('pcemp/', views.PCEMPView.as_view(), name='pcemp'),
    path('ms1180/', views.MS1180View.as_view(), name='ms1180'),
    path('wa6946/', views.WA6946View.as_view(), name='wa6946'),
]
