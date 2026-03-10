# Practica de conceptos de Next.js

Una aplicación Fullstack utilizando Next.js y una base de datos PostgreSQL con Prisma ORM.

## Características

* Gestión de Tareas:
    - CRUD completo de tareas con persistencia en PostgreSQL
    - Validación de datos con Yup.

* Carrito de Compras:
    - Agregar productos al carrito.
    - Eliminar productos del carrito.
    - Eliminar unidades individuales.
    - Persistencia mediante cookies.
    - Resumen de compra con totales (subtotal, cantidad de items).

## Características de Next.js

- **App Router**: Uso del directorio `app/`.
- **Cookies**: Uso de cookies del lado del servidor y del lado del cliente.
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
* https://www.npmjs.com/package/yup
* https://nextjs.org/docs/app/api-reference/functions/cookies
* https://www.npmjs.com/package/cookies-next