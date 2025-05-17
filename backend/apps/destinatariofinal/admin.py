from django.contrib import admin
from .models import DestinatarioFinal  # Corregir nombre

@admin.register(DestinatarioFinal)  # Corregir nombre
class DestinatarioFinalAdmin(admin.ModelAdmin):  # Corregir nombre
    list_display = ['id_destinatario', 'nombre_empresa', 'direccion', 'telefono']  # Actualizar campos
    search_fields = ['nombre_empresa', 'telefono']  # Actualizar campos
    readonly_fields = ['created_at', 'updated_at']