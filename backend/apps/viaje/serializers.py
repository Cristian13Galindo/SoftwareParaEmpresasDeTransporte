from rest_framework import serializers
from .models import Viaje
from apps.empresa.serializers import EmpresaSerializer
from apps.vehiculo.serializers import VehiculoSerializer
from apps.conductor.serializers import ConductorSerializer

class ViajeSerializer(serializers.ModelSerializer):
    empresa_detail = EmpresaSerializer(source='empresa', read_only=True)
    vehiculo_detail = VehiculoSerializer(source='vehiculo', read_only=True)
    conductor_detail = ConductorSerializer(source='conductor', read_only=True)
    
    class Meta:
        model = Viaje
        fields = '__all__'
        extra_kwargs = {
            'created_at': {'read_only': True},
            'updated_at': {'read_only': True},
        }
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.empresa:
            representation['empresa_nombre'] = instance.empresa.nombre
        if instance.vehiculo:
            representation['vehiculo_placa'] = instance.vehiculo.placa
        if instance.conductor:
            representation['conductor_nombre'] = instance.conductor.nombre
        return representation