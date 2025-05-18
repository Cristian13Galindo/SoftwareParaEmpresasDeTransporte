from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EstadoViajeViewSet

router = DefaultRouter()
router.register(r'estados-viaje', EstadoViajeViewSet, basename='estados-viaje')

urlpatterns = [
    path('', include(router.urls)),
]
