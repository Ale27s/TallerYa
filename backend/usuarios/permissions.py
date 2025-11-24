from rest_framework.permissions import BasePermission

class RolRequerido(BasePermission):
    """
    Verifica si el usuario tiene uno de los roles permitidos.
    Uso:
        permission_classes = [IsAuthenticated, RolRequerido(['JEFE', 'GERENTE'])]
    """

    def __init__(self, roles_permitidos):
        self.roles_permitidos = roles_permitidos

    def has_permission(self, request, view):
        user = request.user

        if not user or not user.is_authenticated:
            return False

        return user.rol in self.roles_permitidos
