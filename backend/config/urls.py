from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('django-admin/', admin.site.urls),
    path('api/courses/', include('apps.courses.urls')),
    path('api/submissions/', include('apps.submissions.urls')),
    path('api/admin/', include('apps.admin_panel.urls')),
]
