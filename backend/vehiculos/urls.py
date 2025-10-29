from django.urls import path
from .views import VehiculoListView, vehiculo_pdf

urlpatterns = [
    path('listar/', VehiculoListView.as_view(), name='listar_vehiculos'),
    path('pdf/<int:pk>/', vehiculo_pdf, name='vehiculo_pdf'),
]
