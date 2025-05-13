from rest_framework import serializers
from .models import Conductor
from apps.empresa.serializers import EmpresaSerializer
from apps.usuarios.serializers import UsuarioSerializer

class ConductorSerializer(serializers.ModelSerializer):
    empresa_detail = EmpresaSerializer(source='empresa', read_only=True)
    usuario_detail = UsuarioSerializer(source='usuario', read_only=True)
    
    class Meta:
        model = Conductor
        fields = '__all__'
        extra_kwargs = {
            'created_at': {'read_only': True},
            'updated_at': {'read_only': True},
        }
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.empresa:
            representation['empresa_nombre'] = instance.empresa.nombre
        if instance.usuario:
            representation['usuario_nombre'] = instance.usuario.nombre
        return representation