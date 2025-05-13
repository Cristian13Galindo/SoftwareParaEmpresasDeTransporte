from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Estadoviaje
from .serializers import EstadoviajeSerializer

class EstadoviajeViewSet(viewsets.ModelViewSet):
    queryset = Estadoviaje.objects.all()
    serializer_class = EstadoviajeSerializer
    permission_classes = [IsAuthenticated]
    
    # Filtros opcionales por viaje o estado
    def get_queryset(self):
        queryset = Estadoviaje.objects.all()
        viaje_id = self.request.query_params.get('viaje', None)
        estado = self.request.query_params.get('estado', None)
        
        if viaje_id is not None:
            queryset = queryset.filter(viaje=viaje_id)
        if estado is not None:
            queryset = queryset.filter(nombre_estado__icontains=estado)
            
        return queryset.order_by('-fecha_cambio')  # Más recientes primero