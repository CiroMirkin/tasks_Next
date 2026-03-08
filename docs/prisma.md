# Prisma + Next.js Setup

## Dependencias

```bash
npm install prisma --save-dev
npm install @prisma/client @prisma/adapter-pg pg dotenv
npm install --save-dev @types/pg
```

## Archivos de configuracion

### `prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client"
  output   = "../app/generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### `prisma.config.ts`

```ts
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
```

### `.env`

```env
DATABASE_URL="postgresql://usuario:password@localhost:5432/nombre_db"
```

### `lib/prisma.ts`

Con Prisma 6+ y output personalizado, el cliente requiere un adapter explicito:

```ts
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
```

El patron singleton evita multiples instancias de `PrismaClient` durante el hot reload en desarrollo.

## Comandos

| Comando | Descripcion |
|---|---|
| `npx prisma generate` | Genera el cliente a partir del schema |
| `npx prisma migrate dev --name <nombre>` | Crea y aplica una migracion en desarrollo |
| `npx prisma migrate deploy` | Aplica migraciones en produccion |
| `npx prisma db push` | Sincroniza el schema sin crear migracion (prototipado) |
| `npx prisma studio` | Abre UI visual para explorar la base de datos |

## Uso

El cliente solo puede usarse en el servidor. En App Router:

```ts
import { prisma } from "@/lib/prisma";

export async function GET() {
  const tasks = await prisma.task.findMany();
  return Response.json(tasks);
}
```

## Notas

- Nunca importar `PrismaClient` en componentes con `"use client"`.
- En produccion usar `migrate deploy`, no `migrate dev`.
- Al agregar variables de entorno en Vercel, reiniciar el deployment para que tomen efecto.
- Tras modificar el schema, siempre ejecutar `npx prisma generate`.
