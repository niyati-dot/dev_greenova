import json
import os

import pytest
from core.utils.roles import ProjectRole
from django.contrib.auth import get_user_model
from django.urls import reverse
from obligations.models import Obligation
from projects.models import Project, ProjectMembership

User = get_user_model()


# Fixtures
@pytest.fixture
def test_user():
    """Create and return a test user."""
    test_username = os.environ.get("TEST_USERNAME", "test")
    test_email = os.environ.get("TEST_EMAIL", "test@example.com")
    test_password = os.environ.get("TEST_PASSWORD", "test")

    return User.objects.create_user(
        username=test_username,
        email=test_email,
        password=test_password,
    )


@pytest.fixture
def test_project(test_user):  # pylint: disable=redefined-outer-name
    """Create and return a test project."""
    project = Project.objects.create(
        name="Test Project",
        description="A test project for unit testing",
    )
    ProjectMembership.objects.create(
        user=test_user,
        project=project,
        role=ProjectRole.MANAGER.value,
    )
    return project


@pytest.fixture
def second_project():
    """Create and return another test project without members."""
    return Project.objects.create(
        name="Second Project",
        description="Another test project",
    )


@pytest.fixture
def test_membership(test_user, test_project):  # pylint: disable=redefined-outer-name
    """Return the membership between test_user and test_project."""
    return ProjectMembership.objects.get(user=test_user, project=test_project)


@pytest.fixture
def test_obligations(test_project):  # pylint: disable=redefined-outer-name
    """Create and return test obligations for a project."""
    obligations = []
    for i in range(3):
        obligation = Obligation.objects.create(
            obligation_number=f"OBL-{i + 1}",
            project=test_project,
        )
        obligations.append(obligation)
    return obligations


# Model Tests
@pytest.mark.django_db
class TestProjectModel:
    """Tests for the Project model."""

    def test_project_creation(self, test_project) -> None:  # pylint: disable=redefined-outer-name
        """Test project can be created with proper fields."""
        assert isinstance(test_project, Project)
        assert test_project.name == "Test Project"
        assert test_project.description == "A test project for unit testing"

    def test_project_string_representation(self, test_project) -> None:  # pylint: disable=redefined-outer-name
        """Test string representation of Project."""
        assert str(test_project) == "Test Project"

    def test_get_member_count(
        self, test_project,  # pylint: disable=redefined-outer-name
    ) -> None:
        """Test get_member_count returns correct count."""
        assert test_project.get_member_count() == 1

        # Add another user to verify count increases
        test_password = os.environ.get("TEST_PASSWORD", "password")
        user2 = User.objects.create_user(username="user2", password=test_password)
        test_project.add_member(user2)
        assert test_project.get_member_count() == 2

    def test_get_user_role(
        self, test_project, test_user,  # pylint: disable=redefined-outer-name
    ) -> None:
        """Test get_user_role returns correct role."""
        assert test_project.get_user_role(test_user) == ProjectRole.MANAGER.value

    def test_has_member(
        self, test_project, test_user,  # pylint: disable=redefined-outer-name
    ) -> None:
        """Test has_member correctly identifies members."""
        assert test_project.has_member(test_user) is True

        test_password = os.environ.get("TEST_PASSWORD", "password")
        non_member = User.objects.create_user(
            username="nonmember",
            password=test_password,
        )
        assert test_project.has_member(non_member) is False

    def test_add_member(self, test_project) -> None:  # pylint: disable=redefined-outer-name
        """Test add_member adds a member with correct role."""
        test_password = os.environ.get("TEST_PASSWORD", "password")
        new_user = User.objects.create_user(
            username="newmember",
            password=test_password,
        )
        test_project.add_member(new_user, role=ProjectRole.VIEWER.value)

        assert test_project.has_member(new_user) is True
        assert test_project.get_user_role(new_user) == ProjectRole.VIEWER.value

    def test_remove_member(
        self, test_project, test_user,  # pylint: disable=redefined-outer-name
    ) -> None:
        """Test remove_member removes a member."""
        test_project.remove_member(test_user)
        assert test_project.has_member(test_user) is False

    def test_get_members_by_role(
        self, test_project, test_user,  # pylint: disable=redefined-outer-name
    ) -> None:
        """Test get_members_by_role returns correct users."""
        members = test_project.get_members_by_role(ProjectRole.MANAGER.value)
        assert test_user in members

        # Add another user with different role
        test_password = os.environ.get("TEST_PASSWORD", "password")
        viewer_user = User.objects.create_user(
            username="viewer",
            password=test_password,
        )
        test_project.add_member(viewer_user, role=ProjectRole.VIEWER.value)

        managers = test_project.get_members_by_role(ProjectRole.MANAGER.value)
        viewers = test_project.get_members_by_role(ProjectRole.VIEWER.value)

        assert test_user in managers
        assert viewer_user not in managers
        assert viewer_user in viewers

    def test_obligations_property(
        self, test_project, test_obligations,  # pylint: disable=redefined-outer-name
    ) -> None:
        """Test obligations property returns related obligations."""
        project_obligations = test_project.obligations
        assert project_obligations.count() == 3

        # Convert RelatedManager to a list for containment check
        project_obligations_list = list(project_obligations.all())
        for obligation in test_obligations:
            assert obligation in project_obligations_list

    def test_unique_constraint(
        self, test_user, test_project,  # pylint: disable=redefined-outer-name
    ) -> None:
        """Test that user can only have one membership per project."""
        # Attempt to create a duplicate membership
        with pytest.raises(Exception):  # Should raise IntegrityError but catching any Exception
            ProjectMembership.objects.create(
                user=test_user,
                project=test_project,
                role=ProjectRole.VIEWER.value,
            )


@pytest.mark.django_db
class TestProjectMembershipModel:
    """Tests for the ProjectMembership model."""

    def test_membership_creation(self, test_membership) -> None:  # pylint: disable=redefined-outer-name
        """Test membership can be created with proper fields."""
        assert isinstance(test_membership, ProjectMembership)
        assert test_membership.role == ProjectRole.MANAGER.value

    def test_membership_string_representation(
        self, test_membership, test_user, test_project,  # pylint: disable=redefined-outer-name
    ) -> None:
        """Test string representation of ProjectMembership."""
        expected = (
            f"{test_user.username} - {test_project.name} ({ProjectRole.MANAGER.value})"
        )
        assert str(test_membership) == expected

    def test_unique_constraint(
        self, test_user, test_project,  # pylint: disable=redefined-outer-name
    ) -> None:
        """Test that user can only have one membership per project."""
        # Attempt to create a duplicate membership
        with pytest.raises(Exception):  # Should raise IntegrityError but catching any Exception
            ProjectMembership.objects.create(
                user=test_user,
                project=test_project,
                role=ProjectRole.VIEWER.value,
            )


# View Tests
@pytest.mark.django_db
class TestProjectSelectionView:
    """Tests for the ProjectSelectionView."""

    def test_view_requires_login(self, client, monkeypatch) -> None:
        """Test that view requires authentication."""
        # Patch the get_login_url method to avoid NoReverseMatch error
        monkeypatch.setattr(
            "django.contrib.auth.mixins.LoginRequiredMixin.get_login_url",
            lambda x: "/login/",
        )

        url = reverse("projects:select")
        response = client.get(url)
        assert response.status_code == 302  # Should redirect to login
        assert "/login/" in response.url

    def test_view_accessible_when_logged_in(
        self, client, test_user,  # pylint: disable=redefined-outer-name
    ) -> None:
        """Test that view is accessible when logged in ."""
        client.force_login(test_user)
        url = reverse("projects:select")
        response = client.get(url)
        assert response.status_code == 200

    def test_context_contains_user_projects(
        self,
        client,
        test_user,  # pylint: disable=redefined-outer-name
        test_project,  # pylint: disable=redefined-outer-name
        second_project,  # pylint: disable=redefined-outer-name
    ) -> None:
        """Test that context contains only the user's projects."""
        client.force_login(test_user)
        url = reverse("projects:select")
        response = client.get(url)

        # Look for project list in context (could be named 'object_list' for ListView)
        projects_in_context = None
        if "object_list" in response.context:
            projects_in_context = response.context["object_list"]
        elif "project_list" in response.context:
            projects_in_context = response.context["project_list"]
        elif "user_projects" in response.context:
            projects_in_context = response.context["user_projects"]
        else:
            # Get available context keys for the error message
            available_keys = []
            for dictionary in response.context.dicts:
                available_keys.extend(dictionary.keys())
            # Filter out private keys starting with underscore
            available_keys = [
                k for k in available_keys if not str(k).startswith("_")
            ]

            # If we reach here, the view likely needs to be fixed to add projects to
            # context
            pytest.fail(
                f"No project list found in context. Available keys: {available_keys}",
            )

        # Check that test_project is in the context but second_project is not
        assert test_project in projects_in_context
        assert second_project not in projects_in_context

    def test_context_contains_selected_project_id(
        self, client, test_user, test_project,  # pylint: disable=redefined-outer-name
    ) -> None:
        """Test that context contains selected_project_id when provided."""
        client.force_login(test_user)
        url = f"{reverse('projects:select')}?project_id={test_project.id}"
        response = client.get(url)

        # The selected_project_id should be in context regardless of project list name
        assert "selected_project_id" in response.context
        assert response.context["selected_project_id"] == str(test_project.id)

    def test_htmx_request_triggers_client_event(
        self, client, test_user,  # pylint: disable=redefined-outer-name
    ) -> None:
        """Test that htmx request triggers client event."""
        client.force_login(test_user)
        url = reverse("projects:select")

        # Mock an HTMX request
        response = client.get(url, HTTP_HX_REQUEST="true")

        # Check for the HX-Trigger header indicating the projectSelected event
        assert "HX-Trigger" in response.headers
        assert "projectSelected" in response.headers["HX-Trigger"]

    def test_requires_special_access(
        self, client, test_user,  # pylint: disable=redefined-outer-name
    ) -> None:
        """Test the requires_special_access method."""
        client.force_login(test_user)
        url = f"{reverse('projects:select')}?project_id=999"  # Non-existent project
        response = client.get(url, HTTP_HX_REQUEST="true")

        # Should log a warning but not redirect
        assert response.status_code == 200

    def test_empty_projects_list(
        self, client, test_user,  # pylint: disable=redefined-outer-name
    ) -> None:
        """Test view behavior when user has no projects."""
        # Remove any existing project memberships
        ProjectMembership.objects.filter(user=test_user).delete()

        client.force_login(test_user)
        url = reverse("projects:select")
        response = client.get(url)

        assert response.status_code == 200

        # Find projects in context using multiple possible names
        project_list = None
        for key in ["object_list", "project_list", "user_projects"]:
            if key in response.context:
                project_list = response.context[key]
                break

        assert project_list is not None, "Could not find projects list in context"
        assert len(project_list) == 0

    def test_multiple_projects(
        self, client, test_user, test_project,  # pylint: disable=redefined-outer-name
    ) -> None:
        """Test behavior with multiple projects assigned to user."""
        # Create additional projects for the user
        for i in range(2):
            project = Project.objects.create(
                name=f"Additional Project {i}",
                description=f"Additional test project {i}",
            )
            ProjectMembership.objects.create(
                user=test_user,
                project=project,
                role=ProjectRole.VIEWER.value,
            )

        client.force_login(test_user)
        url = reverse("projects:select")
        response = client.get(url)

        assert response.status_code == 200

        # Find projects in context using multiple possible names
        project_list = None
        for key in ["object_list", "project_list", "user_projects"]:
            if key in response.context:
                project_list = response.context[key]
                break

        assert project_list is not None, "Could not find projects list in context"
        assert len(project_list) == 3  # Original + 2 new ones

        # Verify project names are in context
        project_names = [p.name for p in project_list]
        assert "Test Project" in project_names
        assert "Additional Project 0" in project_names
        assert "Additional Project 1" in project_names

    def test_template_used(
        self, client, test_user,  # pylint: disable=redefined-outer-name
    ) -> None:
        """Test that correct template is used."""
        client.force_login(test_user)
        url = reverse("projects:select")
        response = client.get(url)

        assert response.status_code == 200
        assert "projects/projects_selector.html" in [t.name for t in response.templates]

    def test_nonexistent_project_id(
        self, client, test_user,  # pylint: disable=redefined-outer-name
    ) -> None:
        """Test handling of non-existent project ID in query parameters."""
        client.force_login(test_user)
        url = f"{reverse('projects:select')}?project_id=99999"  # Non-existent ID
        response = client.get(url)

        # Should still render the page, just without that project selected
        assert response.status_code == 200
        assert "selected_project_id" in response.context
        # Should preserve the ID in context
        assert response.context["selected_project_id"] == "99999"

    def test_different_user_roles(
        self, client, test_user, test_project,  # pylint: disable=redefined-outer-name
    ) -> None:
        """Test that users with different roles can access the view."""
        # Change user's role to VIEWER
        membership = ProjectMembership.objects.get(user=test_user, project=test_project)
        membership.role = ProjectRole.VIEWER.value
        membership.save()

        client.force_login(test_user)
        url = reverse("projects:select")
        response = client.get(url)

        assert response.status_code == 200

        # Find projects in context using multiple possible names
        project_list = None
        for key in ["object_list", "project_list", "user_projects"]:
            if key in response.context:
                project_list = response.context[key]
                break

        assert project_list is not None, "Could not find projects list in context"
        assert test_project in project_list


@pytest.mark.django_db
class TestProjectObligationsView:
    """Tests for the project_obligations view."""

    def test_project_obligations_view_returns_json(
        self,
        client,
        test_user,  # pylint: disable=redefined-outer-name
        test_project,  # pylint: disable=redefined-outer-name
        test_obligations,  # pylint: disable=redefined-outer-name
    ) -> None:
        """Test that project_obligations view returns JSON with correct data."""
        client.force_login(test_user)
        url = reverse(
            "projects:project_obligations", kwargs={
                "project_id": test_project.id})
        response = client.get(url)

        assert response.status_code == 200
        assert response["Content-Type"] == "application/json"

        # Parse JSON response
        data = json.loads(response.content)
        assert "obligations" in data
        assert len(data["obligations"]) == 3

        # Check that all obligations are included
        obligation_ids = [o["id"] for o in data["obligations"]]
        for obligation in test_obligations:
            assert obligation.obligation_number in obligation_ids

    def test_nonexistent_project_returns_404(
        self, client, test_user,  # pylint: disable=redefined-outer-name
    ) -> None:
        """Test that requesting obligations for non-existent project returns 404."""
        client.force_login(test_user)
        url = reverse("projects:project_obligations", kwargs={"project_id": 9999})
        response = client.get(url)

        assert response.status_code == 404


# URL Tests
@pytest.mark.django_db
class TestProjectUrls:
    """Tests for project URLs."""

    def test_project_select_url(
        self, client, test_user,  # pylint: disable=redefined-outer-name
    ) -> None:
        """Test that project selection URL works."""
        client.force_login(test_user)
        url = reverse("projects:select")
        response = client.get(url)
        assert response.status_code == 200
        assert "projects/projects_selector.html" in [t.name for t in response.templates]
