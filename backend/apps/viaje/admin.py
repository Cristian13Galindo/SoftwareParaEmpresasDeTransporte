from django.contrib import admin
from .models import Viaje

@admin.register(Viaje)
class ViajeAdmin(admin.ModelAdmin):
    list_display = ['id_viaje', 'fecha', 'origen', 'destino', 'distancia_km', 'costo_total', 'empresa']
    list_filter = ['fecha', 'empresa', 'vehiculo', 'conductor']
    search_fields = ['origen', 'destino']
    readonly_fields = ['created_at', 'updated_at']