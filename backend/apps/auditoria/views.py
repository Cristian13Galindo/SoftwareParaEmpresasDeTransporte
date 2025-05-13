from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Auditoria
from .serializers import AuditoriaSerializer

class AuditoriaViewSet(viewsets.ModelViewSet):
    queryset = Auditoria.objects.all()
    serializer_class = AuditoriaSerializer
    permission_classes = [IsAuthenticated]
    
    # Filtros opcionales por acción o tabla
    def get_queryset(self):
        queryset = Auditoria.objects.all()
        accion = self.request.query_params.get('accion', None)
        tabla = self.request.query_params.get('tabla', None)
        usuario_id = self.request.query_params.get('usuario', None)
        
        if accion is not None:
            queryset = queryset.filter(accion__icontains=accion)
        if tabla is not None:
            queryset = queryset.filter(tabla_afectada__icontains=tabla)
        if usuario_id is not None:
            queryset = queryset.filter(usuario=usuario_id)
            
        return queryset.order_by('-fecha_hora')  # Más recientes primero