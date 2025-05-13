from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Destinatariofinal
from .serializers import DestinatariofinalSerializer

class DestinatariofinalViewSet(viewsets.ModelViewSet):
    queryset = Destinatariofinal.objects.all()
    serializer_class = DestinatariofinalSerializer
    permission_classes = [IsAuthenticated]
    
    # Filtros opcionales por carga o cliente
    def get_queryset(self):
        queryset = Destinatariofinal.objects.all()
        carga_id = self.request.query_params.get('carga', None)
        cliente_id = self.request.query_params.get('cliente', None)
        
        if carga_id is not None:
            queryset = queryset.filter(carga=carga_id)
        if cliente_id is not None:
            queryset = queryset.filter(cliente=cliente_id)
            
        return queryset