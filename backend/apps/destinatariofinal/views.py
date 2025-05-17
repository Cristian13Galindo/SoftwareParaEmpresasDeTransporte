from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import DestinatarioFinal  # Corregir nombre
from .serializers import DestinatarioFinalSerializer  # Corregir nombre

class DestinatarioFinalViewSet(viewsets.ModelViewSet):  # Corregir nombre si es necesario
    queryset = DestinatarioFinal.objects.all()  # Corregir nombre
    serializer_class = DestinatarioFinalSerializer  # Corregir nombre
    permission_classes = [IsAuthenticated]