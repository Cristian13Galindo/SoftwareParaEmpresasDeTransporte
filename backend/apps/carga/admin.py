from django.contrib import admin
from .models import Carga

@admin.register(Carga)
class CargaAdmin(admin.ModelAdmin):
    list_display = ['id_carga', 'tipo_carga', 'peso_toneladas', 'descripcion', 'precio_por_tonelada']
    list_filter = ['tipo_carga']
    search_fields = ['tipo_carga', 'descripcion']
    readonly_fields = ['created_at', 'updated_at']