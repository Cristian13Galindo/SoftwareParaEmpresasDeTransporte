from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Factura
from .serializers import FacturaSerializer

class FacturaViewSet(viewsets.ModelViewSet):
    queryset = Factura.objects.all()
    serializer_class = FacturaSerializer
    permission_classes = [IsAuthenticated]
    
    # Filtros opcionales por cliente o estado de pago
    def get_queryset(self):
        queryset = Factura.objects.all()
        cliente_id = self.request.query_params.get('cliente', None)
        estado_pago = self.request.query_params.get('estado_pago', None)
        
        if cliente_id is not None:
            queryset = queryset.filter(cliente=cliente_id)
        if estado_pago is not None:
            queryset = queryset.filter(estado_pago__icontains=estado_pago)
            
        return queryset.order_by('-fecha_emision')  # Más recientes primero