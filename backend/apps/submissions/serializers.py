from rest_framework import serializers
from .models import Submission


class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = [
            'id', 'title', 'platform', 'url', 'description',
            'language', 'level', 'category', 'status', 'submitted_at',
        ]
        read_only_fields = ['status', 'submitted_at']


class SubmissionAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = '__all__'
