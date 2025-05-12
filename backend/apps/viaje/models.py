from django.db import models
from apps.empresa.models import Empresa
from apps.vehiculo.models import Vehiculo
from apps.conductor.models import Conductor

class Viaje(models.Model):
    id_viaje = models.AutoField(primary_key=True)
    fecha = models.DateField()
    origen = models.CharField(max_length=200)
    destino = models.CharField(max_length=200)
    distancia_km = models.DecimalField(max_digits=10, decimal_places=2)
    tiempo_estimado_horas = models.DecimalField(max_digits=5, decimal_places=2)
    costo_total = models.DecimalField(max_digits=12, decimal_places=2)
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE, related_name='viajes')
    vehiculo = models.ForeignKey(Vehiculo, on_delete=models.CASCADE, related_name='viajes')
    conductor = models.ForeignKey(Conductor, on_delete=models.CASCADE, related_name='viajes')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'viaje'
        verbose_name = 'Viaje'
        verbose_name_plural = 'Viajes'
    
    def __str__(self):
        return f"{self.origen} → {self.destino} ({self.fecha})"