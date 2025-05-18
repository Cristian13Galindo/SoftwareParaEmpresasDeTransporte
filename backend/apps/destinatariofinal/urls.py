from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DestinatarioFinalViewSet  # Corregir a 'F' mayúscula

router = DefaultRouter()
router.register(r'destinatarios', DestinatarioFinalViewSet, basename='destinatarios')  # Corregir aquí también

urlpatterns = [
    path('', include(router.urls)),
]
