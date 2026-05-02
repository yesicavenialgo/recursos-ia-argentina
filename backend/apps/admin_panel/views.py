from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.utils import timezone
from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from apps.courses.models import Course
from apps.courses.serializers import CourseSerializer
from apps.submissions.models import Submission
from apps.submissions.serializers import SubmissionAdminSerializer


class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_staff


class AdminLoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        user = authenticate(username=request.data.get('email'), password=request.data.get('password'))
        if not user or not user.is_staff:
            return Response({'detail': 'Acceso denegado.'}, status=status.HTTP_401_UNAUTHORIZED)
        refresh = RefreshToken.for_user(user)
        return Response({'access': str(refresh.access_token), 'refresh': str(refresh)})


class AdminCourseViewSet(viewsets.ModelViewSet):
    serializer_class = CourseSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return Course.objects.all()


class AdminSubmissionViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = SubmissionAdminSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        qs = Submission.objects.all()
        if source := self.request.query_params.get('source'):
            qs = qs.filter(source=source)
        if status_filter := self.request.query_params.get('status'):
            qs = qs.filter(status=status_filter)
        return qs

    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        submission = self.get_object()
        Course.objects.create(
            title=submission.title,
            platform=submission.platform,
            url=submission.url,
            description=submission.description,
            language=submission.language,
            level=submission.level,
            category=submission.category,
            source='community',
        )
        submission.status = 'approved'
        submission.reviewed_at = timezone.now()
        submission.admin_note = request.data.get('admin_note', '')
        submission.save()
        return Response({'detail': 'Curso aprobado y publicado.'})

    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        submission = self.get_object()
        submission.status = 'rejected'
        submission.reviewed_at = timezone.now()
        submission.admin_note = request.data.get('admin_note', '')
        submission.save()
        return Response({'detail': 'Envío rechazado.'})
