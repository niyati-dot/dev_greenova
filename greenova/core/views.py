from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.views.decorators.http import require_http_methods

from .models import Audit, SystemConfig


@login_required
@require_http_methods(["GET"])
def system_status(request):
    configs = SystemConfig.objects.all()
    recent_audits = Audit.objects.select_related("user")[:10]
    return render(
        request,
        "core/system_status.html",
        {"configs": configs, "recent_audits": recent_audits},
    )


@login_required
@require_http_methods(["GET"])
def system_health(request):
    # Implement system health check logic
    return render(request, "core/system_health.html")
