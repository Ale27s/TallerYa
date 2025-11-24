"""
URL configuration for tallerya_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.template.response import TemplateResponse
from django.db.models import Count
from clientes.models import Cliente
from citas.models import Cita
from usuarios.models import Usuario

from datetime import datetime


# Vista del dashboard del admin
def custom_admin_dashboard(request):
    clientes_count = Cliente.objects.count()
    citas_count = Cita.objects.count()
    usuarios_count = Usuario.objects.count()

    # Contar citas por mes
    citas_por_mes = (
        Cita.objects.values_list('fecha__month')
        .annotate(total=Count('id'))
        .order_by('fecha__month')
    )

    meses, valores = [], []
    for mes, total in citas_por_mes:
        if mes:
            nombre_mes = datetime(2025, mes, 1).strftime("%B")
            meses.append(nombre_mes)
            valores.append(total)

    context = {
        'clientes_count': clientes_count,
        'citas_count': citas_count,
        'usuarios_count': usuarios_count,
        'meses': meses,
        'valores': valores,
    }
    return TemplateResponse(request, "admin/index.html", context)


# ✅ Aquí viene la corrección del bucle
def custom_admin_urls(admin_site):
    def get_urls():
        urls = super(admin_site.__class__, admin_site).get_urls()  # Usa la versión original
        custom_urls = [
            path('', custom_admin_dashboard, name='index'),
        ]
        return custom_urls + urls

    admin_site.get_urls = get_urls
    return admin_site

# Aplicamos la corrección al sitio admin
admin = custom_admin_urls(admin)
admin.site.index_template = "admin/index.html"

# URLs del proyecto
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('usuarios.urls')),
    path('api/', include('clientes.urls')),
    path('api/facturacion/', include('facturacion.urls')),
    path('api/vehiculos/', include('vehiculos.urls')),
    path('api/', include('citas.urls')),
    path("api/vehiculos/", include("vehiculos.urls")),


]
