from rest_framework import routers

from .views import CitaViewSet

router = routers.DefaultRouter()
router.register(r"citas", CitaViewSet)

urlpatterns = router.urls
