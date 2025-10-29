from django.contrib import admin
from .models import Factura, DetalleFactura

@admin.register(Factura)
class FacturaAdmin(admin.ModelAdmin):
    list_display = ('id', 'cliente', 'fecha', 'total')
    search_fields = ('cliente__username',)
    list_filter = ('fecha',)

@admin.register(DetalleFactura)
class DetalleFacturaAdmin(admin.ModelAdmin):
    list_display = ('factura', 'descripcion', 'cantidad', 'subtotal')

    # Si el modelo tiene precio_unitario, podés mostrarlo así:
    def subtotal(self, obj):
        return f"{obj.cantidad * obj.precio_unitario:.0f}" if hasattr(obj, "precio_unitario") else "-"
    subtotal.short_description = "Subtotal (Gs)"
