from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import VehiculoViewSet

router = DefaultRouter()
router.register(r'vehiculos', VehiculoViewSet, basename='vehiculos')

urlpatterns = [
    path('api/v1/', include(router.urls)),
]