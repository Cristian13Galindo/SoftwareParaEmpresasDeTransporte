from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AuditoriaViewSet

router = DefaultRouter()
router.register(r'auditorias', AuditoriaViewSet, basename='auditorias')

urlpatterns = [
    path('api/v1/', include(router.urls)),
]