---
description:
  Guide for configuring and using development tools, linters, and formatters in
  the Greenova project.
mode: configuration

tools:
  - file_search
  - read_file
  - insert_edit_into_file
  - semantic_search
  - get_errors
---

<!-- filepath: /workspaces/greenova/.github/prompts/tool-configuration.prompt.md -->

# Development Tools Configuration Guide

## Code Quality Tools

### Ruff

Primary tool for Python linting and formatting:

- Replaces multiple tools (pylint, isort)
- Faster execution
- More comprehensive rule set

#### Usage

```bash
# Format and fix code
ruff check --fix .
ruff format .
```

### Black

Secondary formatter for Python:

- Use when Ruff formatting is insufficient
- Integration with pre-commit hooks

#### Usage

```bash
black --line-length 88 .
```

### MyPy

Type checking for Python code:

- Strict mode enabled
- Django plugin configured
- Custom type stubs supported

#### Usage

```bash
mypy .
```

## Frontend Tools

### ESLint

JavaScript/TypeScript linting:

- Prettier integration
- Custom rule configuration
- Auto-fix capability

#### Usage

```bash
eslint --fix .
```

### Stylelint

CSS/SCSS linting:

- PicoCSS compatibility
- Tailwind CSS support
- Property ordering rules

#### Usage

```bash
stylelint "**/*.css" --fix
```

## Database Tools

### Django Migrations

- Run makemigrations before migrate
- Use --dry-run to preview changes
- Name migrations descriptively

#### Usage

```bash
python manage.py makemigrations --name descriptive_name
python manage.py migrate
```

## Testing Tools

### Pytest

Primary testing framework:

- Django test integration
- Coverage reporting
- Parallel execution

#### Usage

```bash
pytest
pytest --cov
```

## Documentation Tools

### MkDocs

Project documentation:

- Markdown support
- Auto-generated API docs
- Search functionality

#### Usage

```bash
mkdocs serve
mkdocs build
```

## Version Control

### Pre-commit

Automated checks before commits:

- Multiple tool integration
- Custom hook support
- Parallel execution

#### Usage

```bash
pre-commit run --all-files
```

## Continuous Integration

### GitHub Actions

Automated workflows:

- Test execution
- Code quality checks
- Documentation builds

#### Usage

- Automatically triggered on push/PR
- Manual dispatch available

## Error Checking

### Common Issues and Solutions

1. Import sorting:

```python
# Correct
import os
from datetime import datetime

import django
from django.db import models

from .models import MyModel
```

1. Line length:

```python
# Correct
long_string = (
    "This is a very long string that needs "
    "to be split across multiple lines"
)
```

1. Type hints:

```python
# Correct
def get_item(item_id: int) -> Optional[Item]:
    """Get an item by ID."""
    return Item.objects.filter(id=item_id).first()
```

## Automated Tools Usage

1. Code formatting:

```bash
# Format Python code
ruff format .

# Format frontend code
prettier --write .
```

1. Type checking:

```bash
# Check types
mypy .

# Generate stubs
stubgen -p your_package
```

1. Security checks:

```bash
# Run security audit
bandit -r .

# Check dependencies
safety check
```
