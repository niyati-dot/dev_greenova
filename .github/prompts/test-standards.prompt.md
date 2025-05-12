---
description: Testing standards and guidelines for Greenova, including pytest
  configuration, test structure, and best practices.
mode: general

tools:
  - file_search
  - read_file
  - insert_edit_into_file
  - semantic_search
  - get_errors
  - run_tests
---

<!-- filepath: /workspaces/greenova/.github/prompts/test-standards.prompt.md -->

# Testing Standards and Guidelines

## Test Configuration

### pytest Configuration

```ini
[pytest]
DJANGO_SETTINGS_MODULE = greenova.settings
testpaths = greenova/tests
python_files = test_*.py
pythonpath = .
addopts = --reuse-db --ds=greenova.settings --import-mode=importlib
```

### Test Directory Structure

```
greenova/tests/
├── conftest.py           # Shared fixtures
├── factories/            # Model factories
├── integration/          # Integration tests
├── unit/                # Unit tests
└── e2e/                 # End-to-end tests
```

## Writing Tests

### Unit Tests

```python
from django.test import TestCase
from django.utils import timezone
from datetime import timedelta

class ObligationTests(TestCase):
    """Test Obligation model functionality."""

    def setUp(self) -> None:
        """Set up test data."""
        self.obligation = Obligation.objects.create(
            title="Test Obligation",
            due_date=timezone.now() + timedelta(days=7),
        )

    def test_is_overdue(self) -> None:
        """Test overdue status calculation."""
        self.assertFalse(
            self.obligation.is_overdue(),
            "Obligation should not be overdue",
        )

        self.obligation.due_date = timezone.now() - timedelta(days=1)
        self.obligation.save()

        self.assertTrue(
            self.obligation.is_overdue(),
            "Obligation should be overdue",
        )
```

### Integration Tests

```python
from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth import get_user_model

class ObligationViewTests(TestCase):
    """Test Obligation views."""

    def setUp(self) -> None:
        """Set up test data."""
        self.client = Client()
        self.user = get_user_model().objects.create_user(
            username="testuser",
            password="testpass123",
        )
        self.client.login(
            username="testuser",
            password="testpass123",
        )

    def test_obligation_list_view(self) -> None:
        """Test obligation list view."""
        response = self.client.get(reverse("obligation_list"))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, "obligations/list.html")
```

### End-to-End Tests

```python
from django.contrib.staticfiles.testing import StaticLiveServerTestCase
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class ObligationE2ETests(StaticLiveServerTestCase):
    """End-to-end tests for Obligation functionality."""

    def setUp(self) -> None:
        """Set up test environment."""
        self.browser = webdriver.Chrome()
        self.browser.implicitly_wait(10)

    def tearDown(self) -> None:
        """Clean up test environment."""
        self.browser.quit()

    def test_create_obligation(self) -> None:
        """Test creating a new obligation."""
        # Login
        self.browser.get(f"{self.live_server_url}/login/")
        self.browser.find_element(By.NAME, "username").send_keys("testuser")
        self.browser.find_element(By.NAME, "password").send_keys("testpass123")
        self.browser.find_element(By.CSS_SELECTOR, "button[type='submit']").click()

        # Navigate to create page
        self.browser.get(f"{self.live_server_url}/obligations/create/")

        # Fill form
        self.browser.find_element(By.NAME, "title").send_keys("Test Obligation")
        self.browser.find_element(By.NAME, "description").send_keys("Test Description")

        # Submit form
        self.browser.find_element(By.CSS_SELECTOR, "button[type='submit']").click()

        # Verify success
        WebDriverWait(self.browser, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "success-message"))
        )
```

## Test Fixtures

### Factory Classes

```python
import factory
from django.utils import timezone
from datetime import timedelta

class ObligationFactory(factory.django.DjangoModelFactory):
    """Factory for creating test Obligations."""

    class Meta:
        model = "obligations.Obligation"

    title = factory.Sequence(lambda n: f"Obligation {n}")
    description = factory.Faker("paragraph")
    due_date = factory.LazyFunction(
        lambda: timezone.now() + timedelta(days=7)
    )
    created_by = factory.SubFactory("tests.factories.UserFactory")
```

### Shared Fixtures

```python
import pytest
from django.contrib.auth import get_user_model

@pytest.fixture
def user():
    """Create and return a regular user."""
    return get_user_model().objects.create_user(
        username="testuser",
        password="testpass123",
    )

@pytest.fixture
def admin_user():
    """Create and return an admin user."""
    return get_user_model().objects.create_superuser(
        username="admin",
        password="adminpass123",
    )

@pytest.fixture
def authenticated_client(client, user):
    """Return an authenticated client."""
    client.force_login(user)
    return client
```

## Testing Best Practices

### Test Isolation

- Each test should be independent
- Clean up test data in tearDown
- Use fresh fixtures for each test
- Avoid test interdependence

### Test Coverage

- Aim for 100% coverage on models
- Minimum 90% coverage on views
- Test all edge cases
- Include negative test cases

### Performance Testing

```python
from django.test import TestCase
from django.db import connection
from django.test.utils import CaptureQueriesContext

class PerformanceTests(TestCase):
    """Test query performance."""

    def test_query_count(self) -> None:
        """Ensure efficient query count."""
        with CaptureQueriesContext(connection) as context:
            self.client.get(reverse("obligation_list"))

        query_count = len(context.captured_queries)
        self.assertLess(
            query_count,
            10,
            f"Too many queries ({query_count})",
        )
```

### Security Testing

```python
from django.test import TestCase
from django.urls import reverse

class SecurityTests(TestCase):
    """Test security measures."""

    def test_csrf_protection(self) -> None:
        """Test CSRF protection."""
        response = self.client.post(
            reverse("obligation_create"),
            {"title": "Test"},
        )
        self.assertEqual(response.status_code, 403)

    def test_authorization(self) -> None:
        """Test unauthorized access prevention."""
        response = self.client.get(reverse("admin:index"))
        self.assertEqual(response.status_code, 302)
```

## Test Documentation

### Test Method Documentation

```python
def test_complex_calculation(self) -> None:
    """Test complex calculation functionality.

    This test verifies that:
    1. Initial calculation is correct
    2. Edge cases are handled
    3. Invalid inputs raise appropriate errors

    Test data:
    - Normal case: standard input values
    - Edge case: boundary values
    - Error case: invalid input
    """
    # Test implementation
```

### Test Class Documentation

```python
class ObligationSystemTests(TestCase):
    """System tests for Obligation functionality.

    This test suite verifies:
    - CRUD operations
    - Business logic
    - Integration points
    - Edge cases

    Dependencies:
    - Database
    - Authentication system
    - Permission system
    """
```
