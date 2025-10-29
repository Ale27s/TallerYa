from rest_framework import serializers
from .models import Vehiculo

class VehiculoSerializer(serializers.ModelSerializer):
    propietario_nombre = serializers.CharField(source='propietario.username', read_only=True)
    dias_mora = serializers.IntegerField(source='dias_en_mora', read_only=True)

    class Meta:
        model = Vehiculo
        fields = [
            'id', 'marca', 'modelo', 'anio', 'placa', 'estado',
            'propietario_nombre', 'ingreso', 'entrega_estimada', 'dias_mora'
        ]
