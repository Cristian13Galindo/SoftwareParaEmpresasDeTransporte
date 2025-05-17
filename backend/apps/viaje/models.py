from django.db import models
from apps.vehiculo.models import Vehiculo
from apps.carga.models import Carga
from apps.cliente.models import Cliente
from apps.destinatariofinal.models import DestinatarioFinal

class Viaje(models.Model):
    id_viaje = models.AutoField(primary_key=True)
    fecha_salida = models.DateTimeField()
    fecha_llegada = models.DateTimeField()
    origen = models.CharField(max_length=200)
    destino = models.CharField(max_length=200)
    distancia_km = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    tiempo_estimado_horas = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    costo_total = models.DecimalField(max_digits=12, decimal_places=2)
    
    # Relaciones
    id_vehiculo = models.ForeignKey(Vehiculo, on_delete=models.PROTECT, db_column='id_vehiculo')
    id_carga = models.ForeignKey(Carga, on_delete=models.PROTECT, db_column='id_carga')
    id_cliente = models.ForeignKey(Cliente, on_delete=models.PROTECT, db_column='id_cliente')
    id_destinatario = models.ForeignKey(DestinatarioFinal, on_delete=models.PROTECT, db_column='id_destinatario')
    # Usar string para romper la dependencia circular
    id_estado = models.ForeignKey('estadoviaje.EstadoViaje', on_delete=models.PROTECT, db_column='id_estado')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'viaje'
        verbose_name = 'Viaje'
        verbose_name_plural = 'Viajes'
    
    def __str__(self):
        return f"Viaje {self.id_viaje}: {self.origen} - {self.destino}"