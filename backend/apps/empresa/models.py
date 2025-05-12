from django.db import models

class Empresa(models.Model):
    id_empresa = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=150)
    nit = models.CharField(max_length=50, unique=True)
    direccion = models.CharField(max_length=200)
    telefono = models.CharField(max_length=20)
    correo = models.EmailField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'empresa'
        verbose_name = 'Empresa'
        verbose_name_plural = 'Empresas'
    
    def __str__(self):
        return self.nombre