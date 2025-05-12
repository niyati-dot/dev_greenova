# Migration to pip-tools and constraints.txt


## Migration Steps
1. Use only requirements.in, requirements-dev.in, requirements-prod.in, and constraints.txt.
2. Run pip-compile and pip-sync as documented.
3. Remove all references to base.in, base.txt, dev.in, dev.txt, prod.in, prod.txt from scripts and documentation.
4. If you encounter issues, consult requirements/README.md or contact the maintainers.
Greenova now uses pip-tools for all Python dependency management. All legacy requirements files are deprecated. Please follow the new workflow as described in requirements/README.md and docs/REQUIREMENTS_WORKFLOW.md.
