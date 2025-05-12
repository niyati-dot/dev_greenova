"""Type stubs for company template tags."""

from typing import Any

def get_user_companies(user_id: int) -> list[dict[str, Any]]:
    """Get all companies a user belongs to.

    Args:
        user_id: The ID of the user

    Returns:
        A list of company dictionaries
    """
    ...

def get_user_primary_company(user_id: int) -> dict[str, Any] | None:
    """Get a user's primary company.

    Args:
        user_id: The ID of the user

    Returns:
        The primary company dictionary or None
    """
    ...

def format_company_name(company: Any) -> str:
    """Format a company name for display.

    Args:
        company: A company object

    Returns:
        A formatted company name
    """
    ...
