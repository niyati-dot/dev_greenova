---
description:
  Code style and formatting standards for Python, Django, HTML, CSS, and
  JavaScript in the Greenova project.
mode: general

tools:
  - file_search
  - read_file
  - insert_edit_into_file
  - semantic_search
  - get_errors
---

<!-- filepath: /workspaces/greenova/.github/prompts/code-style.prompt.md -->

# Code Style and Formatting Standards

## Python Code Style

### Import Organization

```python
# Standard library imports (alphabetical)
import os
import sys
from datetime import datetime
from typing import Dict, List, Optional, Union

# Third-party imports (alphabetical)
import django
from django.db import models
from django.http import HttpRequest, HttpResponse

# Local imports (alphabetical)
from .models import MyModel
from .utils import format_date
```

### Type Annotations

```python
from typing import Optional, TypeVar, Generic

T = TypeVar('T')

class Repository(Generic[T]):
    """Generic repository pattern implementation."""

    def get_by_id(self, item_id: int) -> Optional[T]:
        """Get item by ID."""
        ...

    def save(self, item: T) -> T:
        """Save item."""
        ...
```

### Line Breaking

```python
# Function arguments
def process_data(
    first_argument: str,
    second_argument: int,
    *args: tuple[str, ...],
    **kwargs: dict[str, any],
) -> None:
    """Process data with multiple arguments."""
    pass

# List/dict comprehensions
items = [
    item
    for item in long_iterator
    if item.is_valid()
]

# Long strings
message = (
    "This is a very long message that "
    "needs to be split across multiple "
    "lines for better readability"
)
```

### Class Definitions

```python
class MyClass:
    """Class docstring following Google style."""

    def __init__(self, name: str) -> None:
        """Initialize MyClass.

        Args:
            name: The name of the instance.
        """
        self.name = name

    def my_method(self) -> str:
        """Return formatted name."""
        return f"Name: {self.name}"
```

## Django Code Style

### Models

```python
from django.db import models
from django.utils.translation import gettext_lazy as _

class MyModel(models.Model):
    """Model docstring with clear purpose."""

    name = models.CharField(
        _("Name"),
        max_length=100,
        help_text=_("Enter a unique name"),
    )
    description = models.TextField(
        _("Description"),
        blank=True,
    )
    created_at = models.DateTimeField(
        _("Created At"),
        auto_now_add=True,
    )

    class Meta:
        """Model metadata."""
        verbose_name = _("My Model")
        verbose_name_plural = _("My Models")
        ordering = ["-created_at"]

    def __str__(self) -> str:
        """Return string representation."""
        return self.name
```

### Views

```python
from django.views.generic import ListView
from django.contrib.auth.mixins import LoginRequiredMixin

class MyListView(LoginRequiredMixin, ListView):
    """List view docstring."""

    model = MyModel
    template_name = "myapp/list.html"
    context_object_name = "items"
    paginate_by = 20

    def get_queryset(self):
        """Return filtered queryset."""
        return super().get_queryset().filter(
            user=self.request.user,
        )
```

## HTML/Template Style

### Django Templates

```html
{% extends "base.html" %} {% load i18n %} {% block content %}
<main class="container">
  <h1>{{ page_title }}</h1>

  {% if items %}
  <div class="items-list">
    {% for item in items %} {% include "components/item_card.html" with
    item=item %} {% endfor %}
  </div>
  {% include "components/pagination.html" %} {% else %}
  <p>{% trans "No items found." %}</p>
  {% endif %}
</main>
{% endblock %}
```

### HTMX Integration

```html
<div id="item-list">
  {% for item in items %}
  <div
    class="item"
    hx-get="{% url 'item_detail' item.id %}"
    hx-target="#detail-panel"
    hx-swap="innerHTML"
  >
    {{ item.name }}
  </div>
  {% endfor %}
</div>

<div
  id="detail-panel"
  hx-trigger="load"
  hx-get="{% url 'item_empty' %}"
  hx-swap="innerHTML"
></div>
```

## CSS Style

### Class Naming

```css
/* Component-specific styles */
.item-card {
  /* Component styles */
}

.item-card__title {
  /* Element styles */
}

.item-card--featured {
  /* Modifier styles */
}
```

### Property Ordering

```css
.element {
  /* Positioning */
  position: relative;
  top: 0;
  left: 0;
  z-index: 1;

  /* Display & Box Model */
  display: flex;
  width: 100%;
  padding: 1rem;
  margin: 0;

  /* Typography */
  font-size: 1rem;
  line-height: 1.5;
  color: #333;

  /* Visual */
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;

  /* Animation */
  transition: all 0.3s ease;
}
```

## JavaScript Style

### Module Organization

```javascript
// Imports
import { useState, useEffect } from 'react';

// Constants
const MAX_ITEMS = 10;
const DEFAULT_DELAY = 300;

// Helper Functions
const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

// Main Component/Function
export const MyComponent = () => {
  // Implementation
};
```

### Error Handling

```javascript
try {
  const result = await fetchData();
  return processResult(result);
} catch (error) {
  console.error('Failed to fetch data:', error);
  throw new Error(`Data fetch failed: ${error.message}`);
} finally {
  cleanup();
}
```

## Documentation Style

### Function Docstrings

```python
def calculate_total(
    items: list[dict[str, any]],
    tax_rate: float = 0.1,
) -> float:
    """Calculate total price including tax.

    Args:
        items: List of items with 'price' key.
        tax_rate: Tax rate as decimal (default: 0.1).

    Returns:
        Total price including tax.

    Raises:
        ValueError: If tax_rate is negative.
        KeyError: If any item is missing 'price' key.
    """
    if tax_rate < 0:
        raise ValueError("Tax rate cannot be negative")

    subtotal = sum(item["price"] for item in items)
    return subtotal * (1 + tax_rate)
```

### Class Docstrings

```python
class DataProcessor:
    """Process and transform data using various algorithms.

    This class provides methods for data processing, including
    filtering, transformation, and validation.

    Attributes:
        name: Name of the processor instance.
        config: Configuration dictionary for processing options.

    Example:
        >>> processor = DataProcessor("my_processor")
        >>> result = processor.process_data(data)
    """

    def __init__(self, name: str) -> None:
        """Initialize DataProcessor.

        Args:
            name: Name of the processor instance.
        """
        self.name = name
```
