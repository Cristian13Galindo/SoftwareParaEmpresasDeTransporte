from django.contrib import admin
from .models import Usuario

@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
    list_display = ['id_usuario', 'nombre', 'rol', 'created_at']
    list_filter = ['rol']
    search_fields = ['nombre']
    readonly_fields = ['created_at', 'updated_at']