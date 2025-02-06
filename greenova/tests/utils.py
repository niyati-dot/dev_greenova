# greenova/tests/utils.py
from datetime import datetime, timedelta

from django.contrib.auth.models import Group, User
from django.test import Client


def create_test_user(
    username="testuser",
    password="testpass123",
    is_staff=False,
    is_superuser=False,
    **kwargs,
):
    """Create a test user with optional group membership."""
    user = User.objects.create_user(
        username=username,
        password=password,
        is_staff=is_staff,
        is_superuser=is_superuser,
        **kwargs,
    )
    return user


def get_authenticated_client(user=None):
    """Get a test client with authenticated user."""
    if user is None:
        user = create_test_user()

    client = Client()
    client.login(username=user.username, password='testpass123')
    return client


def create_test_group(name="test_group"):
    """Create a test group."""
    return Group.objects.create(name=name)
