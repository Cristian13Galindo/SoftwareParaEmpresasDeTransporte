from rest_framework import serializers
from .models import Factura
from apps.cliente.serializers import ClienteSerializer
from apps.viaje.serializers import ViajeSerializer

class FacturaSerializer(serializers.ModelSerializer):
    cliente_detail = ClienteSerializer(source='cliente', read_only=True)
    viaje_detail = ViajeSerializer(source='viaje', read_only=True)
    
    class Meta:
        model = Factura
        fields = '__all__'
        extra_kwargs = {
            'created_at': {'read_only': True},
            'updated_at': {'read_only': True},
        }
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.cliente:
            representation['cliente_nombre'] = instance.cliente.nombre
        if instance.viaje:
            representation['viaje_origen'] = instance.viaje.origen
            representation['viaje_destino'] = instance.viaje.destino
        return representation