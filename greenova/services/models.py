from django.db import models

class Service(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('inactive', 'Inactive'),
        ('error', 'Error')
    ]

    name = models.CharField(max_length=255)
    description = models.TextField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='inactive')
    last_check = models.DateTimeField(auto_now=True)
    config = models.JSONField(default=dict)

    def __str__(self):
        return self.name

class ServiceLog(models.Model):
    service = models.ForeignKey(
        Service,
        on_delete=models.CASCADE,
        related_name='service_logs'
    )
    timestamp = models.DateTimeField(auto_now_add=True)
    message = models.TextField()
    level = models.CharField(max_length=20)
    status = models.CharField(max_length=50, blank=True)
    details = models.JSONField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']
