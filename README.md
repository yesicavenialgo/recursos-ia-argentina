# Recursos IA Argentina

Directorio colaborativo de cursos gratuitos de Inteligencia Artificial para la comunidad argentina.

Cualquier persona puede sugerir un curso. El admin lo revisa y, si cumple los criterios, lo publica en el directorio público.

## Funcionalidades

- Directorio público de cursos filtrable por idioma, nivel y categoría
- Formulario de sugerencia abierto — sin registro requerido
- Panel de administración con cola de aprobación (aprobar / rechazar)
- Gestión de cursos desde el panel admin

## Stack

| Capa | Tecnología |
|------|-----------|
| Frontend | Next.js 14, TypeScript, Redux Toolkit + Redux Saga, Tailwind CSS |
| Backend | Django 5, Django REST Framework, SimpleJWT |
| Base de datos | PostgreSQL |
| Infraestructura | Docker, Docker Compose |

## Estructura del proyecto

```
cursosapp/
├── frontend/   # Next.js 14
└── backend/    # Django 5 + DRF
```

## Levantar el proyecto

```bash
# Backend
cd backend
docker compose up --build

# Frontend
cd frontend
cp .env.local.example .env.local   # completar variables
docker compose up --build
```

## Tests

```bash
# Backend
cd backend && source venv/bin/activate
python3 manage.py test

# Frontend
cd frontend
npm run test:ci
```
