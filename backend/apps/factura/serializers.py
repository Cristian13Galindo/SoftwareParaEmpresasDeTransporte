from rest_framework import serializers
from .models import Factura
from apps.viaje.serializers import ViajeSerializer
from apps.cliente.serializers import ClienteSerializer

class FacturaSerializer(serializers.ModelSerializer):
    viaje_detail = ViajeSerializer(source='viaje', read_only=True)
    cliente_detail = ClienteSerializer(source='cliente', read_only=True)

    class Meta:
        model = Factura
        fields = '__all__'
        extra_kwargs = {
            'created_at': {'read_only': True},
            'updated_at': {'read_only': True},
        }

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['cliente_nombre'] = instance.cliente.nombre_empresa
        representation['viaje_origen_destino'] = f"{instance.viaje.origen} - {instance.viaje.destino}"
        return representation