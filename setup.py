"""Setup script for the Greenova environmental management project."""

import os
import re

from setuptools import find_packages, setup

# Load version using safer approach without exec
version_file_path = "greenova/version.py"
version = "0.0.0"  # Default version

if os.path.exists(version_file_path):
    with open(version_file_path, encoding="utf-8") as f:
        version_content = f.read()
        # Extract version using regex pattern
        version_match = re.search(
            r"__version__\s*=\s*['\"]([^'\"]+)['\"]", version_content
        )
        if version_match:
            version = version_match.group(1)

# Get long description from README
with open("README.md", encoding="utf-8") as f:
    long_description = f.read()

# Setup configuration
setup(
    name="greenova",
    version=version,
    description="Environmental compliance management system",
    long_description=long_description,
    author="Adrian Gallo",
    author_email="agallo@enveng-group.com.au",
    url="https://github.com/enveng-group-sustainability/greenova",
    license="AGPL-3.0-or-later",
    packages=find_packages(),
    include_package_data=True,
    # Dependency management is handled via pip-tools and requirements/*.in files.
    # See requirements/README.rst and docs/REQUIREMENTS_WORKFLOW.md for workflow.
    # Do not add dependencies here; use requirements/requirements.in and pip-compile.
    install_requires=[
        "Django>=5.0.0,<5.3.0",
        "django-allauth>=0.60.0,<1.0.0",
        "django-debug-toolbar>=5.2.0,<6.0.0",
        "django-htmx>=1.23.0,<2.0.0",
        "django-hyperscript>=1.5.0,<2.0.0",
        "django-silk>=5.3.0,<6.0.0",
        "django-tailwind>=4.0.0,<5.0.0",
        "django-template-partials>=24.0.0,<25.0.0",
        "matplotlib>=3.10.0,<4.0.0",
        "numpy>=1.26.0,<1.27.0",  # Updated for Python 3.12 compatibility
        "Pillow>=11.2.0,<12.0.0",
        "python-dotenv>=0.21.0,<1.0.0",
        "python-dateutil>=2.9.0,<3.0.0",
        "protobuf>=6.30.0,<7.0.0",
        "sentry-sdk>=2.27.0,<3.0.0",
        "cryptography>=41.0.0,<42.0.0",
        "gunicorn>=23.0.0,<24.0.0",
    ],
    extras_require={
        "dev": [
            "black>=23.12.0",
            "isort>=5.13.2",
            "mypy>=1.7.1",
            "django-stubs>=4.2.7",
            "django-stubs-ext>=4.2.0",
            "types-requests>=2.31.0.1",
            "types-Pillow>=11.2.0.1",
            "types-PyYAML>=6.0.12.1",
            "types-python-dateutil>=2.9.0.1",
            "types-protobuf>=6.30.0.1",
            "matplotlib-stubs>=0.5.0",
            "pandas-stubs>=2.1.0.1",
            "types-pytz>=2023.3.1",
            "types-jinja2>=3.1.0.1",
            "types-setuptools>=80.0.0.1",
        ],
        "test": [
            "pytest>=7.4.3",
            "pytest-cov>=4.1.0",
            "pytest-django>=4.7.0",
        ],
    },
    classifiers=[
        "Development Status :: 4 - Beta",
        "Environment :: Web Environment",
        "Framework :: Django",
        "Framework :: Django :: 5.0",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: GNU Affero General Public License v3",
        "Operating System :: OS Independent",
        "Programming Language :: Python",
        "Programming Language :: Python :: 3.12",
        "Topic :: Internet :: WWW/HTTP",
        "Topic :: Internet :: WWW/HTTP :: Dynamic Content",
    ],
    python_requires=">=3.12",
    entry_points={
        "console_scripts": [
            "greenova-manage=greenova.manage:main",
        ],
    },
)
