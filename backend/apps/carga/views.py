from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Carga
from .serializers import CargaSerializer

class CargaViewSet(viewsets.ModelViewSet):
    queryset = Carga.objects.all()
    serializer_class = CargaSerializer
    permission_classes = [IsAuthenticated]
    
    # Filtros opcionales por viaje
    def get_queryset(self):
        queryset = Carga.objects.all()
        viaje_id = self.request.query_params.get('viaje', None)
        if viaje_id is not None:
            queryset = queryset.filter(viaje=viaje_id)
        return queryset