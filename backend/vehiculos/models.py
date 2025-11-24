from django.db import models
from django.utils import timezone
from usuarios.models import Usuario

class Vehiculo(models.Model):
    propietario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='vehiculos')
    marca = models.CharField(max_length=50)
    modelo = models.CharField(max_length=50)
    anio = models.PositiveIntegerField()
    placa = models.CharField(max_length=10, unique=True)
    estado = models.CharField(max_length=30, choices=[
        ('EN_TALLER', 'En Taller'),
        ('EN_SERVICIO', 'En Servicio'),
        ('FINALIZADO', 'Finalizado'),
        ('MORA', 'En Mora'),
    ], default='EN_TALLER')
    ingreso = models.DateField(default=timezone.localdate)
    entrega_estimada = models.DateField(null=True, blank=True)

    def dias_en_mora(self):
        if self.entrega_estimada and timezone.now().date() > self.entrega_estimada:
            return (timezone.now().date() - self.entrega_estimada).days
        return 0

    def __str__(self):
        return f"{self.marca} {self.modelo} ({self.placa})"
