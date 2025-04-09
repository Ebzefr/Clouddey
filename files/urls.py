
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClouddeyFileViewSet, ClouddeyFolderViewSet, SharedItemViewSet

router = DefaultRouter()
router.register(r'files', ClouddeyFileViewSet, basename='file')
router.register(r'folders', ClouddeyFolderViewSet, basename='folder')
router.register(r'shared', SharedItemViewSet, basename='shared')

urlpatterns = [
    path('', include(router.urls)),
]

# core/urls.py (main project)
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('files.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)