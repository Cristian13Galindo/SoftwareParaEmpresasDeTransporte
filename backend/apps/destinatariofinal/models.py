from django.db import models
from apps.carga.models import Carga
from apps.cliente.models import Cliente

class Destinatariofinal(models.Model):
    id_destinatario = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    documento = models.CharField(max_length=50)
    direccion = models.CharField(max_length=200)
    telefono = models.CharField(max_length=20)
    correo = models.EmailField(max_length=100)
    carga = models.ForeignKey(Carga, on_delete=models.CASCADE, related_name='destinatarios')
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, related_name='destinatarios')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'destinatariofinal'
        verbose_name = 'Destinatario Final'
        verbose_name_plural = 'Destinatarios Finales'
    
    def __str__(self):
        return f"{self.nombre} - {self.documento}"