from rest_framework import serializers
from .models import Submission
from apps.courses.models import Course

VALID_LANGUAGES = [v for v, _ in Course.LANGUAGE_CHOICES]
VALID_LEVELS = [v for v, _ in Course.LEVEL_CHOICES]
VALID_CATEGORIES = [v for v, _ in Course.CATEGORY_CHOICES]


class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = [
            'id', 'title', 'platform', 'url', 'description',
            'language', 'level', 'category', 'status', 'submitted_at',
        ]
        read_only_fields = ['status', 'submitted_at']

    def validate_language(self, value):
        if value not in VALID_LANGUAGES:
            raise serializers.ValidationError(f'Idioma inválido. Opciones: {VALID_LANGUAGES}')
        return value

    def validate_level(self, value):
        if value not in VALID_LEVELS:
            raise serializers.ValidationError(f'Nivel inválido. Opciones: {VALID_LEVELS}')
        return value

    def validate_category(self, value):
        if value not in VALID_CATEGORIES:
            raise serializers.ValidationError(f'Categoría inválida. Opciones: {VALID_CATEGORIES}')
        return value


class SubmissionAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = [
            'id', 'title', 'platform', 'url', 'description',
            'language', 'level', 'category', 'status',
            'admin_note', 'source', 'submitted_at', 'reviewed_at',
        ]
