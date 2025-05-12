"""
Utility functions for user-related operations.

This module provides helper functions to calculate and manage
user-specific data, such as overdue obligations.

Module namespace: users.utils
"""

from company.models import CompanyMembership
from obligations.models import Obligation
from projects.models import Project


def calculate_overdue_obligations(user_id: int) -> list[Obligation]:
    """Calculate overdue obligations for a given user."""
    company_memberships = CompanyMembership.objects.filter(user_id=user_id)
    user_roles = company_memberships.values_list("role", flat=True).distinct()
    project_ids = Project.objects.filter(members=user_id).values_list("id", flat=True)
    obligations = (
        Obligation.objects.filter(
            responsibility__in=user_roles, project_id__in=project_ids
        )
        .select_related("project")
        .distinct()
    )
    return [obligation for obligation in obligations if obligation.is_overdue]
