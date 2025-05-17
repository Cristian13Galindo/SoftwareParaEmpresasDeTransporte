from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import EstadoViaje
from .serializers import EstadoViajeSerializer

class EstadoViajeViewSet(viewsets.ModelViewSet):
    queryset = EstadoViaje.objects.all()
    serializer_class = EstadoViajeSerializer
    permission_classes = [IsAuthenticated]
    
    # Simplificar filtros ya que no tenemos la relación con viaje
    def get_queryset(self):
        queryset = EstadoViaje.objects.all()
        estado = self.request.query_params.get('estado', None)
        
        if estado is not None:
            queryset = queryset.filter(estado__icontains=estado)
            
        return queryset