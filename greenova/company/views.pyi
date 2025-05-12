# Stub file for company.views
from typing import Any

from django.http import HttpRequest, HttpResponse
from django.views.generic import CreateView, DeleteView, ListView, UpdateView

from .models import Company

# Class-based views
class CompanyListView(ListView):
    model: type[Company]
    template_name: str
    context_object_name: str

    def get_queryset(self) -> Any: ...
    def get_context_data(self, **kwargs: Any) -> dict[str, Any]: ...

class CompanyCreateView(CreateView):
    model: type[Company]
    form_class: Any
    template_name: str
    success_url: str

    def dispatch(self, request: HttpRequest, *args: Any, **kwargs: Any) -> Any: ...
    def get_context_data(self, **kwargs: Any) -> dict[str, Any]: ...
    def form_valid(self, form: Any) -> HttpResponse: ...

class CompanyUpdateView(UpdateView):
    model: type[Company]
    form_class: Any
    template_name: str
    context_object_name: str
    pk_url_kwarg: str

    def get_success_url(self) -> str: ...
    def get_context_data(self, **kwargs: Any) -> dict[str, Any]: ...
    def form_valid(self, form: Any) -> HttpResponse: ...

class CompanyDeleteView(DeleteView):
    model: type[Company]
    template_name: str
    context_object_name: str
    success_url: str
    pk_url_kwarg: str

    def dispatch(self, request: HttpRequest, *args: Any, **kwargs: Any) -> Any: ...
    def delete(
        self, request: HttpRequest, *args: Any, **kwargs: Any
    ) -> HttpResponse: ...

# Function-based views
def company_detail(request: HttpRequest, company_id: int) -> HttpResponse: ...
def manage_members(request: HttpRequest, company_id: int) -> HttpResponse: ...
def add_member(request: HttpRequest, company_id: int) -> HttpResponse: ...
def remove_member(
    request: HttpRequest, company_id: int, member_id: int
) -> HttpResponse: ...
def update_member_role(
    request: HttpRequest, company_id: int, member_id: int
) -> HttpResponse: ...
def upload_document(request: HttpRequest, company_id: int) -> HttpResponse: ...
def delete_document(
    request: HttpRequest, company_id: int, document_id: int
) -> HttpResponse: ...
