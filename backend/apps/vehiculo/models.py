from django.db import models
from apps.empresa.models import Empresa

class Vehiculo(models.Model):
    id_vehiculo = models.AutoField(primary_key=True)
    placa = models.CharField(max_length=15, unique=True)
    marca = models.CharField(max_length=100)
    modelo = models.CharField(max_length=100)
    capacidad_maxima_toneladas = models.DecimalField(max_digits=10, decimal_places=2)
    estado = models.CharField(max_length=50)
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE, related_name='vehiculos')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'vehiculo'
        verbose_name = 'Vehículo'
        verbose_name_plural = 'Vehículos'
    
    def __str__(self):
        return f"{self.placa} - {self.marca} {self.modelo}"