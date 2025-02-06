from typing import Dict, Any, Optional
from dataclasses import dataclass

@dataclass
class SchemaField:
    type: type
    required: bool = True
    default: Any = None
    validators: Optional[list[Any]] = None

class Schema:
    def __init__(self, definition: Dict[str, SchemaField]):
        self.definition = definition

    def validate(self, data: Dict[str, Any]) -> Optional[Dict[str, str]]:
        errors = {}
        for field_name, field_def in self.definition.items():
            if field_name not in data and field_def.required:
                errors[field_name] = "This field is required"
            elif field_name in data:
                value = data[field_name]
                if not isinstance(value, field_def.type):
                    errors[field_name] = f"Expected type {field_def.type.__name__}"
                if field_def.validators:
                    for validator in field_def.validators:
                        try:
                            validator(value)
                        except ValueError as e:
                            errors[field_name] = str(e)
        return errors if errors else None
