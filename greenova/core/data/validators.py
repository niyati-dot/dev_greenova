from typing import Any, Dict, Optional
from django.core.exceptions import ValidationError
from .schema import Schema

class DataValidator:
    def __init__(self, schema: Schema):
        self.schema = schema

    def validate(self, data: Dict[str, Any]) -> Optional[Dict[str, str]]:
        return self.schema.validate(data)

    def validate_and_raise(self, data: Dict[str, Any]) -> None:
        errors = self.validate(data)
        if errors:
            error_message = "; ".join([f"{field}: {message}" for field, message in errors.items()])
            raise ValidationError(error_message)
