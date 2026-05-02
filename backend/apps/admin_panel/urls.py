from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import AdminLoginView, AdminCourseViewSet, AdminSubmissionViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'courses', AdminCourseViewSet, basename='admin-course')
router.register(r'submissions', AdminSubmissionViewSet, basename='admin-submission')

urlpatterns = [
    path('auth/login/', AdminLoginView.as_view(), name='admin-login'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='admin-token-refresh'),
] + router.urls
