from django.urls import path
from .views import VehiculoListCreateView, vehiculo_pdf

urlpatterns = [
    path("", VehiculoListCreateView.as_view()),       # GET y POST
    path("pdf/<int:pk>/", vehiculo_pdf),              # PDF
]
