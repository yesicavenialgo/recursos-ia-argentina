from rest_framework import generics, permissions
from .models import Submission
from .serializers import SubmissionSerializer


class SubmissionCreateView(generics.CreateAPIView):
    serializer_class = SubmissionSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        serializer.save(source='community')
