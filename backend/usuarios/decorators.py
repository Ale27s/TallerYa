from django.http import JsonResponse

def rol_requerido(roles_permitidos):
    def decorator(view_func):
        def wrapper(request, *args, **kwargs):
            user = request.user
            if not user.is_authenticated:
                return JsonResponse({'message': 'No autenticado'}, status=401)
            if user.rol not in roles_permitidos:
                return JsonResponse({'message': 'No autorizado'}, status=403)
            return view_func(request, *args, **kwargs)
        return wrapper
    return decorator
