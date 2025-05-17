from django.db import models
# Eliminar la importación de Viaje

class Carga(models.Model):
    id_carga = models.AutoField(primary_key=True)
    tipo_carga = models.CharField(max_length=100)
    peso_toneladas = models.DecimalField(max_digits=10, decimal_places=2)  # Cambiado desde peso_kg
    descripcion = models.TextField()  # Mantener pero como texto largo
    precio_por_tonelada = models.DecimalField(max_digits=12, decimal_places=2)  # Campo agregado
    # Eliminar campo viaje - la relación correcta va en el modelo Viaje
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'carga'
        verbose_name = 'Carga'
        verbose_name_plural = 'Cargas'
    
    def __str__(self):
        return f"{self.tipo_carga} - {self.peso_toneladas} ton"