from django.contrib import admin
from .models import EstadoViaje  # Corregir nombre de la clase (con V mayúscula)

@admin.register(EstadoViaje)  # Actualizar también aquí
class EstadoViajeAdmin(admin.ModelAdmin):
    list_display = ('id_estado', 'estado', 'created_at', 'updated_at')
    search_fields = ('estado',)