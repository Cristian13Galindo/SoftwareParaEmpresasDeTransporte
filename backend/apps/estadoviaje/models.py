from django.db import models

class EstadoViaje(models.Model):
    id_estado = models.AutoField(primary_key=True)
    estado = models.CharField(max_length=50)  # Cambiado desde nombre_estado
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'estadoviaje'
        verbose_name = 'Estado de Viaje'
        verbose_name_plural = 'Estados de Viaje'
    
    def __str__(self):
        return self.estado