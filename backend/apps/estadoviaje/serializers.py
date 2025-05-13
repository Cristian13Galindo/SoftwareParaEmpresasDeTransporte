from rest_framework import serializers
from .models import Estadoviaje
from apps.viaje.serializers import ViajeSerializer

class EstadoviajeSerializer(serializers.ModelSerializer):
    viaje_detail = ViajeSerializer(source='viaje', read_only=True)
    
    class Meta:
        model = Estadoviaje
        fields = '__all__'
        extra_kwargs = {
            'created_at': {'read_only': True},
            'updated_at': {'read_only': True},
            'fecha_cambio': {'read_only': True},  # Se actualiza automáticamente
        }
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.viaje:
            representation['viaje_origen'] = instance.viaje.origen
            representation['viaje_destino'] = instance.viaje.destino
        return representation