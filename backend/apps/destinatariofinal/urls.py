from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DestinatariofinalViewSet

router = DefaultRouter()
router.register(r'destinatarios', DestinatariofinalViewSet, basename='destinatarios')

urlpatterns = [
    path('api/v1/', include(router.urls)),
]