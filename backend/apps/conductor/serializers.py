from rest_framework import serializers
from .models import Conductor

class ConductorSerializer(serializers.ModelSerializer):
    # Eliminadas las referencias a empresa y usuario
    
    class Meta:
        model = Conductor
        fields = '__all__'
        extra_kwargs = {
            'created_at': {'read_only': True},
            'updated_at': {'read_only': True},
        }
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        # Crear un nombre completo para facilitar la visualización
        representation['nombre_completo'] = f"{instance.nombre} {instance.apellido}"
        return representation