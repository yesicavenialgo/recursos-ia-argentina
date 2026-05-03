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
| Base de datos | PostgreSQL 16 |
| Infraestructura | Docker, Docker Compose |

## Estructura del proyecto

```
cursosapp/
├── frontend/   # Next.js 14
└── backend/    # Django 5 + DRF
```

## Levantar el proyecto en local

```bash
# Backend
cd backend
cp .env.example .env        # completar variables
docker compose up --build

# Frontend
cd frontend
cp .env.local.example .env.local   # completar variables
docker compose up --build
```

### Comandos útiles (backend)

```bash
make migrate          # aplicar migraciones
make superuser        # crear usuario admin
make seed             # cargar datos de prueba
make resetdb          # resetear la base de datos local (borra todo)
make test             # correr tests
```

## Deploy

### Arquitectura de producción

| Componente | Servicio | Notas |
|---|---|---|
| Frontend | Vercel | Deploy automático desde GitHub |
| Backend + DB | AWS EC2 t2.micro |  |
| Base de datos | PostgreSQL en Docker | Volumen EBS persistente |
| Almacenamiento de archivos | — | No aplica (solo se guardan URLs) |

### Variables de entorno — Backend (producción)

Crear `/backend/.env` en el servidor con:

```env
SECRET_KEY=<clave-aleatoria-segura>
DEBUG=False
ALLOWED_HOSTS=<ip-ec2>,<dominio-si-tenes>
USE_SQLITE=False
DB_HOST=db
CORS_ALLOWED_ORIGINS=https://<tu-dominio-vercel>.vercel.app
```

### Variables de entorno — Frontend (producción)

Configurar en el dashboard de Vercel:

```env
NEXT_PUBLIC_API_URL=http://<ip-ec2>:8000
NEXTAUTH_URL=https://<tu-dominio-vercel>.vercel.app
NEXTAUTH_SECRET=<secret-aleatorio>
```

### Primer deploy en EC2

```bash
# 1. Instalar Docker en la instancia
sudo yum update -y
sudo yum install docker -y
sudo service docker start
sudo usermod -aG docker ec2-user

# 2. Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 3. Clonar el repositorio
git clone <url-del-repo>
cd cursosapp/backend

# 4. Configurar variables de entorno
cp .env.example .env
# editar .env con los valores de producción

# 5. Levantar servicios
docker compose up --build -d

# 6. Migraciones y superusuario
make migrate
make superuser
```

### Persistencia de datos

Los datos viven en el volumen Docker `postgres_data`, que está en el disco EBS de la instancia EC2. Persisten aunque la instancia se reinicie. Si la instancia se **termina** (elimina), los datos se pierden a menos que se haya hecho un snapshot del EBS previamente.

> Nunca correr `make resetdb` en producción.

## Tests

```bash
# Backend
cd backend && make test

# Frontend
cd frontend && npm run test:ci
```
