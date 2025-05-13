from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Viaje
from .serializers import ViajeSerializer

class ViajeViewSet(viewsets.ModelViewSet):
    queryset = Viaje.objects.all()
    serializer_class = ViajeSerializer
    permission_classes = [IsAuthenticated]
    
    # Filtros opcionales
    def get_queryset(self):
        queryset = Viaje.objects.all()
        empresa_id = self.request.query_params.get('empresa', None)
        vehiculo_id = self.request.query_params.get('vehiculo', None)
        conductor_id = self.request.query_params.get('conductor', None)
        
        if empresa_id is not None:
            queryset = queryset.filter(empresa=empresa_id)
        if vehiculo_id is not None:
            queryset = queryset.filter(vehiculo=vehiculo_id)
        if conductor_id is not None:
            queryset = queryset.filter(conductor=conductor_id)
            
        return queryset