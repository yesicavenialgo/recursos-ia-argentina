from rest_framework import serializers
from .models import Course


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = [
            'id', 'title', 'platform', 'url', 'description',
            'language', 'level', 'category', 'duration_hours',
            'source', 'created_at',
        ]
