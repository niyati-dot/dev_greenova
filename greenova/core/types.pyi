# Stub file for core.types
# This stub file corresponds to the greenova.core.types module
from typing import Generic, TypeVar

from django.db.models import Model
from django.db.models import QuerySet as DjangoQuerySet
from django.http import HttpRequest as HttpRequestBase

T = TypeVar("T", bound=Model)

class HttpRequest(HttpRequestBase): ...
class QuerySet(DjangoQuerySet, Generic[T]): ...
class StatusData(dict[str, int]): ...
class DjangoError: ...
class ModelOperationError(DjangoError, Exception): ...

ChoicesType = list[tuple[str, str]]
