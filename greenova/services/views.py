from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404, render
from django.views.decorators.http import require_http_methods
from django.views.generic import DetailView

from .models import Service, ServiceLog


@login_required
@require_http_methods(["GET"])
def service_list(request):
    services = Service.objects.all()
    return render(
        request, 'services/service_list.html', {'services': services}
    )


@login_required
@require_http_methods(["GET"])
def service_detail(request, service_id):
    service = get_object_or_404(Service, pk=service_id)
    logs = service.service_logs.all()[:50]  # type: ignore
    return render(
        request,
        'services/service_detail.html',
        {'service': service, 'logs': logs},
    )


class ServiceDetailView(DetailView):
    model = Service
    template_name = 'services/service_detail.html'
    context_object_name = 'service'
