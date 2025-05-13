"""
Pytest configuration file for Greenova project.

Defines fixtures and setup for testing Django applications.
"""

# pylint: disable=import-error
from __future__ import annotations

import logging
import os
import sys
from pathlib import Path
from typing import TYPE_CHECKING, Any, TextIO, cast

import django
import pytest
from company.models import Company
from django.contrib.auth import get_user_model
from django.test import Client
from dotenv_vault import load_dotenv
from mechanisms.models import EnvironmentalMechanism
from projects.models import Project

if TYPE_CHECKING:
    pass  # type: ignore[import]

# Add the project root to sys.path to ensure consistent import paths
project_root = Path(__file__).parent.parent.parent
sys.path.insert(0, str(project_root))

# Load environment variables
load_dotenv()

# Add the project root directory to Python path
root_dir = Path(__file__).parent.absolute()
sys.path.insert(0, str(root_dir))

# Add the project app directory to Python path
# The order matters here - we need the greenova directory first for imports
project_dir = os.path.join(root_dir, "greenova")
if project_dir not in sys.path:
    sys.path.insert(0, project_dir)

# Configure Django settings
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "greenova.settings")

# Import Django after setting the environment variable
django.setup()

# Setup console logger for debugging
logger = logging.getLogger(__name__)
handler = logging.StreamHandler(cast(TextIO, sys.stdout))
handler.setLevel(logging.DEBUG)
formatter = logging.Formatter("%(levelname)s - %(message)s")
handler.setFormatter(formatter)
logger.addHandler(handler)
logger.setLevel(logging.DEBUG)

User = get_user_model()


@pytest.fixture(name="admin_user")
def admin_user_fixture() -> Any:
    """Create and return a superuser."""
    admin_username = os.environ.get("ADMIN_USERNAME", "admin")
    admin_email = os.environ.get("ADMIN_EMAIL", "admin@example.com")
    admin_password = os.environ.get("ADMIN_PASSWORD", "adminpass")
    return User.objects.create_superuser(
        username=admin_username, email=admin_email, password=admin_password
    )


@pytest.fixture(name="regular_user")
def regular_user_fixture() -> Any:
    """Create and return a regular user with an associated profile."""
    user_username = os.environ.get("TEST_USERNAME", "user")
    user_email = os.environ.get("TEST_EMAIL", "user@example.com")
    user_password = os.environ.get("TEST_PASSWORD", "userpass")
    user = User.objects.create_user(
        username=user_username, email=user_email, password=user_password
    )
    try:
        from users.models import Profile  # type: ignore[import]

        Profile.objects.get_or_create(user=user)
    except ImportError:
        pass
    return user


@pytest.fixture(name="authenticated_client")
def authenticated_client_fixture(regular_user: Any) -> Client:
    """Return a client logged in as an authenticated user."""
    client = Client()
    client.force_login(regular_user)
    return client


@pytest.fixture(name="admin_client")
def admin_client_fixture(admin_user: Any) -> Client:
    """Return a client that's already logged in as an admin user."""
    admin_username = os.environ.get("ADMIN_USERNAME", "admin")
    admin_password = os.environ.get("ADMIN_PASSWORD", "adminpass")
    client = Client()
    client.login(
        username=getattr(admin_user, "username", admin_username),
        password=admin_password,
    )
    return client


@pytest.fixture(name="project")
def project_fixture() -> Project:
    """Create and return a Project instance."""
    return Project.objects.create(name="Test Project")


@pytest.fixture(name="mechanism")
def mechanism_fixture(project: Project) -> EnvironmentalMechanism:
    """Create and return an EnvironmentalMechanism instance linked to a Project."""
    return EnvironmentalMechanism.objects.create(
        name="Test Mechanism",
        project=project,
    )


@pytest.fixture(name="test_company")
def test_company_fixture() -> Company:
    """Create and return a Company instance for testing."""
    return Company.objects.create(name="Test Company")


@pytest.fixture(name="company")
def company_fixture(test_company: Company) -> Company:
    """Alias for test_company fixture to provide 'company' for tests."""
    return test_company
