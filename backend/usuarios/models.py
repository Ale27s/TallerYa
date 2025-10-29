from django.db import models
from django.contrib.auth.models import AbstractUser

class Usuario(AbstractUser):
    telefono = models.CharField(max_length=20, blank=True, null=True)
    rol = models.CharField(
        max_length=20,
        choices=[
            ('JEFE', 'Jefe'),
            ('GERENTE', 'Gerente'),
            ('MECANICO', 'Mecánico'),
            ('CLIENTE', 'Cliente'),
        ],
        default='CLIENTE'
    )

    def __str__(self):
        return f"{self.username} ({self.rol})"

    # 👇 Esta función bloquea a los CLIENTES del panel Django
    def has_module_perms(self, app_label):
        return self.rol != 'CLIENTE'

    # 👇 También podés reforzarlo (opcional)
    def has_perm(self, perm, obj=None):
        return self.rol != 'CLIENTE'
