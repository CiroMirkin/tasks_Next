# API REST

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| GET | `/api/tasks` | Obtener tareas con paginacion (take, skip) |
| POST | `/api/tasks` | Crear nueva tarea |
| GET | `/api/tasks/[id]` | Obtener tarea por ID |
| PUT | `/api/tasks/[id]` | Actualizar tarea por ID |
| POST | `/api/seed` | Semillar base de datos |


## Endpoints

### GET `/api/tasks`

Obtiene una lista de tareas con paginacion.

**Parametros de Query:**

| Parametro | Tipo | Default | Descripcion |
|-----------|------|---------|-------------|
| take | number | 10 | Numero de tareas a obtener |
| skip | number | 0 | Numero de tareas a omitir |

**Response 200:**
```json
{
  "tasks": [
    {
      "id": "uuid",
      "description": "string",
      "complete": false,
      "createdAt": "datetime",
      "updatedAt": "datetime"
    }
  ]
}
```

**Response 400:**
```json
{
  "message": "Take debe ser un numero.",
  "status": 400
}
```

### POST `/api/tasks`

Crea una nueva tarea.

**Body:**
```json
{
  "description": "string (required, min: 2, max: 300)",
  "complete": "boolean (optional, default: false)"
}
```

**Response 200:**
```json
{
  "id": "uuid",
  "description": "string",
  "complete": false,
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

**Response 400:**
```json
{
  "message": ["description must be at least 2 characters"],
  "status": 400
}
```

**Response 500:**
```json
{
  "status": 500
}
```

### GET `/api/tasks/[id]`

Obtiene una tarea por su ID.

**Response 200:**
```json
{
  "id": "uuid",
  "description": "string",
  "complete": false,
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

**Response 404:**
```json
{
  "message": "Tarea no encontrada.",
  "status": 404
}
```

### PUT `/api/tasks/[id]`

Actualiza una tarea por su ID.

**Body:**
```json
{
  "description": "string (required, min: 2, max: 300)",
  "complete": "boolean (optional, default: false)"
}
```

**Response 200:**
```json
{
  "id": "uuid",
  "description": "string",
  "complete": true,
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

**Response 400:**
```json
{
  "message": ["description must be at least 2 characters"],
  "status": 400
}
```

**Response 404:**
```json
{
  "message": "Tarea no encontrada.",
  "status": 404
}
```

**Response 500:**
```json
{
  "status": 500
}
```

### POST `/api/seed`

Sembrar la base de datos con tareas de ejemplo.

**Response 200:**
```json
{
  "message": "Seed executed successfully"
}
```
