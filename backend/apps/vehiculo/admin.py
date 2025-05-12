from django.contrib import admin
from .models import Vehiculo

@admin.register(Vehiculo)
class VehiculoAdmin(admin.ModelAdmin):
    list_display = ['id_vehiculo', 'placa', 'marca', 'modelo', 'capacidad_maxima_toneladas', 'estado', 'empresa']
    list_filter = ['marca', 'estado', 'empresa']
    search_fields = ['placa', 'marca', 'modelo']
    readonly_fields = ['created_at', 'updated_at']