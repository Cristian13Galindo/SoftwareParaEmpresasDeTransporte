from django.db import models
from apps.viaje.models import Viaje

class Estadoviaje(models.Model):
    id_estado = models.AutoField(primary_key=True)
    nombre_estado = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=255)
    fecha_cambio = models.DateTimeField(auto_now=True)
    observaciones = models.TextField(blank=True, null=True)
    viaje = models.ForeignKey(Viaje, on_delete=models.CASCADE, related_name='estados')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'estadoviaje'
        verbose_name = 'Estado de Viaje'
        verbose_name_plural = 'Estados de Viajes'
    
    def __str__(self):
        return f"{self.viaje} - {self.nombre_estado}"