from django.db import models
from apps.usuarios.models import Usuario

class Auditoria(models.Model):
    id_auditoria = models.AutoField(primary_key=True)
    accion = models.CharField(max_length=100)
    tabla_afectada = models.CharField(max_length=100)
    registro_id = models.IntegerField()
    valores_anteriores = models.TextField(blank=True, null=True)
    valores_nuevos = models.TextField(blank=True, null=True)
    fecha_hora = models.DateTimeField(auto_now_add=True)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='auditorias')
    
    class Meta:
        db_table = 'auditoria'
        verbose_name = 'Auditoría'
        verbose_name_plural = 'Auditorías'
    
    def __str__(self):
        return f"{self.accion} - {self.tabla_afectada} - {self.fecha_hora}"