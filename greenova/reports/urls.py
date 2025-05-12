"""urls.py for the reports app in Greenova."""

from django.urls import path

from .views import ReportListView

app_name = "reports"

urlpatterns = [
    path("", ReportListView.as_view(), name="report_list"),
]
