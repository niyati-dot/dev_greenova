from django.shortcuts import render
from django.views.decorators.cache import cache_control
from django.views.decorators.http import require_http_methods


@require_http_methods(["GET"])
@cache_control(no_cache=True, no_store=True)
def bad_request(request, exception=None):
    return render(request, "errors/400.html", status=400)


@require_http_methods(["GET"])
@cache_control(no_cache=True, no_store=True)
def permission_denied(request, exception=None):
    return render(request, "errors/403.html", status=403)


@require_http_methods(["GET"])
@cache_control(no_cache=True, no_store=True)
def not_found(request, exception=None):
    return render(request, "errors/404.html", status=404)


@require_http_methods(["GET"])
@cache_control(no_cache=True, no_store=True)
def server_error(request):
    return render(request, "errors/500.html", status=500)


@require_http_methods(["GET"])
@cache_control(no_cache=True, no_store=True)
def service_unavailable(request, exception=None):
    return render(request, "errors/503.html", status=503)
