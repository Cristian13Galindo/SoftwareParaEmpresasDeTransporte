from django.db import models
# Eliminar importaciones de Carga y Cliente

class DestinatarioFinal(models.Model):  # Corregir nombre a CamelCase
    id_destinatario = models.AutoField(primary_key=True)
    nombre_empresa = models.CharField(max_length=200)  # Cambiado de nombre a nombre_empresa
    direccion = models.CharField(max_length=200)
    telefono = models.CharField(max_length=20)
    # Eliminar campo documento que no está en el modelo correcto
    # Eliminar campo correo que no está en el modelo correcto
    # Eliminar relaciones con carga y cliente
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'destinatariofinal'
        verbose_name = 'Destinatario Final'
        verbose_name_plural = 'Destinatarios Finales'
    
    def __str__(self):
        return self.nombre_empresa