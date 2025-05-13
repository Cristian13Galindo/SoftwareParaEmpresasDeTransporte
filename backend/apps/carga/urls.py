from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CargaViewSet

router = DefaultRouter()
router.register(r'cargas', CargaViewSet, basename='cargas')

urlpatterns = [
    path('api/v1/', include(router.urls)),
]