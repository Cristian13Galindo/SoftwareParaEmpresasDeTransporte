from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ViajeViewSet

router = DefaultRouter()
router.register(r'viajes', ViajeViewSet, basename='viajes')

urlpatterns = [
    path('', include(router.urls)),
]
