# GitHub Copilot Instructions for Django Development with Python

## Project Domain and Context

Greenova is a Django web application for environmental management, focusing on
tracking environmental obligations and compliance requirements. This
application is used by environmental professionals to monitor compliance status
and manage obligations related to environmental regulations.

## Technical Stack and Version Requirements

- **Python**: 3.12.9 (exact version required)
- **Django**: 5.2 (exact version required)
- **Node.js**: 20.19.1 (exact version required)
- **npm**: 11.3.0 (exact version required)
- **Database**: SQLite3 for development and production

## Frontend Technologies

- **Simplicity First**: Always choose the simplest effective solution
- **Plain Text / HTML First**: Start with semantic HTML before adding
  complexity
- **Technology Priority Order**:

1. **Restructured Text (RST)**: Use as the foundational layer for body, content
   and messages for HTML.

1. **HTML**: Utilize for semantic structure and markup. Do not apply inline
   styles and scripts.

1. **Protobuf3**: Primary implementation for data serialization.

1. **Classless-CSS**: Apply minimal styling using Classless-PicoCSS as HTML.

1. **django-hyperscript**: Primary implementation for client-side interactions.

1. **django-htmx**: Secondary implementation for client-side interactions only
   to compliment django-hyperscript.

1. **SASS/PostCSS**: Use for advanced styling needs when required.

1. **TypeScript**: Introduce only when django-hyperscript and django-htmx
   cannot meet the requirements. Use TypeScript for complex logic. Avoid using
   TypeScript for simple interactions that can be handled by django-hyperscript
   or django-htmx.

1. **AssemblyScript**: Primary implementation for critical client-side
   interactions and web assembly (WASM) implementations.

## Code Style and Organization

### Python Code Style

- Follow PEP 8 with strict maximum line length of 88 characters
- Use 4 spaces per indentation level (no tabs)
- Use `snake_case` for function and variable names
- Use `CamelCase` for class names
- Use `UPPER_CASE` for constants
- Separate top-level function and class definitions with two blank lines
- Use Google style docstrings for all public modules, functions, classes, and
  methods

### Import Structure

```python
# Standard library imports
import os
import logging
from datetime import datetime
from typing import Dict, List, Optional, Union

# Third-party library imports
import django
from django.db import models
from django.http import HttpRequest, HttpResponse

# Local application imports
from core.utils import format_date
from obligations.models import Obligation
```

### Logging Practices

- Use the `logging` module instead of print statements
- Configure appropriate logging levels (DEBUG, INFO, WARNING, ERROR, CRITICAL)
- Use lazy formatting to avoid performance issues:

  ```python
  # CORRECT - Use this format
  logger.info("Processing obligation %s", obligation_id)

  # INCORRECT - Do not use f-strings in log statements
  logger.info(f"Processing obligation {obligation_id}")  # pylint: W1203
  ```

## Architecture and Design Patterns

### Django Project Structure

- Modular Django architecture with specialized apps for functional areas
- Class-based views with mixins for code reuse
- Form classes for all data input validation
- Proper model relationships with constraints in database design

### Authentication

- Django-allauth with multi-factor authentication support
- Custom user model extending AbstractUser
- Permission-based access control

**Expectations**: GitHub Copilot can delete and consolidate files where
multiple implementations are found and can be merged into a single file
globally. Always use `use context7` to lookup documentation from the context7
MCP server, which provides access to all project-specific configuration files
and standards. Additional resources such as the github, filesystem, JSON,
context7, sqlite, git, fetch, sequential-thinking, and docker MCP servers have
been activated and are available for use by GitHub Copilot.

**Documentation Lookup Instructions**:

- When you need more context or details about any of the following external
  libraries, frameworks, or tools, use the `fetch` MCP server or `context7` MCP
  server to look up their official documentation:

  - [GSAP Animation](https://gsap.com/docs/v3/)
  - [PicoCSS Classless](https://picocss.com/docs/classless)
  - [Hyperscript](https://hyperscript.org/docs/)
  - [TypeScript](https://www.typescriptlang.org/docs/)
  - [HTMX](https://htmx.org/docs/)
  - [django-hyperscript](https://github.com/LucLor06/django-hyperscript#readme)
  - [django-htmx](https://django-htmx.readthedocs.io/en/latest/)
  - [AssemblyScript](https://www.assemblyscript.org/introduction.html)
  - [Django](https://docs.djangoproject.com/en/5.2/)
  - [Protobuf3](https://protobuf.dev/)
  - [SQLite](https://www.sqlite.org/docs.html)
  - [django-pb-model](https://pypi.org/project/django-pb-model/)
  - [Matplotlib](https://matplotlib.org/stable/users/index)
  - [django_matplotlib](https://github.com/scidam/django_matplotlib)
  - [Plotly](https://plotly.com/python/)
  - [Pandas](https://pandas.pydata.org/docs/)
  - [NumPy](https://numpy.org/doc/stable/user/index.html#user)
  - [django-csp](https://django-csp.readthedocs.io/en/latest/)
  - [django-template-partials](https://github.com/carltongibson/django-template-partials?tab=readme-ov-file#basic-usage)
  - [dj-all-auth](https://github.com/deviserops/dj-all-auth)
  - [python-dotenv-vault](https://github.com/dotenv-org/python-dotenv-vault)

- For project-specific configuration files and standards, always use
  `use context7` to lookup documentation from the context7 MCP server.

## File Operations and Encoding

- Use UTF-8 encoding for all text files
- Always specify `encoding="utf-8"` when using `open()`:

  ```python
  with open("file.txt", "r", encoding="utf-8") as f:
      content = f.read()
  ```

## Testing Requirements

- Write unit tests for all views, models, and forms
- Use Django's TestCase for database-related tests
- Use pytest fixtures for test setup
- Mock external dependencies for isolated tests
- Test on multiple POSIX systems (Linux, macOS)

## HTML and Template Guidelines

### Template Structure

- Use Django's template inheritance with `{% extends %}` and `{% include %}`
- Separate templates into layouts, components, and partials
- Create reusable blocks for common elements

### HTML Structure

- Use semantic HTML5 elements (header, main, section, article, etc.)
- Proper hierarchy of headings (h1-h6)
- Descriptive ARIA attributes for accessibility
- Well-structured forms with proper labels and help text

### HTMX Integration

- Use `hx-get`, `hx-post`, etc. for AJAX requests
- Define clear swap targets with `hx-target` and `hx-swap`
- Set proper event handlers with `hx-trigger`
- Enable URL history management with `hx-push-url`

### Example Template Structure

```html
{% extends "base.html" %} {% block title %}Page Title{% endblock %} {% block
content %}
<main>
  <h1>Primary Heading</h1>

  <section aria-labelledby="section-id">
    <h2 id="section-id">Section Heading</h2>

    <!-- HTMX-enhanced form -->
    <form
      hx-post="{% url 'submit_form' %}"
      hx-target="#results"
      hx-swap="outerHTML"
    >
      {% csrf_token %}
      <label for="input-field">Field Label:</label>
      <input id="input-field" name="field_name" type="text" required />
      <button type="submit">Submit</button>
    </form>

    <div id="results" role="region" aria-live="polite"></div>
  </section>
</main>
{% endblock %}
```

## Environment Variable Management

- Store environment variables in `.env` files
- Use `os.environ.get()` with default values for non-critical variables:

  ```python
  DEBUG = os.environ.get('DJANGO_DEBUG', 'False') == 'True'
  ```

- Use `os.environ[]` for required variables:

  ```python
  SECRET_KEY = os.environ['DJANGO_SECRET_KEY']
  ```

- Validate all environment variables during application startup

## Development Toolchain

### Quality Assurance Tools

1. **Code Linters**:

   - Python: pylint, pylint-django
   - JavaScript: eslint
   - HTML/Templates: djlint
   - Markdown: markdownlint

2. **Type Checking**:

   - mypy with django-stubs

3. **Code Formatters**:

   - Python: autopep8, isort
   - JavaScript/CSS/JSON: prettier

4. **Security Scanning**:
   - bandit for Python security issues

### Running Development Tools

- Use VS Code tasks for linting and formatting
- Run tests with pytest
- Use pre-commit hooks for automatic quality checks

## Common Issues to Avoid

### Python

- Import outside toplevel (`import-outside-toplevel`)
- F-string in logging (`logging-fstring-interpolation`)
- Line too long (`line-too-long`)
- Missing type annotations (`no-untyped-def`)
- Unspecified file encoding (`unspecified-encoding`)
- Too many ancestors in class inheritance (`too-many-ancestors`)
- Unused variables (`unused-variable`)

### Django/HTML

- Missing CSRF tokens in forms
- Hardcoded URLs instead of `{% url %}` tags
- Logic in templates instead of views
- Unescaped user input
- Missing form validation

## Handling Long Lines in Code

### Guidelines for Long Lines

1. **Maximum Line Length**:

   - Adhere to a strict maximum line length of 88 characters as per PEP 8.

2. **Breaking Long Lines**:

   - Use implicit line continuation within parentheses, brackets, or braces.
   - Example:

     ```python
     # Correct
     result = some_function(
         arg1, arg2, arg3
     )

     # Incorrect
     result = some_function(arg1, arg2, arg3)
     ```

3. **String Concatenation**:

   - Use implicit concatenation for long strings.
   - Example:

     ```python
     # Correct
     message = (
         "This is a long message that "
         "spans multiple lines."
     )

     # Incorrect
     message = "This is a long message that spans multiple lines."
     ```

4. **Comments and Docstrings**:

   - Break long comments and docstrings into multiple lines.
   - Example:

     ```python
     # Correct
     """
     This is a long docstring that
     spans multiple lines.
     """

     # Incorrect
     """This is a long docstring that spans multiple lines."""
     ```

5. **Tools for Automation**:

   - Use `black` to automatically format code to comply with line length
     limits.
   - Example command:

     ```bash
     black --line-length 88 <file>
     ```

## Author Information

- Author: Adrian Gallo
- Email: <agallo@enveng-group.com.au>
- License: AGPL-3.0

## Context7 Documentation Lookup

Always use `use context7` to lookup documentation from the context7 MCP server.
This provides access to all project-specific configuration files and standards.

**External Documentation Lookup**: For any of the following external libraries
or frameworks, use the `fetch` or `context7` MCP server to retrieve and
reference their official documentation as needed:

- GSAP Animation, PicoCSS Classless, Hyperscript, HTMX, django-hyperscript,
  django-htmx, AssemblyScript, Django, Protobuf3, SQLite, django-pb-model,
  Matplotlib, django_matplotlib, Plotly, Pandas, NumPy, django-csp,
  django-template-partials, dj-all-auth, python-dotenv-vault.

**Additional Resources**: The github, filesystem, JSON, context7, sqlite, git,
fetch, sequential-thinking and docker MCP servers have been switched on and
started for agents, including GitHub Copilot.
