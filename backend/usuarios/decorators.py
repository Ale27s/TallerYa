from django.http import JsonResponse
from functools import wraps


def rol_requerido(roles_permitidos):
    def decorator(view_func):
        @wraps(view_func)
        def wrapper(*args, **kwargs):
            # Soporta vistas basadas en funciones y en clases (dispatch recibe self como primer argumento)
            if len(args) >= 2:
                request = args[1]  # Vista basada en clase
                view_args = (args[0], request, *args[2:])
            else:
                request = args[0]  # Vista basada en función
                view_args = args

            user = request.user
            if not user.is_authenticated:
                return JsonResponse({'message': 'No autenticado'}, status=401)
            if user.rol not in roles_permitidos:
                return JsonResponse({'message': 'No autorizado'}, status=403)

            return view_func(*view_args, **kwargs)

        return wrapper

    return decorator
