from rest_framework import serializers
from .models import Vehiculo
from apps.empresa.serializers import EmpresaSerializer
from apps.conductor.serializers import ConductorSerializer

class VehiculoSerializer(serializers.ModelSerializer):
    empresa_detail = EmpresaSerializer(source='empresa', read_only=True)
    conductor_detail = ConductorSerializer(source='conductor', read_only=True)
    
    class Meta:
        model = Vehiculo
        fields = '__all__'
        extra_kwargs = {
            'created_at': {'read_only': True},
            'updated_at': {'read_only': True},
        }
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        # Mostrar nombre de empresa en lugar de solo ID
        if instance.empresa:
            representation['empresa_nombre'] = instance.empresa.nombre
        # Mostrar nombre de conductor si existe
        if instance.conductor:
            representation['conductor_nombre'] = f"{instance.conductor.nombre} {instance.conductor.apellido}"
        return representation