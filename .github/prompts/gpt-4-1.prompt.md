---
description: |
  Resolve failure of test_htmx_and_hyperscript_integration in Greenova's template tests by ensuring the landing page includes required HTMX and Hyperscript scripts, following project standards and using all available documentation resources.
mode: agent
tools:
  - filesystem
  - semantic_search
  - get_errors
  - run_tests
  - file_search
  - read_file
  - insert_edit_into_file
  - context7
  - json
  - git
  - sequential-thinking
---

# Goal

Resolve the failure of
`TestBaseTemplates.test_htmx_and_hyperscript_integration` in
`tests/test_templates.py` by ensuring the landing page template includes the
required `htmx.min.js` and `_hyperscript.min.js` scripts, so the test passes
and the integration is correct.

# Context

- The test `test_htmx_and_hyperscript_integration` fails because the rendered
  landing page does not include the `htmx.min.js` script (and likely
  `_hyperscript.min.js`).
- The project uses Django 5.2, pytest-django, and follows strict HTML-first,
  progressive enhancement, and accessibility standards.
- The scripts are expected to be present in the HTML output for the landing
  page at `landing:index`.
- The test is located in `greenova/tests/test_templates.py` and the template in
  `greenova/landing/templates/landing/index.html`.
- The project uses the following relevant technologies and standards:
  - [django-hyperscript](https://github.com/LucLor06/django-hyperscript#readme)
  - [django-htmx](https://django-htmx.readthedocs.io/en/latest/)
  - [HTMX](https://htmx.org/docs/)
  - [Hyperscript](https://hyperscript.org/docs/)
  - [Django](https://docs.djangoproject.com/en/5.2/)
  - [django-template-partials](https://github.com/carltongibson/django-template-partials?tab=readme-ov-file#basic-usage)
  - [TypeScript](https://www.typescriptlang.org/docs/)
  - [Protobuf3](https://protobuf.dev/)
  - [django-pb-model](https://pypi.org/project/django-pb-model/)
- See attached prompt-generation.prompt.md for formatting and additional
  requirements.

# Objectives

- Update the landing page template to include the `htmx.min.js` and
  `_hyperscript.min.js` scripts in the correct block (e.g., `extra_head` or as
  required by the base template).
- Ensure the scripts are loaded using Django's `{% static %}` tag and follow
  semantic, accessible HTML structure.
- Use all available documentation and context (fetch/context7) to ensure best
  practices for HTMX/Hyperscript integration.
- Do not modify the test itself unless strictly necessary.
- Run the test suite to confirm the test passes after the fix.
- Document the solution in code/comments as appropriate.

# Sources

- greenova/landing/templates/landing/index.html (landing page template)
- greenova/tests/test_templates.py (template integration tests)
- https://htmx.org/docs/
- https://django-htmx.readthedocs.io/en/latest/
- https://hyperscript.org/docs/
- https://github.com/LucLor06/django-hyperscript#readme
- https://docs.djangoproject.com/en/5.2/
- .github/prompts/prompt-generation.prompt.md (for formatting)

# Expectations

- The landing page template renders with both `htmx.min.js` and
  `_hyperscript.min.js` scripts present in the HTML output.
- The test `test_htmx_and_hyperscript_integration` passes.
- The solution follows Greenova's coding, accessibility, and progressive
  enhancement standards.
- The solution is documented in code/comments as appropriate.

# Acceptance Criteria

- The landing page includes the `htmx.min.js` and `_hyperscript.min.js` scripts
  in the rendered HTML.
- The test `test_htmx_and_hyperscript_integration` passes.
- No regression or accessibility issues are introduced.
- Code and template changes are documented and follow project standards.

# Instructions

- Update `greenova/landing/templates/landing/index.html` to include the
  required scripts in the appropriate block.
- Use `{% static %}` for script paths and ensure scripts are loaded with
  `defer` for performance.
- Reference all relevant documentation and standards using fetch/context7 as
  needed.
- Run the test suite (or the specific test) to confirm the issue is resolved.
- Document your solution in code/comments as appropriate.

# Additional Guidelines

- Use Restructured Text (RST) for body/content/messages for HTML.
- Use semantic HTML structure, no inline styles/scripts.
- Use django-hyperscript as primary for client-side interactions, django-htmx
  as secondary.
- Follow all project code style, configuration, and test standards.
