from rest_framework import serializers
from .models import EstadoViaje

class EstadoViajeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoViaje
        fields = '__all__'
        extra_kwargs = {
            'created_at': {'read_only': True},
            'updated_at': {'read_only': True},
        }