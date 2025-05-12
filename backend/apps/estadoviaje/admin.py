from django.contrib import admin
from .models import Estadoviaje

@admin.register(Estadoviaje)
class EstadoviajeAdmin(admin.ModelAdmin):
    list_display = ['id_estado', 'nombre_estado', 'fecha_cambio', 'viaje']
    list_filter = ['nombre_estado', 'fecha_cambio', 'viaje']
    search_fields = ['nombre_estado', 'descripcion']
    readonly_fields = ['created_at', 'updated_at', 'fecha_cambio']