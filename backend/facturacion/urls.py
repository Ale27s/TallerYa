from django.urls import path
from .views import FacturaListCreateView, DetalleFacturaListCreateView, factura_pdf, IngresoListCreateView

urlpatterns = [
    path('', FacturaListCreateView.as_view()),
    path('detalles/', DetalleFacturaListCreateView.as_view()),
    path('ingresos/', IngresoListCreateView.as_view()),
    path('pdf/<int:pk>/', factura_pdf),
]
