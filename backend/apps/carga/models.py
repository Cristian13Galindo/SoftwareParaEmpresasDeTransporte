from django.db import models
from apps.viaje.models import Viaje

class Carga(models.Model):
    id_carga = models.AutoField(primary_key=True)
    descripcion = models.CharField(max_length=255)
    peso_kg = models.DecimalField(max_digits=10, decimal_places=2)
    volumen_m3 = models.DecimalField(max_digits=10, decimal_places=2)
    tipo_carga = models.CharField(max_length=100)
    valor_declarado = models.DecimalField(max_digits=12, decimal_places=2)
    viaje = models.ForeignKey(Viaje, on_delete=models.CASCADE, related_name='cargas')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'carga'
        verbose_name = 'Carga'
        verbose_name_plural = 'Cargas'
    
    def __str__(self):
        return f"{self.descripcion} - {self.peso_kg}kg"