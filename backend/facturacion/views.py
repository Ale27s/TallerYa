from rest_framework import generics
from .models import Factura, DetalleFactura
from .serializers import FacturaSerializer, DetalleFacturaSerializer
from django.shortcuts import get_object_or_404
from reportlab.pdfgen import canvas
from django.http import HttpResponse


class FacturaListCreateView(generics.ListCreateAPIView):
    queryset = Factura.objects.all().order_by('-fecha')
    serializer_class = FacturaSerializer


class DetalleFacturaListCreateView(generics.ListCreateAPIView):
    queryset = DetalleFactura.objects.all()
    serializer_class = DetalleFacturaSerializer


def factura_pdf(request, pk):
    factura = get_object_or_404(Factura, pk=pk)
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename="factura_{factura.id}.pdf"'
    p = canvas.Canvas(response)
    p.setFont("Helvetica-Bold", 14)
    p.drawString(100, 800, "Factura TallerYa")
    p.setFont("Helvetica", 12)
    p.drawString(100, 770, f"Cliente: {factura.cliente.username}")
    p.drawString(100, 750, f"Total: Gs. {factura.total}")
    p.drawString(100, 730, f"Fecha: {factura.fecha.strftime('%d/%m/%Y %H:%M')}")
    p.showPage()
    p.save()
    return response
