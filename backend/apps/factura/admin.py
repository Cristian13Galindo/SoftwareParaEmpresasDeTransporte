from django.contrib import admin
from .models import Factura

@admin.register(Factura)
class FacturaAdmin(admin.ModelAdmin):
    list_display = ['id_factura', 'numero_factura', 'fecha_emision', 'total', 'estado_pago', 'cliente']
    list_filter = ['estado_pago', 'fecha_emision', 'cliente']
    search_fields = ['numero_factura', 'cliente__nombre']
    readonly_fields = ['created_at', 'updated_at']