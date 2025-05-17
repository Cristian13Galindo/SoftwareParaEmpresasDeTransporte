from django.contrib import admin
from .models import Cliente

@admin.register(Cliente)
class ClienteAdmin(admin.ModelAdmin):
    list_display = ['id_cliente', 'nombre_empresa', 'nit', 'contacto', 'telefono']
    search_fields = ['nombre_empresa', 'nit', 'contacto']
    readonly_fields = ['created_at', 'updated_at']