from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import AuditoriaLoginusuarios
from .serializers import AuditoriaLoginusuariosSerializer

class AuditoriaLoginusuariosViewSet(viewsets.ModelViewSet):
    queryset = AuditoriaLoginusuarios.objects.all()
    serializer_class = AuditoriaLoginusuariosSerializer
    permission_classes = [IsAuthenticated]
    
    # Filtros opcionales por usuario o éxito del login
    def get_queryset(self):
        queryset = AuditoriaLoginusuarios.objects.all()
        usuario_id = self.request.query_params.get('usuario', None)
        exito = self.request.query_params.get('exito', None)
        
        if usuario_id is not None:
            queryset = queryset.filter(usuario=usuario_id)
        if exito is not None:
            queryset = queryset.filter(exito_login=(exito.lower() == 'true'))
            
        return queryset.order_by('-fecha_hora_login')  # Más recientes primero