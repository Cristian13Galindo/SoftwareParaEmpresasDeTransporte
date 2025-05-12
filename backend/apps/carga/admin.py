from django.contrib import admin
from .models import Carga

@admin.register(Carga)
class CargaAdmin(admin.ModelAdmin):
    list_display = ['id_carga', 'descripcion', 'peso_kg', 'volumen_m3', 'tipo_carga', 'valor_declarado', 'viaje']
    list_filter = ['tipo_carga', 'viaje']
    search_fields = ['descripcion', 'tipo_carga']
    readonly_fields = ['created_at', 'updated_at']