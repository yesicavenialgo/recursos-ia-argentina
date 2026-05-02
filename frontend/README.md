# Frontend — Recursos IA Argentina

Interfaz pública y panel de administración construidos con Next.js 14.

## Stack

- **Next.js 14** con App Router
- **TypeScript**
- **Redux Toolkit** + **Redux Saga** para manejo de estado y side effects
- **Tailwind CSS** + design system propio (Lunar)
- **Jest** + **Testing Library** para tests

## Estructura

```
frontend/
├── app/
│   ├── (public)/
│   │   ├── page.tsx              # Directorio de cursos
│   │   ├── courses/[id]/         # Detalle de curso
│   │   └── suggest/              # Formulario de sugerencia
│   └── (admin)/
│       └── admin/
│           ├── login/            # Login del administrador
│           ├── dashboard/        # Panel principal
│           ├── submissions/      # Cola de aprobación
│           └── courses/          # Gestión de cursos
├── components/
├── store/
│   ├── slices/                   # Estado (courses, submissions, admin)
│   └── sagas/                    # Side effects (llamadas a la API)
└── lib/
    ├── api.ts                    # Cliente HTTP (axios)
    └── types.ts                  # Tipos compartidos
```

## Instalación local

```bash
npm install
cp .env.local.example .env.local  # completar variables
npm run dev
```

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | URL del backend (ej: `http://localhost:8000`) |
| `NEXTAUTH_SECRET` | Secret para NextAuth |
| `NEXTAUTH_URL` | URL del frontend |

## Docker

```bash
docker compose build
docker compose up
```

## Tests

```bash
npm run test:ci
```
