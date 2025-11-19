from django.db import models
from clientes.models import Cliente
from vehiculos.models import Vehiculo


class Cita(models.Model):
    cliente = models.ForeignKey(
        Cliente,
        on_delete=models.SET_NULL,
        related_name="citas",
        null=True,
        blank=True,
    )
    cliente_nombre = models.CharField(max_length=120, default="")
    vehiculo = models.ForeignKey(
        Vehiculo,
        on_delete=models.SET_NULL,
        related_name="citas",
        null=True,
        blank=True,
    )
    fecha = models.DateField()
    hora = models.TimeField(null=True, blank=True)
    servicio = models.CharField(max_length=100)
    gravedad = models.CharField(
        max_length=20,
        choices=[
            ("LEVE", "Leve"),
            ("MEDIA", "Media"),
            ("ALTA", "Alta"),
        ],
        default="MEDIA",
    )
    prioridad = models.CharField(
        max_length=20,
        choices=[
            ("NORMAL", "Normal"),
            ("PRIORITARIA", "Prioritaria"),
            ("URGENTE", "Urgente"),
        ],
        default="NORMAL",
    )
    tiempo_estimado = models.PositiveIntegerField(default=1, help_text="Horas estimadas")
    estado = models.CharField(
        max_length=20,
        choices=[
            ("PENDIENTE", "Pendiente"),
            ("EN_PROCESO", "En proceso"),
            ("COMPLETADA", "Completada"),
            ("CONFIRMADA", "Confirmada"),
            ("CANCELADA", "Cancelada"),
        ],
        default="PENDIENTE",
    )
    creado_en = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        nombre_cliente = self.cliente.nombre if self.cliente else self.cliente_nombre
        return f"{nombre_cliente} - {self.fecha} {self.hora or ''}"
