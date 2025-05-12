from django.contrib import admin
from .models import AuditoriaLoginusuarios

@admin.register(AuditoriaLoginusuarios)
class AuditoriaLoginusuariosAdmin(admin.ModelAdmin):
    list_display = ['id_login', 'usuario', 'fecha_hora_login', 'direccion_ip', 'exito_login']
    list_filter = ['exito_login', 'fecha_hora_login', 'usuario']
    search_fields = ['usuario__nombre', 'direccion_ip']
    readonly_fields = ['fecha_hora_login']