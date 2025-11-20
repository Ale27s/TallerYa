from rest_framework import status, views
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from .models import Usuario
from .serializers import UsuarioSerializer

# ✅ Registro de usuario
class RegisterView(views.APIView):
    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        telefono = request.data.get('telefono')

        if not email or not password:
            return Response({"message": "Faltan datos obligatorios"}, status=status.HTTP_400_BAD_REQUEST)

        if username and Usuario.objects.filter(username=username).exists():
            return Response({"message": "El usuario ya existe"}, status=status.HTTP_400_BAD_REQUEST)

        if Usuario.objects.filter(email=email).exists():
            return Response({"message": "El correo ya está en uso"}, status=status.HTTP_400_BAD_REQUEST)

        # Si el nombre de usuario no viene, generamos uno a partir del correo
        final_username = username or email.split('@')[0]
        counter = 1
        base_username = final_username
        while Usuario.objects.filter(username=final_username).exists():
            counter += 1
            final_username = f"{base_username}{counter}"

        usuario = Usuario.objects.create_user(
            username=final_username,
            email=email,
            password=password,
            telefono=telefono,
            rol='CLIENTE'
        )

        return Response({
            "message": "Usuario creado correctamente",
            "user": UsuarioSerializer(usuario).data
        }, status=status.HTTP_201_CREATED)


# ✅ Login de usuario
class LoginView(views.APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if user is None:
            return Response({"message": "Credenciales inválidas"}, status=status.HTTP_401_UNAUTHORIZED)

        login(request, user)
        return Response({
            "message": "Inicio de sesión exitoso",
            "user": UsuarioSerializer(user).data
        })


# ✅ Logout
class LogoutView(views.APIView):
    def post(self, request):
        logout(request)
        return Response({"message": "Sesión cerrada con éxito"})


# ✅ Lista de personal (solo jefe/gerente)
from .decorators import rol_requerido
from django.utils.decorators import method_decorator

@method_decorator(rol_requerido(['JEFE', 'GERENTE']), name='dispatch')
class ListaPersonalView(views.APIView):
    def get(self, request):
        personal = Usuario.objects.exclude(rol='CLIENTE')
        serializer = UsuarioSerializer(personal, many=True)
        return Response(serializer.data)

    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        telefono = request.data.get('telefono')
        rol = request.data.get('rol', 'MECANICO')

        if not username:
            return Response({"message": "El nombre de usuario es obligatorio"}, status=status.HTTP_400_BAD_REQUEST)

        if rol not in ['JEFE', 'GERENTE', 'MECANICO']:
            return Response({"message": "Rol no válido para personal"}, status=status.HTTP_400_BAD_REQUEST)

        if Usuario.objects.filter(username=username).exists():
            return Response({"message": "El usuario ya existe"}, status=status.HTTP_400_BAD_REQUEST)

        personal = Usuario.objects.create_user(
            username=username,
            password=Usuario.objects.make_random_password(),
            rol=rol,
            email=email,
            telefono=telefono
        )

        return Response(UsuarioSerializer(personal).data, status=status.HTTP_201_CREATED)


# ✅ Eliminar personal (solo jefe)
@method_decorator(rol_requerido(['JEFE']), name='dispatch')
class EliminarPersonalView(views.APIView):
    def delete(self, request, pk):
        try:
            usuario = Usuario.objects.get(pk=pk)
            if usuario.rol == 'JEFE':
                return Response({'message': 'No se puede eliminar al Jefe principal'}, status=400)
            usuario.delete()
            return Response({'message': 'Personal eliminado correctamente'})
        except Usuario.DoesNotExist:
            return Response({'message': 'Usuario no encontrado'}, status=404)
