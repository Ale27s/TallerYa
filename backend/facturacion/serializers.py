from rest_framework import serializers
from .models import Factura, DetalleFactura

class DetalleFacturaSerializer(serializers.ModelSerializer):
    subtotal = serializers.SerializerMethodField()

    class Meta:
        model = DetalleFactura
        fields = ['id', 'descripcion', 'cantidad', 'precio_unitario', 'subtotal']

    def get_subtotal(self, obj):
        return obj.subtotal()

class FacturaSerializer(serializers.ModelSerializer):
    cliente_nombre = serializers.CharField(source='cliente.username', read_only=True)
    mecanico_nombre = serializers.CharField(source='mecanico.username', read_only=True)
    detalles = DetalleFacturaSerializer(many=True, read_only=True)

    class Meta:
        model = Factura
        fields = ['id', 'cliente', 'cliente_nombre', 'mecanico', 'mecanico_nombre', 'fecha', 'total', 'estado', 'detalles']
