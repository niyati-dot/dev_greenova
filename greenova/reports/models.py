"""
models.py for the reports app in Greenova.
Stub for future extensibility.
"""

from django.db import models


class Report(models.Model):
    """Stub model for reports."""

    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Report"
        verbose_name_plural = "Reports"

    def __str__(self):
        return self.name
