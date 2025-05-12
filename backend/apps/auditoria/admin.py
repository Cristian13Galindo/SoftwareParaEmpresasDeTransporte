from django.contrib import admin
from .models import Auditoria

@admin.register(Auditoria)
class AuditoriaAdmin(admin.ModelAdmin):
    list_display = ['id_auditoria', 'accion', 'tabla_afectada', 'usuario', 'fecha_hora']
    list_filter = ['accion', 'tabla_afectada', 'fecha_hora']
    search_fields = ['accion', 'tabla_afectada', 'usuario__nombre']
    readonly_fields = ['fecha_hora']