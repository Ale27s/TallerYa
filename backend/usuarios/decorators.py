from django.http import JsonResponse
from functools import wraps


def rol_requerido(roles_permitidos):
    def decorator(view_func):
        @wraps(view_func)
        def wrapper(self, request, *args, **kwargs):
            user = request.user

            # Requiere autenticación previa
            if not user or not user.is_authenticated:
                return JsonResponse({'message': 'No autenticado'}, status=401)

            # Verificar roles
            if user.rol not in roles_permitidos:
                return JsonResponse({'message': 'No autorizado'}, status=403)

            # Llamar a la vista original
            return view_func(self, request, *args, **kwargs)

        return wrapper
    return decorator
