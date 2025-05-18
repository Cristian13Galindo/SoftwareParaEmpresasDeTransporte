from rest_framework import serializers
from .models import Viaje
from apps.vehiculo.serializers import VehiculoSerializer
from apps.carga.serializers import CargaSerializer
from apps.cliente.serializers import ClienteSerializer
from apps.destinatariofinal.serializers import DestinatarioFinalSerializer
from apps.estadoviaje.serializers import EstadoViajeSerializer

class ViajeSerializer(serializers.ModelSerializer):
    vehiculo_detail = VehiculoSerializer(source='id_vehiculo', read_only=True)
    carga_detail = CargaSerializer(source='id_carga', read_only=True)
    cliente_detail = ClienteSerializer(source='id_cliente', read_only=True)
    destinatario_detail = DestinatarioFinalSerializer(source='id_destinatario', read_only=True)      
    estado_detail = EstadoViajeSerializer(source='id_estado', read_only=True)

    class Meta:
        model = Viaje
        fields = '__all__'
        extra_kwargs = {
            'created_at': {'read_only': True},
            'updated_at': {'read_only': True},
        }

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        # Información adicional para la visualización
        representation['vehiculo_placa'] = instance.id_vehiculo.placa
        representation['cliente_nombre'] = instance.id_cliente.nombre_empresa
        representation['destinatario_nombre'] = instance.id_destinatario.nombre_empresa
        representation['estado_nombre'] = instance.id_estado.estado
        # Duración estimada del viaje (en horas)
        if instance.fecha_llegada and instance.fecha_salida:
            duracion = instance.fecha_llegada - instance.fecha_salida
            representation['duracion_horas'] = duracion.total_seconds() / 3600
        return representation