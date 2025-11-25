from django.db import models
from usuarios.models import Usuario
from django.utils import timezone

class Factura(models.Model):
    cliente = models.ForeignKey(Usuario, on_delete=models.CASCADE, limit_choices_to={'rol': 'CLIENTE'})
    mecanico = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True, related_name='facturas_realizadas')
    fecha = models.DateTimeField(auto_now_add=True)
    total = models.DecimalField(max_digits=12, decimal_places=2)
    estado = models.CharField(max_length=20, choices=[('PAGADO', 'Pagado'), ('PENDIENTE', 'Pendiente')], default='PENDIENTE')
    metodo_pago = models.CharField(
        max_length=20,
        choices=[
            ("EFECTIVO", "Efectivo"),
            ("TARJETA", "Tarjeta"),
            ("TRANSFERENCIA", "Transferencia"),
        ],
        default="EFECTIVO",
    )

    def __str__(self):
        return f"Factura #{self.id} - {self.cliente.username}"


class DetalleFactura(models.Model):
    factura = models.ForeignKey(Factura, on_delete=models.CASCADE, related_name='detalles')
    descripcion = models.CharField(max_length=200)
    cantidad = models.PositiveIntegerField(default=1)
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)

    def subtotal(self):
        return self.cantidad * self.precio_unitario

    def __str__(self):
        return f"{self.descripcion} ({self.cantidad} x {self.precio_unitario})"


class Ingreso(models.Model):
    ESTADOS = (
        ("COBRADO", "Cobrado"),
        ("PENDIENTE", "Pendiente"),
        ("SENIADO", "Señado"),
    )

    fecha = models.DateField(default=timezone.localdate)
    cliente = models.CharField(max_length=100, blank=True)
    contacto = models.CharField(max_length=80, blank=True)
    vehiculo = models.CharField(max_length=120, blank=True)
    placa = models.CharField(max_length=10)
    trabajo = models.TextField()
    costo = models.DecimalField(max_digits=12, decimal_places=2)
    estado = models.CharField(max_length=10, choices=ESTADOS, default="COBRADO")
    notas = models.TextField(blank=True)
    creado_en = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-fecha", "-creado_en"]

    def __str__(self):
        return f"Ingreso {self.placa} - {self.fecha}"
