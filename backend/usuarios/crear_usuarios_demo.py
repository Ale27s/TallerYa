from usuarios.models import Usuario

def crear_usuarios_demo():
    usuarios = [
        {"username": "admin", "email": "admin@taller.com", "password": "admin123", "rol": "JEFE"},
        {"username": "gerente", "email": "gerente@taller.com", "password": "gerente123", "rol": "GERENTE"},
        {"username": "mecanico", "email": "mecanico@taller.com", "password": "mecanico123", "rol": "MECANICO"},
        {"username": "cliente", "email": "cliente@taller.com", "password": "cliente123", "rol": "CLIENTE"},
    ]

    for data in usuarios:
        if not Usuario.objects.filter(username=data["username"]).exists():
            u = Usuario.objects.create_user(
                username=data["username"],
                email=data["email"],
                password=data["password"],
                rol=data["rol"]
            )
            print(f"✔ Usuario creado: {u.username} ({u.rol})")
        else:
            print(f"⚠ Ya existe: {data['username']}")

if __name__ == "__main__":
    crear_usuarios_demo()
