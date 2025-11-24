from django.urls import path
from .views import (
    VehiculoListCreateView,
    VehiculoRetrieveUpdateDestroyView,
    vehiculo_pdf,
)

urlpatterns = [
    path("", VehiculoListCreateView.as_view(), name="vehiculo-list-create"),
    path("<int:pk>/", VehiculoRetrieveUpdateDestroyView.as_view(), name="vehiculo-detail"),
    path("pdf/<int:pk>/", vehiculo_pdf, name="vehiculo-pdf"),
]
