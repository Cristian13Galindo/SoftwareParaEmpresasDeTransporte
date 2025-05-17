from django.db import models

class Conductor(models.Model):
    id_conductor = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)  # Añadido
    cedula = models.CharField(max_length=20, unique=True)  # Añadido
    telefono = models.CharField(max_length=20)
    direccion = models.CharField(max_length=200)  # Añadido
    licencia_conduccion = models.CharField(max_length=50, unique=True)  # Renombrado de licencia
    fecha_vencimiento_licencia = models.DateField()  # Añadido
    # Relaciones con Empresa y Usuario eliminadas
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'conductor'
        verbose_name = 'Conductor'
        verbose_name_plural = 'Conductores'
    
    def __str__(self):
        return f"{self.nombre} {self.apellido} - {self.licencia_conduccion}"