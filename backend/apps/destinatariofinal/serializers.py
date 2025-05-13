from rest_framework import serializers
from .models import Destinatariofinal
from apps.carga.serializers import CargaSerializer
from apps.cliente.serializers import ClienteSerializer

class DestinatariofinalSerializer(serializers.ModelSerializer):
    carga_detail = CargaSerializer(source='carga', read_only=True)
    cliente_detail = ClienteSerializer(source='cliente', read_only=True)
    
    class Meta:
        model = Destinatariofinal
        fields = '__all__'
        extra_kwargs = {
            'created_at': {'read_only': True},
            'updated_at': {'read_only': True},
        }
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.carga:
            representation['carga_descripcion'] = instance.carga.descripcion
        if instance.cliente:
            representation['cliente_nombre'] = instance.cliente.nombre
        return representation