from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AuditoriaLoginusuariosViewSet

router = DefaultRouter()
router.register(r'auditorias-login', AuditoriaLoginusuariosViewSet, basename='auditorias-login')

urlpatterns = [
    path('api/v1/', include(router.urls)),
]