from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Conductor
from .serializers import ConductorSerializer

class ConductorViewSet(viewsets.ModelViewSet):
    queryset = Conductor.objects.all()
    serializer_class = ConductorSerializer
    permission_classes = [IsAuthenticated]
    
    # Filtros opcionales por empresa
    def get_queryset(self):
        queryset = Conductor.objects.all()
        empresa_id = self.request.query_params.get('empresa', None)
        if empresa_id is not None:
            queryset = queryset.filter(empresa=empresa_id)
        return queryset