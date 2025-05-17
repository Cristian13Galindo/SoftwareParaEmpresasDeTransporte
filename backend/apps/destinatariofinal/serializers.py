from rest_framework import serializers
from .models import DestinatarioFinal  # Corregir nombre

class DestinatarioFinalSerializer(serializers.ModelSerializer):  # Corregir nombre
    # Eliminar referencias a carga_detail y cliente_detail
    
    class Meta:
        model = DestinatarioFinal  # Corregir nombre
        fields = '__all__'
        extra_kwargs = {
            'created_at': {'read_only': True},
            'updated_at': {'read_only': True},
        }