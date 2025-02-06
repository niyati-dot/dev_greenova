from django.urls import path

from . import views

app_name = 'services'

urlpatterns = [
    path('', views.service_list, name='list'),
    path('<int:pk>/', views.ServiceDetailView.as_view(), name='detail'),
]
