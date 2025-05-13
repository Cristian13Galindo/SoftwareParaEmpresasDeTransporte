from rest_framework import serializers
from .models import AuditoriaLoginusuarios
from apps.usuarios.serializers import UsuarioSerializer

class AuditoriaLoginusuariosSerializer(serializers.ModelSerializer):
    usuario_detail = UsuarioSerializer(source='usuario', read_only=True)
    
    class Meta:
        model = AuditoriaLoginusuarios
        fields = '__all__'
        extra_kwargs = {
            'fecha_hora_login': {'read_only': True},  # Se actualiza automáticamente
        }
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.usuario:
            representation['usuario_nombre'] = instance.usuario.nombre
        return representation