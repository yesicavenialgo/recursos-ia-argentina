from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Course
from .serializers import CourseSerializer


class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = CourseSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        qs = Course.objects.filter(is_active=True)
        params = self.request.query_params
        if language := params.get('language'):
            qs = qs.filter(language=language)
        if level := params.get('level'):
            qs = qs.filter(level=level)
        if category := params.get('category'):
            qs = qs.filter(category=category)
        if search := params.get('search'):
            qs = qs.filter(title__icontains=search) | qs.filter(platform__icontains=search)
        ordering = params.get('ordering', '-created_at')
        if ordering in ['-created_at', 'created_at', 'title', '-title']:
            qs = qs.order_by(ordering)
        return qs

    @action(detail=False, methods=['get'])
    def filters(self, request):
        return Response({
            'languages': [{'value': v, 'label': l} for v, l in Course.LANGUAGE_CHOICES],
            'levels': [{'value': v, 'label': l} for v, l in Course.LEVEL_CHOICES],
            'categories': [{'value': v, 'label': l} for v, l in Course.CATEGORY_CHOICES],
        })
