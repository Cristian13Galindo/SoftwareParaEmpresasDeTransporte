from django.contrib import admin
from .models import Viaje

@admin.register(Viaje)
class ViajeAdmin(admin.ModelAdmin):
    list_display = ['id_viaje', 'fecha_salida', 'origen', 'destino', 'distancia_km', 'costo_total', 'id_vehiculo']
    list_filter = ['fecha_salida', 'id_vehiculo', 'id_cliente', 'id_estado']
    search_fields = ['origen', 'destino']
    readonly_fields = ['created_at', 'updated_at']