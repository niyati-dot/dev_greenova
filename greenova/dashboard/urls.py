from django.urls import path

from . import views

app_name = "dashboard"

urlpatterns = [
    path("", views.DashboardHomeView.as_view(), name="home"),
    path(
        "upcoming-obligations/",
        views.UpcomingObligationsView.as_view(),
        name="upcoming_obligations",
    ),
    path(
        "projects-at-risk/", views.ProjectsAtRiskView.as_view(), name="projects_at_risk"
    ),
]
