from django.contrib import admin
from .models import Vehiculo

@admin.register(Vehiculo)
class VehiculoAdmin(admin.ModelAdmin):
    list_display = ('marca', 'modelo', 'placa', 'estado', 'propietario', 'ingreso', 'entrega_estimada')
    list_filter = ('estado',)
    search_fields = ('placa', 'marca', 'modelo')
