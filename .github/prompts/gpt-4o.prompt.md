---
description: Standardize and automate Python environment setup for Greenova
using pip-tools, constraints files, and best practices, updating all relevant
scripts and configuration files. mode: agent

tools:

- github
- file_search
- read_file
- insert_edit_into_file
- semantic_search
- get_errors
- sequential-thinking
- Context7
- fetch
- filesystem

---

# GitHub Copilot Prompt Template for Python Environment Standardization with pip-tools and Constraints

## Goal

Standardize and automate the setup of the Python development and production
environments for the Greenova Django project using pip-tools and constraints
files, following best practices from official documentation and the wider
Python community.

## Context

- The Greenova project uses Django 5.2, Python 3.12.9, Node.js 20.19.1, and npm
  11.3.0.
- The project currently has multiple requirements files (base.in, base.txt,
  dev.in, dev.txt, prod.in, prod.txt, requirements.txt, constraints.txt) and
  related scripts (Makefile, post_start.sh, entrypoint.sh).
- There is a need to:
  - Use pip-tools to manage requirements and generate requirements.txt for
    installation.
  - Use a constraints.txt file for pinning versions and reproducibility (see
    <https://luminousmen.com/post/pip-constraints-files> for reference).
  - Follow best practices from pip-tools documentation
    (<https://github.com/jazzband/pip-tools/>).
  - Rename or consolidate requirements files as needed for clarity and
    maintainability, updating all references in scripts and configs.
  - Ensure all scripts (Makefile, post_start.sh, entrypoint.sh, CI configs,
    etc.) use the new requirements file structure.
  - Use Context7 and fetch MCP server to look up documentation and standards as
    needed.

## Objectives

- Audit and refactor all requirements files:
  - Use pip-tools best practices for requirements file naming and structure.
  - Ensure constraints.txt is used for version pinning and reproducibility.
  - Remove unused or duplicate requirements files.
  - Update all references in scripts and configs to match the new structure.
- Update setup.py, pyproject.toml, .pre-commit-config.yaml, post_start.sh,
  entrypoint.sh, Makefile, pylint.yaml, super-linter.yaml, and all
  requirements/ files to:
  - Use the new requirements file structure.
  - Use pip-tools for requirements management and installation.
  - Reference constraints.txt where appropriate.
- Ensure the environment can be set up and installed using pip-tools and the
  new requirements files.
- Document the new workflow and file structure.

## Sources

- requirements/ directory (all requirements files)
- setup.py
- pyproject.toml
- .pre-commit-config.yaml
- .devcontainer/post_start.sh
- .devcontainer/entrypoint.sh
- Makefile
- .github/workflows/pylint.yml
- .github/workflows/super-linter.yml
- pip-tools documentation: <https://github.com/jazzband/pip-tools/>
- pip constraints file best practices:
  <https://luminousmen.com/post/pip-constraints-files>
- Context7 for project-specific standards

## Expectations

- All requirements files follow pip-tools and Python best practices.
- Only the necessary requirements files exist, with clear naming and structure.
- All scripts and configs reference the correct requirements files.
- The environment can be set up using pip-tools and the new requirements files.
- Constraints.txt is used for version pinning and reproducibility.
- Documentation is updated to reflect the new workflow.
- All pre-commit checks and tests pass.

## Acceptance Criteria

- requirements/ directory contains only the necessary and properly named
  requirements files (e.g., requirements.in, requirements-dev.in,
  requirements-prod.in, requirements.txt, requirements-dev.txt,
  requirements-prod.txt, constraints.txt).
- All scripts and configs (Makefile, post_start.sh, entrypoint.sh, CI
  workflows, etc.) reference the correct requirements files.
- pip-tools is used to generate requirements.txt and install dependencies.
- constraints.txt is used for version pinning and reproducibility.
- The environment can be set up and installed using the documented workflow.
- All pre-commit checks and tests pass.
- Documentation is updated and clear.

## Instructions

- Use Context7 and fetch MCP server to look up pip-tools and constraints file
  best practices.
- Audit and refactor all requirements files, renaming or consolidating as
  needed.
- Update all scripts and configs to use the new requirements file structure.
- Ensure pip-tools is used for requirements management and installation.
- Document the new workflow and file structure.
- Iterate until all acceptance criteria are met.
