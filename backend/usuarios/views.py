from rest_framework import status, views
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate
from .models import Usuario
from .serializers import UsuarioSerializer
from rest_framework_simplejwt.tokens import RefreshToken

# Permisos por rol
from usuarios.permissions import RolRequerido


# ====================================================
# 🔐 REGISTRO
# ====================================================
class RegisterView(views.APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        telefono = request.data.get('telefono')

        if not email or not password:
            return Response({"message": "Faltan datos obligatorios"}, status=400)

        if username and Usuario.objects.filter(username=username).exists():
            return Response({"message": "El usuario ya existe"}, status=400)

        if Usuario.objects.filter(email=email).exists():
            return Response({"message": "El correo ya está en uso"}, status=400)

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
            rol="CLIENTE"
        )

        refresh = RefreshToken.for_user(usuario)

        return Response({
            "message": "Usuario creado correctamente",
            "user": UsuarioSerializer(usuario).data,
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        }, status=201)


# ====================================================
# 🔐 LOGIN CON JWT
# ====================================================
class LoginView(views.APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        print("DEBUG LOGIN:", username, password)  # ← Log importante

        user = authenticate(username=username, password=password)

        if user is None:
            return Response({"message": "Credenciales inválidas"}, status=401)

        refresh = RefreshToken.for_user(user)

        return Response({
            "message": "Login correcto",
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": UsuarioSerializer(user).data
        })


# ====================================================
# 🚪 LOGOUT
# ====================================================
class LogoutView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        return Response({"message": "Sesión cerrada"})


# ====================================================
# 👥 LISTA Y CREACIÓN DE PERSONAL (JEFE + GERENTE)
# ====================================================
class ListaPersonalView(views.APIView):
    permission_classes = [IsAuthenticated, RolRequerido(['JEFE', 'GERENTE'])]
    
    def get_permissions(self):
        return [IsAuthenticated(), RolRequerido(['JEFE', 'GERENTE'])]

    def get(self, request):
        personal = Usuario.objects.exclude(rol="CLIENTE")
        serializer = UsuarioSerializer(personal, many=True)
        return Response(serializer.data)

    def post(self, request):
        username = request.data.get("username")
        email = request.data.get("email")
        telefono = request.data.get("telefono")
        rol = request.data.get("rol", "MECANICO")

        if not username:
            return Response({"message": "El nombre de usuario es obligatorio"}, status=400)

        if Usuario.objects.filter(username=username).exists():
            return Response({"message": "El usuario ya existe"}, status=400)

        personal = Usuario.objects.create_user(
            username=username,
            password=Usuario.objects.make_random_password(),
            rol=rol,
            email=email,
            telefono=telefono
        )

        return Response(UsuarioSerializer(personal).data, status=201)


# ====================================================
# ❌ ELIMINAR PERSONAL (SOLO JEFE)
# ====================================================
class EliminarPersonalView(views.APIView):

    def get_permissions(self):
        return [IsAuthenticated(), RolRequerido(['JEFE'])]

    def delete(self, request, pk):
        try:
            usuario = Usuario.objects.get(pk=pk)

            if usuario.rol == "JEFE":
                return Response({"message": "No se puede eliminar al Jefe"}, status=400)

            usuario.delete()
            return Response({"message": "Personal eliminado"})

        except Usuario.DoesNotExist:
            return Response({"message": "Usuario no encontrado"}, status=404)
