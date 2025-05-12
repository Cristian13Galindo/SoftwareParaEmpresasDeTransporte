from django.db import models
from apps.empresa.models import Empresa
from apps.usuarios.models import Usuario

class Conductor(models.Model):
    id_conductor = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    licencia = models.CharField(max_length=50, unique=True)
    telefono = models.CharField(max_length=20)
    correo = models.EmailField(max_length=100)
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE, related_name='conductores')
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='conductores')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'conductor'
        verbose_name = 'Conductor'
        verbose_name_plural = 'Conductores'
    
    def __str__(self):
        return f"{self.nombre} - {self.licencia}"