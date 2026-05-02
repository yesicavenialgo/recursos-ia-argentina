from django.db import models


class Submission(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pendiente'),
        ('approved', 'Aprobado'),
        ('rejected', 'Rechazado'),
    ]
    SOURCE_CHOICES = [
        ('community', 'Comunidad'),
        ('scraper', 'Scraper'),
    ]

    title = models.CharField(max_length=200)
    platform = models.CharField(max_length=100)
    url = models.URLField()
    description = models.TextField(max_length=200)
    language = models.CharField(max_length=2)
    level = models.CharField(max_length=20)
    category = models.CharField(max_length=50)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    admin_note = models.TextField(null=True, blank=True)
    source = models.CharField(max_length=20, choices=SOURCE_CHOICES, default='community')
    submitted_at = models.DateTimeField(auto_now_add=True)
    reviewed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['-submitted_at']

    def __str__(self):
        return f"{self.title} [{self.status}]"
