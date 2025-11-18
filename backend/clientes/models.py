from django.db import models
from usuarios.models import Usuario

cliente = models.ForeignKey(Usuario, on_delete=models.CASCADE, limit_choices_to={'rol': 'CLIENTE'})

class Cliente(Usuario):
    direccion = models.CharField(max_length=150)
    vehiculo = models.CharField(max_length=100)
    placa = models.CharField(max_length=20, unique=True)


class Cliente(models.Model):
    nombre = models.CharField(max_length=100)
    telefono = models.CharField(max_length=20)
    email = models.EmailField(unique=True, null=True, blank=True)
    identificacion = models.CharField(max_length=20, unique=True)
    direccion = models.CharField(max_length=150)
    ciudad = models.CharField(max_length=80)

    def __str__(self):
        return self.nombre
