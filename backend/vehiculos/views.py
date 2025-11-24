from rest_framework import generics
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponse
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4

from .serializers import VehiculoSerializer
from .models import Vehiculo


class VehiculoListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = VehiculoSerializer

    def get_queryset(self):
        """
        - Si el usuario es CLIENTE: solo sus vehículos.
        - Si es ADMIN/EMPLEADO: todos los vehículos.
        """
        queryset = Vehiculo.objects.all().order_by('-ingreso')
        user = self.request.user

        if user.is_authenticated and getattr(user, 'rol', None) == 'CLIENTE':
            return queryset.filter(propietario=user)

        return queryset

    def perform_create(self, serializer):
        """
        - Si es CLIENTE: se ignora cualquier propietario_id y se usa request.user.
        - Si NO es CLIENTE (ADMIN/EMPLEADO): propietario_id es obligatorio.
        """
        user = self.request.user

        if getattr(user, 'rol', None) == 'CLIENTE':
            # El cliente solo puede registrar sus propios vehículos
            serializer.save(propietario=user)
        else:
            propietario = serializer.validated_data.get('propietario')
            if not propietario:
                raise ValidationError({
                    'propietario_id': 'Debes indicar el propietario del vehículo.'
                })

            serializer.save()


class VehiculoRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = VehiculoSerializer

    def get_queryset(self):
        queryset = Vehiculo.objects.all().order_by('-ingreso')
        user = self.request.user

        if user.is_authenticated and getattr(user, 'rol', None) == 'CLIENTE':
            return queryset.filter(propietario=user)

        return queryset

    def perform_update(self, serializer):
        user = self.request.user

        if getattr(user, 'rol', None) == 'CLIENTE':
            serializer.save(propietario=user)
        else:
            serializer.save()


def vehiculo_pdf(request, pk):
    """Genera un reporte PDF con los datos del vehículo"""
    vehiculo = Vehiculo.objects.get(pk=pk)

    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = (
        f'attachment; filename="vehiculo_{vehiculo.id}.pdf"'
    )

    p = canvas.Canvas(response, pagesize=A4)
    p.setFont("Helvetica-Bold", 16)
    p.drawString(100, 800, "Reporte de Vehículo - TallerYa")
    p.setFont("Helvetica", 12)

    # Datos principales
    p.drawString(100, 770, f"Propietario: {vehiculo.propietario.username}")
    p.drawString(100, 750, f"Marca: {vehiculo.marca}")
    p.drawString(100, 730, f"Modelo: {vehiculo.modelo}")
    p.drawString(100, 710, f"Año: {vehiculo.anio}")
    p.drawString(100, 690, f"Estado actual: {vehiculo.estado}")
    p.drawString(100, 670, f"Días de mora: {vehiculo.dias_en_mora()}")

    # Firma
    p.setFont("Helvetica-Oblique", 10)
    p.drawString(100, 120, "___________________________")
    p.drawString(100, 105, "Firma del responsable")

    p.showPage()
    p.save()
    return response
