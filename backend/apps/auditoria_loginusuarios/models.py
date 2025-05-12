from django.db import models
from apps.usuarios.models import Usuario

class AuditoriaLoginusuarios(models.Model):
    id_login = models.AutoField(primary_key=True)
    fecha_hora_login = models.DateTimeField(auto_now_add=True)
    fecha_hora_logout = models.DateTimeField(blank=True, null=True)
    direccion_ip = models.GenericIPAddressField()
    navegador = models.CharField(max_length=255)
    sistema_operativo = models.CharField(max_length=100)
    exito_login = models.BooleanField(default=True)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='logins')
    
    class Meta:
        db_table = 'auditoria_loginusuarios'
        verbose_name = 'Auditoría de Login'
        verbose_name_plural = 'Auditorías de Logins'
    
    def __str__(self):
        return f"{self.usuario.nombre} - {self.fecha_hora_login}"