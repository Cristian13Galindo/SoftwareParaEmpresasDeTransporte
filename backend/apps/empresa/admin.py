from django.contrib import admin
from .models import Empresa

@admin.register(Empresa)
class EmpresaAdmin(admin.ModelAdmin):
    list_display = ['id_empresa', 'nombre', 'nit', 'telefono', 'correo']
    list_filter = ['created_at']
    search_fields = ['nombre', 'nit', 'correo']
    readonly_fields = ['created_at', 'updated_at']