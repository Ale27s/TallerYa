from datetime import datetime, timedelta

from rest_framework import serializers

from clientes.models import Cliente
from vehiculos.models import Vehiculo
from .models import Cita


class CitaSerializer(serializers.ModelSerializer):
    cliente = serializers.PrimaryKeyRelatedField(
        queryset=Cliente.objects.all(), allow_null=True, required=False
    )
    vehiculo = serializers.PrimaryKeyRelatedField(
        queryset=Vehiculo.objects.all(), allow_null=True, required=False
    )
    hora_fin = serializers.SerializerMethodField()
    cliente_nombre = serializers.CharField(allow_blank=True, required=False)

    class Meta:
        model = Cita
        fields = [
            "id",
            "cliente",
            "cliente_nombre",
            "servicio",
            "fecha",
            "hora",
            "estado",
            "gravedad",
            "prioridad",
            "tiempo_estimado",
            "vehiculo",
            "hora_fin",
        ]

    def validate(self, attrs):
        cliente = attrs.get("cliente")
        nombre = attrs.get("cliente_nombre", "").strip()
        if cliente and not nombre:
            attrs["cliente_nombre"] = cliente.nombre
        if not cliente and not nombre:
            raise serializers.ValidationError(
                "Debes indicar el cliente o al menos su nombre."
            )
        return attrs

    def get_hora_fin(self, obj):
        if obj.hora and obj.tiempo_estimado:
            inicio = datetime.combine(obj.fecha, obj.hora)
            fin = inicio + timedelta(hours=obj.tiempo_estimado)
            return fin.isoformat()
        return None
