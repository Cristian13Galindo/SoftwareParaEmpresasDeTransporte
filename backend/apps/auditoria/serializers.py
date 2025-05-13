from rest_framework import serializers
from .models import Auditoria
from apps.usuarios.serializers import UsuarioSerializer

class AuditoriaSerializer(serializers.ModelSerializer):
    usuario_detail = UsuarioSerializer(source='usuario', read_only=True)
    
    class Meta:
        model = Auditoria
        fields = '__all__'
        extra_kwargs = {
            'fecha_hora': {'read_only': True},  # Se actualiza automáticamente
        }
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.usuario:
            representation['usuario_nombre'] = instance.usuario.nombre
        return representation