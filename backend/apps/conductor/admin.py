from django.contrib import admin
from .models import Conductor

@admin.register(Conductor)
class ConductorAdmin(admin.ModelAdmin):
    list_display = ['id_conductor', 'nombre', 'licencia', 'telefono', 'empresa']
    list_filter = ['empresa']
    search_fields = ['nombre', 'licencia', 'telefono']
    readonly_fields = ['created_at', 'updated_at']