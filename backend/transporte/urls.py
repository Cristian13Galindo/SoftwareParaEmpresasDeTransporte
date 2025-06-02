"""
URL configuration for transporte project.
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

@api_view(['GET'])
@permission_classes([AllowAny])
def api_status(request):
    return Response({"status": "ok", "message": "API is running"})

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # API endpoints accesibles sin autenticación
    path('api/status/', api_status, name='api_status'),
    
    # Rutas de la API con prefijos únicos
    path('api/usuarios/', include('apps.usuarios.urls')),
    path('api/empresa/', include('apps.empresa.urls')),
    path('api/vehiculo/', include('apps.vehiculo.urls')),
    path('api/conductor/', include('apps.conductor.urls')),
    path('api/viaje/', include('apps.viaje.urls')),
    path('api/carga/', include('apps.carga.urls')),
    path('api/cliente/', include('apps.cliente.urls')),
    path('api/destinatariofinal/', include('apps.destinatariofinal.urls')),
    path('api/estadoviaje/', include('apps.estadoviaje.urls')),
    path('api/factura/', include('apps.factura.urls')),
    path('api/auditoria/', include('apps.auditoria.urls')),
    path('api/auditoria_loginusuarios/', include('apps.auditoria_loginusuarios.urls')),
    
    # Endpoints para autenticación
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
