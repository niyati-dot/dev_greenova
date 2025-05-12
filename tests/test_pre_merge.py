import pytest
from django.contrib.auth.models import User
from django.db import connection
from django.test import Client, TestCase
from django.urls import NoReverseMatch, reverse


@pytest.mark.django_db
class TestMechanismCharts:
    def test_mechanism_urls_exist(self):
        """Test that the mechanisms URLs are properly configured."""
        # Test list URL
        try:
            url = reverse("mechanisms:list")
        except NoReverseMatch as e:
            pytest.fail(f"mechanisms:list URL pattern not found: {e!s}")
        assert url == "/mechanisms/"

        # Test charts URL
        try:
            url = reverse("mechanisms:mechanism_charts")
        except NoReverseMatch as e:
            pytest.fail(f"mechanisms:mechanism_charts URL pattern not found: {e!s}")
        assert url == "/mechanisms/charts/"

    def test_mechanism_charts_view(self, client: Client):
        """Test that mechanism charts view works with project_id."""
        # Test without project_id
        response = client.get(reverse("mechanisms:mechanism_charts"))
        assert response.status_code == 200
        assert "error" in response.context
        assert response.context["error"] == "No project selected"

        # Test with invalid project_id
        response = client.get(
            reverse("mechanisms:mechanism_charts") + "?project_id=invalid"
        )
        assert response.status_code == 200
        assert "error" in response.context
        assert response.context["error"] == "Invalid project ID"

        # Test with non-existent project_id
        response = client.get(
            reverse("mechanisms:mechanism_charts") + "?project_id=99999"
        )
        assert response.status_code == 200
        assert "error" in response.context
        assert "Project with ID 99999 not found" in response.context["error"]


class TestCompanyUsersTable(TestCase):
    def test_company_users_table_exists(self):
        """Test that the company_company_users table exists in the database."""
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='company_company_users';"
            )
            result = cursor.fetchone()
        self.assertIsNotNone(result, "The company_company_users table does not exist.")

    def test_company_users_table_columns(self):
        """Test that the company_company_users table has the correct columns."""
        with connection.cursor() as cursor:
            cursor.execute("PRAGMA table_info('company_company_users');")
            columns = [row[1] for row in cursor.fetchall()]
        expected_columns = ["id", "company_id", "user_id"]
        for column in expected_columns:
            self.assertIn(column, columns, f"Missing column: {column}")


@pytest.mark.django_db
def test_logout_redirects_to_landing_page():
    """Test that logging out redirects to the landing page."""
    # Create a test user
    User.objects.create_user(username="testuser", password="testpassword")

    # Log in the user
    client = Client()
    client.login(username="testuser", password="testpassword")

    # Log out the user
    response = client.get(reverse("account_logout"))

    # Assert the user is redirected to the landing page
    assert response.status_code == 302
    assert response.url == reverse("landing:home")


@pytest.mark.django_db
def test_landing_page_loads_after_logout():
    """Test that the landing page loads correctly after logout."""
    # Create a test user
    User.objects.create_user(username="testuser", password="testpassword")

    # Log in the user
    client = Client()
    client.login(username="testuser", password="testpassword")

    # Log out the user
    client.get(reverse("account_logout"))

    # Access the landing page
    response = client.get(reverse("landing:home"))

    # Assert the landing page loads successfully
    assert response.status_code == 200
    assert b"Welcome to Greenova" in response.content
