from django.db import models
from clientes.models import Cliente

class Cita(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, related_name='citas')
    fecha = models.DateField()
    hora = models.TimeField()
    servicio = models.CharField(max_length=100)
    estado = models.CharField(
        max_length=20,
        choices=[
            ('PENDIENTE', 'Pendiente'),
            ('EN_PROCESO', 'En proceso'),
            ('COMPLETADA', 'Completada'),
            ('CANCELADA', 'Cancelada'),
        ],
        default='PENDIENTE'
    )

    def __str__(self):
        return f"{self.cliente.nombre} - {self.fecha} {self.hora}"
