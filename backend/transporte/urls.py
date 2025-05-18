"""
URL configuration for transporte project.
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

@api_view(['GET'])
@permission_classes([AllowAny])
def api_status(request):
    return Response({"status": "ok", "message": "API is running"})

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # API endpoints accesibles sin autenticación
    path('api/status/', api_status, name='api_status'),
    
    # Rutas de la API
    path('api/', include('apps.usuarios.urls')),
    path('api/', include('apps.empresa.urls')),
    path('api/', include('apps.vehiculo.urls')),
    path('api/', include('apps.conductor.urls')),
    path('api/', include('apps.viaje.urls')),
    path('api/', include('apps.carga.urls')),
    path('api/', include('apps.cliente.urls')),
    path('api/', include('apps.destinatariofinal.urls')),
    path('api/', include('apps.estadoviaje.urls')),
    path('api/', include('apps.factura.urls')),
    path('api/', include('apps.auditoria.urls')),
    path('api/', include('apps.auditoria_loginusuarios.urls')),
]
