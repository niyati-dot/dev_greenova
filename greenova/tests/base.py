# greenova/tests/base.py
from django.test import Client, TestCase
from django.urls import reverse

from .utils import (
    create_test_group,
    create_test_user,
    get_authenticated_client,
)


class GreenovaTestCase(TestCase):
    """Base test case for Greenova tests."""

    def setUp(self):
        # Create standard test user
        self.user = create_test_user()
        self.client = get_authenticated_client(self.user)

        # Create admin user
        self.admin_user = create_test_user(
            username="admin", is_staff=True, is_superuser=True
        )
        self.admin_client = get_authenticated_client(self.admin_user)

        # Create test group
        self.test_group = create_test_group()

    def assertRequiresLogin(self, url, method='get'):
        """Assert that a URL requires login."""
        client = Client()
        response = getattr(client, method)(url)
        expected_redirect = f'{reverse("login")}?next={url}'
        self.assertRedirects(response, expected_redirect)

    def assertRequiresPermission(self, url, method='get'):
        """Assert that a URL requires specific permissions."""
        response = getattr(self.client, method)(url)
        self.assertEqual(response.status_code, 403)
