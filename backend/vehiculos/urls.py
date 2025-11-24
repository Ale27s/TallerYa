from django.urls import path
from .views import VehiculoListCreateView, vehiculo_pdf

urlpatterns = [
    path("", VehiculoListCreateView.as_view(), name="vehiculo-list-create"),
    path("pdf/<int:pk>/", vehiculo_pdf, name="vehiculo-pdf"),
]
