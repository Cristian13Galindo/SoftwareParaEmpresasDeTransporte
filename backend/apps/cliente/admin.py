from django.contrib import admin
from .models import Cliente

@admin.register(Cliente)
class ClienteAdmin(admin.ModelAdmin):
    list_display = ['id_cliente', 'nombre', 'documento', 'telefono', 'correo']
    search_fields = ['nombre', 'documento', 'correo']
    readonly_fields = ['created_at', 'updated_at']