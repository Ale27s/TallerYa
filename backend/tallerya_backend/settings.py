from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# ==========================
# 🔐 CONFIGURACIÓN GENERAL
# ==========================
SECRET_KEY = 'django-insecure-%u@jwrdw=06ay3d$zosq@719ublb366&&^uc@8=y@8r@o8o1$d'
DEBUG = True
ALLOWED_HOSTS = ["*"]  # Acepta conexiones locales (útil en desarrollo)

# ==========================
# ⚙️ APLICACIONES INSTALADAS
# ==========================
INSTALLED_APPS = [
    'jazzmin',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # --- Apps externas ---
    'rest_framework',
    'corsheaders',
    # --- Apps locales ---
    'usuarios',
    'clientes',
    'citas',
    'facturacion',
    'vehiculos',
]

# ==========================
# 🔄 MIDDLEWARE
# ==========================
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# ==========================
# 🧭 CONFIGURACIÓN DE RUTAS
# ==========================
ROOT_URLCONF = 'tallerya_backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],  # 🔹 útil si después querés usar plantillas personalizadas
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'tallerya_backend.wsgi.application'

# ==========================
# 🧩 BASE DE DATOS
# ==========================
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',  # ⚙️ Simple y portable
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# ==========================
# 🔑 VALIDACIÓN DE CONTRASEÑAS
# ==========================
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# ==========================
# 🌍 INTERNACIONALIZACIÓN
# ==========================
LANGUAGE_CODE = 'es'
TIME_ZONE = 'America/Asuncion'  # 🇵🇾 Correcto para Paraguay
USE_I18N = True
USE_TZ = True

# ==========================
# 🖼️ ARCHIVOS ESTÁTICOS
# ==========================
STATIC_URL = 'static/'
STATICFILES_DIRS = [BASE_DIR / 'static']

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ==========================
# 🔗 CORS Y API REST
# ==========================
CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOW_CREDENTIALS = True

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
]

CSRF_TRUSTED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
}

# ==========================
# 👤 MODELO DE USUARIO PERSONALIZADO
# ==========================
AUTH_USER_MODEL = 'usuarios.Usuario'

# ==========================
# 🎨 CONFIGURACIÓN DE JAZZMIN
# ==========================
JAZZMIN_SETTINGS = {
    "site_title": "Panel TallerYa",
    "site_header": "TallerYa 🛠️",
    "site_brand": "TallerYa",
    "welcome_sign": "Bienvenido al Panel Administrativo de TallerYa",
    "copyright": "© 2025 TallerYa - Sistema de Gestión de Talleres",

    # Colores / Temas
    "theme": "lux",
    "dark_mode_theme": "cyborg",

    # Íconos personalizados
    "icons": {
        "usuarios.Usuario": "fas fa-user-tie",
        "clientes.Cliente": "fas fa-user-tag",
        "vehiculos.Vehiculo": "fas fa-car-side",
        "facturacion.Factura": "fas fa-file-invoice-dollar",
        "facturacion.DetalleFactura": "fas fa-list",
        "citas.Cita": "fas fa-calendar-check",
    },

    # Sidebar / Navegación
    "show_sidebar": True,
    "navigation_expanded": True,
    "search_model": "clientes.Cliente",

    # Enlaces rápidos
    "custom_links": {
        "clientes": [{
            "name": "Ver Panel Frontend",
            "url": "http://localhost:3000/dashboard",
            "icon": "fas fa-home",
            "permissions": ["auth.view_user"]
        }],
    },
}

# Tweaks visuales adicionales
JAZZMIN_UI_TWEAKS = {
    "navbar": "navbar-dark bg-primary",
    "sidebar": "sidebar-dark-primary",
    "theme": "darkly",
    "dark_mode_theme": "cyborg",
}
