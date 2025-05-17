from django.contrib import admin
from .models import Conductor

@admin.register(Conductor)
class ConductorAdmin(admin.ModelAdmin):
    list_display = ['id_conductor', 'nombre', 'apellido', 'cedula', 'licencia_conduccion', 'fecha_vencimiento_licencia', 'telefono']
    list_filter = ['fecha_vencimiento_licencia']
    search_fields = ['nombre', 'apellido', 'cedula', 'licencia_conduccion', 'telefono']
    readonly_fields = ['created_at', 'updated_at']