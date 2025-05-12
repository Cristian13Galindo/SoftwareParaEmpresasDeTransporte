from rest_framework import serializers
from .models import Usuario

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'
        extra_kwargs = {
            'contrasena': {'write_only': True}  # Ocultar contraseña en responses
        }
    
    def create(self, validated_data):
        # Encriptar contraseña si decides hacerlo
        return Usuario.objects.create(**validated_data)