from django.contrib import admin

from .models import Cita


@admin.register(Cita)
class CitaAdmin(admin.ModelAdmin):
    list_display = (
        "cliente_nombre",
        "servicio",
        "fecha",
        "hora",
        "gravedad",
        "prioridad",
        "tiempo_estimado",
        "estado",
    )
    list_filter = ("estado", "gravedad", "prioridad")
    search_fields = ("cliente_nombre", "servicio")
