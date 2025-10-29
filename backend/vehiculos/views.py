from rest_framework import generics
from .serializers import VehiculoSerializer
from django.http import HttpResponse
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from .models import Vehiculo

class VehiculoListCreateView(generics.ListCreateAPIView):
    queryset = Vehiculo.objects.all().order_by('-ingreso')
    serializer_class = VehiculoSerializer


def vehiculo_pdf(request, pk):
    """Genera un reporte PDF con los datos del vehículo"""
    vehiculo = Vehiculo.objects.get(pk=pk)

    # 🔹 Crear respuesta HTTP con PDF
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename="vehiculo_{vehiculo.id}.pdf"'

    # 🔹 Configurar ReportLab
    p = canvas.Canvas(response, pagesize=A4)
    p.setFont("Helvetica-Bold", 16)
    p.drawString(100, 800, "Reporte de Vehículo - TallerYa")
    p.setFont("Helvetica", 12)

    # 🔹 Datos principales
    p.drawString(100, 770, f"Cliente: {vehiculo.cliente.nombre if vehiculo.cliente else 'Sin cliente'}")
    p.drawString(100, 750, f"Marca: {vehiculo.marca}")
    p.drawString(100, 730, f"Modelo: {vehiculo.modelo}")
    p.drawString(100, 710, f"Año: {vehiculo.anho}")
    p.drawString(100, 690, f"Estado actual: {vehiculo.estado}")
    p.drawString(100, 670, f"Servicios realizados: {vehiculo.servicios_hechos}")
    p.drawString(100, 650, f"Servicios pendientes: {vehiculo.servicios_pendientes}")
    p.drawString(100, 630, f"Tiempo de mora: {vehiculo.tiempo_mora or '0 días'}")

    # 🔹 Observaciones
    p.setFont("Helvetica-Oblique", 11)
    p.drawString(100, 600, "Observaciones:")
    p.setFont("Helvetica", 11)
    text = vehiculo.observaciones or "Sin observaciones registradas."
    p.drawString(120, 580, text)

    # 🔹 Firma
    p.setFont("Helvetica-Oblique", 10)
    p.drawString(100, 120, "___________________________")
    p.drawString(100, 105, "Firma del responsable")

    p.showPage()
    p.save()
    return response
