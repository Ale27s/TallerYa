from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Usuario

@admin.register(Usuario)
class UsuarioAdmin(UserAdmin):
    list_display = ('username', 'email', 'rol', 'telefono', 'is_active', 'is_staff')
    list_filter = ('rol', 'is_active')
    search_fields = ('username', 'email', 'telefono')
    ordering = ('rol',)

    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Información personal', {'fields': ('email', 'telefono')}),
        ('Permisos y Rol', {'fields': ('rol', 'is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'telefono', 'rol', 'password1', 'password2'),
        }),
    )

    def get_queryset(self, request):
        """Filtra la vista según el rol del usuario logueado."""
        qs = super().get_queryset(request)
        if request.user.rol == 'JEFE':
            return qs  # El Jefe ve a todos
        elif request.user.rol == 'MECANICO':
            return qs.filter(rol='CLIENTE')  # El mecánico solo ve clientes
        else:
            return qs.filter(id=request.user.id)  # El cliente solo se ve a sí mismo
