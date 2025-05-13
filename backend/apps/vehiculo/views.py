from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Vehiculo
from .serializers import VehiculoSerializer

class VehiculoViewSet(viewsets.ModelViewSet):
    queryset = Vehiculo.objects.all()
    serializer_class = VehiculoSerializer
    permission_classes = [IsAuthenticated]
    
    # Filtros opcionales por empresa
    def get_queryset(self):
        queryset = Vehiculo.objects.all()
        empresa_id = self.request.query_params.get('empresa', None)
        if empresa_id is not None:
            queryset = queryset.filter(empresa=empresa_id)
        return queryset