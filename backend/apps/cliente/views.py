from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Cliente
from .serializers import ClienteSerializer

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    permission_classes = [IsAuthenticated]
    
    # Búsqueda por nombre o documento
    def get_queryset(self):
        queryset = Cliente.objects.all()
        search = self.request.query_params.get('search', None)
        if search is not None:
            queryset = queryset.filter(
                models.Q(nombre__icontains=search) |
                models.Q(documento__icontains=search)
            )
        return queryset