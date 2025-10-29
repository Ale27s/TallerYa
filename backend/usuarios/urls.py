from django.urls import path
from .views import RegisterView, LoginView, LogoutView, ListaPersonalView, EliminarPersonalView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('personal/', ListaPersonalView.as_view()),
    path('personal/<int:pk>/', EliminarPersonalView.as_view()),
]
