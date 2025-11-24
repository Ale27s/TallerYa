from rest_framework import serializers
from usuarios.models import Usuario
from .models import Vehiculo


class VehiculoSerializer(serializers.ModelSerializer):
    # Nombre del propietario para mostrar en la tabla
    propietario_nombre = serializers.CharField(
        source='propietario.username',
        read_only=True
    )

    # ID del propietario para crear/editar (solo para admin/empleado)
    propietario_id = serializers.PrimaryKeyRelatedField(
        source='propietario',
        queryset=Usuario.objects.all(),
        write_only=True,
        required=False
    )

    # Días en mora calculados desde el método del modelo
    dias_mora = serializers.IntegerField(
        source='dias_en_mora',
        read_only=True
    )

    class Meta:
        model = Vehiculo
        fields = [
            'id',
            'marca',
            'modelo',
            'anio',
            'placa',
            'estado',
            'propietario_nombre',
            'propietario_id',
            'ingreso',
            'entrega_estimada',
            'dias_mora',
        ]
        read_only_fields = ['estado', 'ingreso', 'entrega_estimada']
