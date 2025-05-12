from django.contrib import admin
from .models import Destinatariofinal

@admin.register(Destinatariofinal)
class DestinatariofinalAdmin(admin.ModelAdmin):
    list_display = ['id_destinatario', 'nombre', 'documento', 'telefono', 'carga', 'cliente']
    list_filter = ['cliente', 'carga']
    search_fields = ['nombre', 'documento', 'correo']
    readonly_fields = ['created_at', 'updated_at']