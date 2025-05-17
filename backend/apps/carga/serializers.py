from rest_framework import serializers
from .models import Carga

class CargaSerializer(serializers.ModelSerializer):
    # Eliminar viaje_detail ya que la relación ahora va en el otro sentido
    
    class Meta:
        model = Carga
        fields = '__all__'
        extra_kwargs = {
            'created_at': {'read_only': True},
            'updated_at': {'read_only': True},
        }
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        # Calcular el valor total basado en peso y precio por tonelada
        representation['valor_total'] = float(instance.peso_toneladas) * float(instance.precio_por_tonelada)
        return representation