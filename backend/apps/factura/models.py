from django.db import models
from apps.cliente.models import Cliente
from apps.viaje.models import Viaje

class Factura(models.Model):
    id_factura = models.AutoField(primary_key=True)
    numero_factura = models.CharField(max_length=50, unique=True)
    fecha_emision = models.DateField()
    fecha_vencimiento = models.DateField()
    subtotal = models.DecimalField(max_digits=12, decimal_places=2)
    iva = models.DecimalField(max_digits=12, decimal_places=2)
    total = models.DecimalField(max_digits=12, decimal_places=2)
    estado_pago = models.CharField(max_length=50)
    observaciones = models.TextField(blank=True, null=True)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, related_name='facturas')
    viaje = models.ForeignKey(Viaje, on_delete=models.CASCADE, related_name='facturas')
    metodo_pago = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'factura'
        verbose_name = 'Factura'
        verbose_name_plural = 'Facturas'
    
    def __str__(self):
        return f"{self.numero_factura} - {self.cliente.nombre_empresa}"