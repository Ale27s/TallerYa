from django.urls import path
from .views import VehiculoListCreateView, vehiculo_pdf

urlpatterns = [
    path('listar/', VehiculoListCreateView.as_view(), name='listar_vehiculos'),
    path('pdf/<int:pk>/', vehiculo_pdf, name='vehiculo_pdf'),
]
