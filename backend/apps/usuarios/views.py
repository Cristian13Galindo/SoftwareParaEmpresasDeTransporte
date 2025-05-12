from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from .models import Usuario
from .serializers import UsuarioSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [IsAuthenticated]
    
    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def register(self, request):
        """Crear usuario con cuenta de Django asociada"""
        data = request.data
        
        # Crear user de Django para auth
        django_user = User.objects.create_user(
            username=data.get('nombre'),
            password=data.get('contrasena')
        )
        
        # Crear usuario de negocio
        usuario = Usuario.objects.create(
            nombre=data.get('nombre'),
            contrasena=data.get('contrasena'),  # En producción, encriptar
            rol=data.get('rol')
        )
        
        return Response({
            'message': 'Usuario creado exitosamente',
            'usuario_id': usuario.id_usuario,
            'django_user_id': django_user.id
        }, status=status.HTTP_201_CREATED)