from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ConductorViewSet

router = DefaultRouter()
router.register(r'conductores', ConductorViewSet, basename='conductores')

urlpatterns = [
    path('api/v1/', include(router.urls)),
]