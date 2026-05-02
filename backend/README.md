# Backend — Recursos IA Argentina

API REST construida con Django 5 y Django REST Framework.

## Stack

- **Django 5**
- **Django REST Framework**
- **SimpleJWT** para autenticación del administrador
- **PostgreSQL** como base de datos
- **Docker** + **Docker Compose**
- **Gunicorn** como servidor de producción

## Estructura

```
backend/
├── apps/
│   ├── courses/        # Modelo Course, endpoints públicos de lectura
│   ├── submissions/    # Modelo Submission, endpoint de creación abierto
│   └── admin_panel/    # Login admin, CRUD de cursos, aprobación de submissions
├── config/
│   ├── settings.py
│   └── urls.py
├── seed.py             # Datos de ejemplo
└── requirements.txt
```

## Endpoints principales

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/courses/` | Lista de cursos activos | No |
| GET | `/api/courses/{id}/` | Detalle de curso | No |
| POST | `/api/submissions/` | Sugerir un curso | No |
| POST | `/api/admin/login/` | Login del admin | No |
| GET/POST | `/api/admin/courses/` | Gestión de cursos | Admin |
| GET | `/api/admin/submissions/` | Cola de revisión | Admin |
| POST | `/api/admin/submissions/{id}/approve/` | Aprobar sugerencia | Admin |
| POST | `/api/admin/submissions/{id}/reject/` | Rechazar sugerencia | Admin |

## Instalación local

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # completar variables
python3 manage.py migrate
python3 manage.py runserver
```

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `SECRET_KEY` | Django secret key |
| `DEBUG` | `True` en desarrollo |
| `ALLOWED_HOSTS` | Hosts permitidos |
| `USE_SQLITE` | `True` para desarrollo local sin Docker |
| `DB_HOST` | Host de la base de datos |
| `CORS_ALLOWED_ORIGINS` | Origins permitidos (ej: `http://localhost:3000`) |

## Docker

```bash
docker compose up --build
```

## Tests

```bash
source venv/bin/activate
python3 manage.py test
```

## Crear superusuario admin

```bash
python3 manage.py createsuperuser
```
