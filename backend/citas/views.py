from rest_framework import viewsets

from .models import Cita
from .serializers import CitaSerializer


class CitaViewSet(viewsets.ModelViewSet):
    queryset = (
        Cita.objects.select_related("cliente", "vehiculo")
        .all()
        .order_by("-fecha", "-hora")
    )
    serializer_class = CitaSerializer
