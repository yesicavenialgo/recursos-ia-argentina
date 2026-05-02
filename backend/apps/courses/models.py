from django.db import models


class Course(models.Model):
    LANGUAGE_CHOICES = [('es', 'Español'), ('en', 'Inglés')]
    LEVEL_CHOICES = [
        ('beginner', 'Principiante'),
        ('intermediate', 'Intermedio'),
        ('advanced', 'Avanzado'),
    ]
    CATEGORY_CHOICES = [
        ('use_ai', 'Usar IA'),
        ('code_with_ai', 'Programar con IA'),
        ('ml_fundamentals', 'Fundamentos de ML'),
        ('deep_learning', 'Deep Learning'),
        ('data_science', 'Ciencia de datos'),
        ('ai_tools', 'Herramientas de IA'),
        ('agents', 'Agentes y automatización'),
        ('ethics_ai', 'Ética en IA'),
    ]
    SOURCE_CHOICES = [('admin', 'Admin'), ('community', 'Comunidad')]

    title = models.CharField(max_length=200)
    platform = models.CharField(max_length=100)
    url = models.URLField(unique=True)
    description = models.TextField(max_length=500)
    language = models.CharField(max_length=2, choices=LANGUAGE_CHOICES)
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    duration_hours = models.FloatField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    source = models.CharField(max_length=20, choices=SOURCE_CHOICES, default='admin')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} ({self.platform})"
