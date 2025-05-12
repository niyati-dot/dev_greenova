# Copyright 2025 Enveng Group.
# SPDX-License-Identifier: 	AGPL-3.0-or-later

"""Tests for pre-merge functionality in the Greenova project."""

from datetime import timedelta

import pytest
from company.models import Company, CompanyMembership
from django.test import Client
from django.urls import reverse
from django.utils import timezone
from mechanisms.models import EnvironmentalMechanism
from obligations.models import Obligation
from projects.models import Project
from users.models import Profile, User

# Replace magic values with constants
HTTP_OK = 200


@pytest.fixture
def company():
    """Create a company for testing."""
    return Company.objects.create(name="Test Company")


@pytest.mark.django_db
def test_obligation_summary_view(authenticated_client: Client):
    """Test the ObligationSummaryView with filtering capabilities."""
    # Setup test data
    project = Project.objects.create(name="Test Project")
    mechanism = EnvironmentalMechanism.objects.create(
        name="Test Mechanism", project=project
    )
    obligation1 = Obligation.objects.create(
        obligation_number="OBL001",
        obligation="Test Obligation 1",
        status="not_started",
        primary_environmental_mechanism=mechanism,
        project=project,
    )
    obligation2 = Obligation.objects.create(
        obligation_number="OBL002",
        obligation="Test Obligation 2",
        status="in_progress",
        primary_environmental_mechanism=mechanism,
        project=project,
    )

    # Test filtering by status
    url = reverse("obligations:summary") + (
        f"?status=not_started&mechanism_id={mechanism.id}"
    )
    response = authenticated_client.get(url)
    assert response.status_code == HTTP_OK
    assert obligation1.obligation_number in response.content.decode()
    assert obligation2.obligation_number not in response.content.decode()


@pytest.mark.django_db
def test_obligation_list_template(authenticated_client: Client):
    """Test the obligation list template rendering."""
    # Setup test data
    project = Project.objects.create(name="Test Project")
    mechanism = EnvironmentalMechanism.objects.create(
        name="Test Mechanism", project=project
    )
    Obligation.objects.create(
        obligation_number="OBL001",
        obligation="Test Obligation",
        status="not_started",
        primary_environmental_mechanism=mechanism,
        project=project,
    )

    # Test rendering of obligation list
    url = reverse("obligations:summary") + (f"?mechanism_id={mechanism.id}")
    response = authenticated_client.get(url)
    assert response.status_code == HTTP_OK
    assert "Test Obligation" in response.content.decode()


@pytest.mark.django_db
def test_procedure_charts_interactivity(authenticated_client: Client):
    """Test the interactivity of procedure charts with HTMX."""
    # Setup test data
    project = Project.objects.create(name="Test Project")
    mechanism = EnvironmentalMechanism.objects.create(
        name="Test Mechanism", project=project
    )
    Obligation.objects.create(
        obligation_number="OBL001",
        obligation="Test Obligation",
        status="not_started",
        primary_environmental_mechanism=mechanism,
        project=project,
        procedure="Cultural Heritage Management",  # Use a valid procedure value
    )

    # Test HTMX interactivity
    url = reverse("obligations:summary") + f"?mechanism_id={mechanism.id}"
    response = authenticated_client.get(url, HTTP_HX_REQUEST="true")
    assert response.status_code == HTTP_OK
    assert "Test Obligation" in response.content.decode()


@pytest.mark.django_db
def test_obligation_delete_view(admin_client: Client):
    """Test the ObligationDeleteView functionality."""
    # Setup test data
    project = Project.objects.create(name="Test Project")
    mechanism = EnvironmentalMechanism.objects.create(
        name="Test Mechanism", project=project
    )
    obligation = Obligation.objects.create(
        obligation_number="OBL001",
        obligation="Test Obligation",
        status="not_started",
        primary_environmental_mechanism=mechanism,
        project=project,
    )

    # Test deletion
    url = reverse("obligations:delete", args=[obligation.obligation_number])
    response = admin_client.post(url)
    assert response.status_code == HTTP_OK
    assert not Obligation.objects.filter(obligation_number="OBL001").exists()


@pytest.mark.django_db
def test_company_creation(authenticated_client, regular_user):
    """Test creating a new company."""
    # Make the user a company admin by creating a company and making them an admin
    initial_company = Company.objects.create(name="Initial Company")
    CompanyMembership.objects.create(
        company=initial_company, user=regular_user, role="admin", is_primary=True
    )

    url = reverse("company:create")
    data = {
        "name": "New Company",
        "description": "A newly created company",
        "company_type": "client",
        "industry": "consulting",  # Updated to use a valid industry choice
        "is_active": True,
    }
    response = authenticated_client.post(url, data)

    # Print response content if status code is 200 (form errors)
    if response.status_code == 200:
        print("Form errors:", response.content.decode())

    assert response.status_code == 302  # Redirect after successful creation
    assert Company.objects.filter(name="New Company").exists()


@pytest.mark.django_db
def test_company_update(authenticated_client, company, regular_user):
    """Test updating an existing company."""
    # Make the user an admin of the company
    CompanyMembership.objects.create(
        company=company, user=regular_user, role="admin", is_primary=True
    )

    # Make sure the user is properly associated with the company
    company.users.add(regular_user)
    company.save()

    url = reverse("company:update", args=[company.id])
    data = {
        "name": "Updated Company",
        "description": "Updated description",
        "company_type": "contractor",
        "industry": "consulting",
        "is_active": False,
        # Add all other possible fields to ensure form validation
        "website": "https://example.com",
        "phone": "123-456-7890",
        "email": "info@example.com",
        "address": "123 Main St",
        "size": "medium",
    }
    response = authenticated_client.post(url, data)

    # Debug output
    if response.status_code != 302:
        print(f"Response status: {response.status_code}")
        print(f"Response content: {response.content.decode()}")

    assert response.status_code == 302
    company.refresh_from_db()
    assert company.name == "Updated Company"
    assert company.description == "Updated description"
    assert company.company_type == "contractor"
    assert company.industry == "consulting"
    assert not company.is_active


@pytest.mark.django_db
def test_company_delete(authenticated_client, company, regular_user):
    """Test deleting a company."""
    # Make the user an owner of the company (only owners can delete companies)
    company.users.add(regular_user)
    CompanyMembership.objects.create(
        company=company,
        user=regular_user,
        role="owner",  # Must be owner to delete
        is_primary=True,
    )

    url = reverse("company:delete", args=[company.id])
    response = authenticated_client.post(url)

    # Debug output
    if response.status_code != 302:
        print(f"Delete response status: {response.status_code}")
        print(f"Delete response content: {response.content.decode()}")

    assert response.status_code == 302
    assert not Company.objects.filter(id=company.id).exists()


@pytest.mark.django_db
def test_company_list_view(authenticated_client, company, regular_user):
    """Test the company list view."""
    # Associate the user with the company to grant access
    company.users.add(regular_user)
    CompanyMembership.objects.create(
        company=company, user=regular_user, role="member", is_primary=True
    )

    url = reverse("company:list")
    response = authenticated_client.get(url)
    assert response.status_code == 200
    assert company.name in response.content.decode()


@pytest.mark.django_db
def test_company_membership_creation(authenticated_client, company, regular_user):
    """Test adding a user to a company."""
    # First make the regular user an admin of the company (to have permission to add members)
    company.users.add(regular_user)
    CompanyMembership.objects.create(
        company=company,
        user=regular_user,
        role="admin",  # Admin role needed to add other users
        is_primary=True,
    )

    # Create a new user to add to the company
    new_user = User.objects.create_user(
        username="newuser", password="password123", email="newuser@example.com"
    )

    url = reverse("company:add_member", args=[company.id])
    data = {
        "user": new_user.id,
        "role": "manager",
        "department": "Engineering",
        "position": "Lead Engineer",
        "is_primary": True,
    }
    response = authenticated_client.post(url, data)
    assert response.status_code == 200  # HTMX response is 200 OK, not 302
    assert CompanyMembership.objects.filter(company=company, user=new_user).exists()


@pytest.mark.django_db
def test_company_membership_removal(authenticated_client, company, regular_user):
    """Test removing a user from a company."""
    # First make the regular user an admin of the company (to have permission to remove members)
    company.users.add(regular_user)
    CompanyMembership.objects.create(
        company=company,
        user=regular_user,
        role="admin",  # Admin role needed to remove users
        is_primary=True,
    )

    # Create a new user to remove from the company
    new_user = User.objects.create_user(
        username="removeme", password="password123", email="removeme@example.com"
    )

    # Add the new user to the company
    company.users.add(new_user)
    membership = CompanyMembership.objects.create(
        company=company, user=new_user, role="manager"
    )

    url = reverse("company:remove_member", args=[company.id, membership.id])
    response = authenticated_client.post(url)

    # Debug output
    if response.status_code != 200:  # HTMX response is 200 OK, not 302
        print(f"Remove member response status: {response.status_code}")
        print(f"Remove member response content: {response.content.decode()}")

    assert response.status_code == 200  # HTMX response is 200 OK
    assert not CompanyMembership.objects.filter(id=membership.id).exists()


@pytest.mark.django_db
class TestUserProfileModel:
    """Test suite for user profile model relationships and functionality."""

    def test_profile_responsibility_relationship(self, regular_user, test_company):
        """
        Test the relationship between user profile and responsibility.

        Through company membership.
        """
        # Verify user has a profile
        assert hasattr(regular_user, "profile")
        assert isinstance(regular_user.profile, Profile)

        # Create company membership with role
        membership = CompanyMembership.objects.create(
            user=regular_user, company=test_company, role="manager"
        )

        # Verify role relationship
        user_roles = CompanyMembership.objects.filter(user=regular_user).values_list(
            "role", flat=True
        )
        assert membership.role in user_roles

    def test_profile_overdue_obligations(
        self, regular_user, test_company, project, mechanism
    ):
        """Test retrieval of overdue obligations for a user profile."""
        # Create company membership
        membership = CompanyMembership.objects.create(
            user=regular_user, company=test_company, role="manager"
        )

        # Create overdue obligation
        overdue_obligation = Obligation.objects.create(
            obligation_number="OBL001",
            obligation="Test Overdue",
            status="not_started",
            primary_environmental_mechanism=mechanism,
            project=project,
            action_due_date=timezone.now().date() - timedelta(days=1),
            responsibility=membership.role,
        )

        # Create future obligation
        future_obligation = Obligation.objects.create(
            obligation_number="OBL002",
            obligation="Test Future",
            status="not_started",
            primary_environmental_mechanism=mechanism,
            project=project,
            action_due_date=timezone.now().date() + timedelta(days=1),
            responsibility=membership.role,
        )

        # Add user to project
        project.members.add(regular_user)

        # Count overdue obligations
        user_obligations = Obligation.objects.filter(
            responsibility=membership.role, project__members=regular_user
        )
        overdue_count = sum(1 for obl in user_obligations if obl.is_overdue)

        assert overdue_count == 1
        assert overdue_obligation.is_overdue
        assert not future_obligation.is_overdue


@pytest.mark.django_db
class TestProfileView:
    """Test suite for profile view functionality."""

    def test_profile_overdue_obligations_count(
        self, authenticated_client, regular_user, company, project, mechanism
    ):
        """Test that the profile view correctly counts and displays overdue obligations."""
        # Create company membership
        membership = CompanyMembership.objects.create(
            user=regular_user, company=company, role="manager"
        )

        # Create overdue obligation
        Obligation.objects.create(
            obligation_number="OBL003",
            obligation="Test Overdue",
            status="not_started",
            primary_environmental_mechanism=mechanism,
            project=project,
            action_due_date=timezone.now().date() - timedelta(days=1),
            responsibility=membership.role,
        )

        # Add user to project
        project.members.add(regular_user)

        # Make the client authenticated as the regular_user
        authenticated_client.force_login(regular_user)

        # Request the profile page
        url = reverse("users:profile")
        response = authenticated_client.get(url)

        # Check that the response is successful and contains the overdue count
        assert response.status_code == HTTP_OK
        content = response.content.decode("utf-8")

        # Check that overdue count is properly displayed in the HTML
        assert "You have <strong>1</strong> overdue compliance items" in content

        # Check that the overdue count is positioned correctly in the HTML structure
        # It should appear after the profile section and before the contact information
        profile_section_html = '<div class="profile-section">'
        overdue_alert_html = '<div class="alert alert-warning overdue-alert">'
        contact_info_html = '<div class="contact-info">'

        # Check for proper sequence of elements in the HTML
        profile_pos = content.find(profile_section_html)
        overdue_pos = content.find(overdue_alert_html)
        contact_pos = content.find(contact_info_html)

        # Verify correct positioning - profile -> overdue -> contact info
        assert profile_pos < overdue_pos < contact_pos, (
            "Overdue obligations alert is not positioned correctly"
        )

    def test_profile_view_context(
        self, authenticated_client, regular_user, company, project, mechanism
    ):
        """Test that the profile view provides the correct context data."""
        # Create company membership
        membership = CompanyMembership.objects.create(
            user=regular_user, company=company, role="manager"
        )

        # Create overdue obligation
        Obligation.objects.create(
            obligation_number="OBL003",
            obligation="Test Overdue",
            status="not_started",
            primary_environmental_mechanism=mechanism,
            project=project,
            action_due_date=timezone.now().date() - timedelta(days=1),
            responsibility=membership.role,
        )

        # Add user to project
        project.members.add(regular_user)

        # Make the client authenticated as the regular_user
        authenticated_client.force_login(regular_user)

        # Request the profile page
        url = reverse("users:profile")
        response = authenticated_client.get(url)

        # Verify context contains profile and overdue_count
        assert "profile" in response.context
        assert "overdue_count" in response.context
        assert response.context["overdue_count"] == 1

        # Verify that the user's role from CompanyMembership is linked to responsibility
        assert CompanyMembership.objects.filter(
            user=regular_user, role=membership.role
        ).exists()

        # Verify the relationship between user's role and responsibilities
        user_role = CompanyMembership.objects.get(user=regular_user).role
        responsibilities = Obligation.objects.filter(responsibility=user_role)
        assert responsibilities.count() == 1

    def test_profile_overdue_alert_html_structure(
        self, authenticated_client, regular_user, company, project, mechanism
    ):
        """Test the HTML structure of the overdue alert in profile view."""
        # Create company membership
        membership = CompanyMembership.objects.create(
            user=regular_user, company=company, role="manager"
        )

        # Create two overdue obligations
        for i in range(2):
            Obligation.objects.create(
                obligation_number=f"OBL00{i + 3}",
                obligation=f"Test Overdue {i + 1}",
                status="not_started",
                primary_environmental_mechanism=mechanism,
                project=project,
                action_due_date=timezone.now().date() - timedelta(days=1),
                responsibility=membership.role,
            )

        # Add user to project
        project.members.add(regular_user)

        # Make the client authenticated as the regular_user
        authenticated_client.force_login(regular_user)

        # Request the profile page
        url = reverse("users:profile")
        response = authenticated_client.get(url)

        # Check HTML structure
        content = response.content.decode("utf-8")

        # Verify the overdue alert HTML structure
        assert '<div class="alert alert-warning overdue-alert">' in content
        assert "You have <strong>2</strong> overdue compliance items" in content
        assert '<a href="' in content and "View all" in content

        # Verify the placement in the document - after profile header, before contact info
        assert (
            content.find("<h2>Profile</h2>")
            < content.find("overdue-alert")
            < content.find("contact-info")
        )

    def test_no_overdue_obligations(self, authenticated_client, regular_user, company):
        """Test when user has no overdue obligations."""
        # Create company membership but no overdue obligations
        CompanyMembership.objects.create(
            user=regular_user, company=company, role="manager"
        )

        # Make the client authenticated as the regular_user
        authenticated_client.force_login(regular_user)

        # Request the profile page
        url = reverse("users:profile")
        response = authenticated_client.get(url)

        # Verify context contains profile and overdue_count as 0
        assert "profile" in response.context
        assert "overdue_count" in response.context
        assert response.context["overdue_count"] == 0

        # Verify no overdue alert is shown
        content = response.content.decode("utf-8")
        assert "overdue compliance items" not in content

    def test_no_company_membership(self, authenticated_client, regular_user):
        """Test when user has no company memberships."""
        # Delete any company memberships to ensure clean test
        CompanyMembership.objects.filter(user=regular_user).delete()

        # Make the client authenticated as the regular_user
        authenticated_client.force_login(regular_user)

        # Request the profile page
        url = reverse("users:profile")
        response = authenticated_client.get(url)

        # Verify context contains profile and overdue_count as 0
        assert "profile" in response.context
        assert "overdue_count" in response.context
        assert response.context["overdue_count"] == 0

    def test_profile_image_accessbility(self, authenticated_client, regular_user):
        """Test the profile image accessibility in the template."""
        # Make the client authenticated as the regular_user
        authenticated_client.force_login(regular_user)

        # Request the profile partial directly via HTMX to get just the partial content
        url = reverse("users:profile")
        response = authenticated_client.get(
            url,
            HTTP_HX_REQUEST="true",  # Simulate HTMX request to get partial
        )

        # Check the response status
        assert response.status_code == HTTP_OK

        # Check that the image does not have hardcoded dimensions
        content = response.content.decode("utf-8")
        assert 'height="150"' not in content
        assert 'width="150"' not in content

        # For users with no profile image, check for the profile-initial div
        if "<img" in content:
            # If image is present, check for alt text
            assert (
                'alt="Profile picture"' in content
                or 'alt="profile picture"' in content.lower()
            )
        else:
            # Otherwise check for profile initial
            assert '<div class="profile-initial">' in content
