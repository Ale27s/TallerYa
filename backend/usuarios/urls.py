from django.urls import path
from .views import (
    RegisterView,
    LoginView,
    LogoutView,
    ListaPersonalView,
    ListaClientesView,
    EstadisticasDashboardView,
)
# ❌ EliminarPersonalView está generando error → lo comentamos
# from .views import EliminarPersonalView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('estadisticas/', EstadisticasDashboardView.as_view()),
    path('personal/', ListaPersonalView.as_view()),
    path('clientes/', ListaClientesView.as_view()),
    
    # ❌ Desactivar temporalmente hasta reparar la vista
    # path('personal/<int:pk>/', EliminarPersonalView.as_view()),
]
