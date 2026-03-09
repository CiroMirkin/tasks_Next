# CRUD de Tareas

CRUD para gestión de tareas desarrollada con Next.js 16, Prisma y PostgreSQL.

## Características

- CRUD completo de tareas
- Pagination en listados
- Validación de datos con Yup
- Tipado con TypeScript
- Base de datos PostgreSQL con Prisma ORM

## Características de Next.js

- **App Router**: Uso del directorio `app/`.
- **Server Actions**: Funciones server-side con `"use server"` para mutaciones de datos.
- **Revalidación de caché**: `revalidatePath('/dashboard')` para actualizar datos en tiempo real.
- **API Routes**: Endpoints en `app/api/seed/route.ts`.

## Instalación

```bash
npm install
```

## Configuración

1. Copiar `.env.example` a `.env` y configurar las variables de entorno
2. Ejecutar migraciones de Prisma:

```
npx prisma init --db
npx prisma migrate dev --name init
npx prisma generate
```

## Ejecutar

```bash
npm run dev
```

La API estará disponible en `http://localhost:3000`

## Documentación de Endpoints

Ver [docs/api.md](docs/api.md) para referencia completa de endpoints.

## Referencias

* https://nextjs.org/docs/app/getting-started/updating-data
* https://vercel.com/kb/guide/nextjs-prisma-postgres
* https://www.prisma.io/docs/orm