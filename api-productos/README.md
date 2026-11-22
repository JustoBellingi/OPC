# API de Productos — Proyecto Final Node.js (TechLab)

API REST para administrar el catálogo de productos de la tienda (CRUD), con autenticación JWT y datos en **Firebase Firestore**.

## Estructura (arquitectura en capas)

```
api-productos/
├── index.js                  # Punto de entrada: configura Express, CORS, body-parser, rutas, 404 y errores
├── .env / .env.example       # Variables de entorno
├── requests.http             # Peticiones de prueba
└── src/
    ├── config/firebase.js    # Conexión a Firebase/Firestore
    ├── routes/               # URL + método -> controlador
    ├── controllers/          # Lee req, llama al servicio, arma res
    ├── services/             # Lógica de negocio y validaciones
    ├── models/               # Acceso a Firestore (única capa que conoce la BD)
    ├── middlewares/          # auth (JWT), notFound (404), errorHandler (400/500)
    └── utils/httpError.js    # Error con código de estado HTTP
```

Flujo de una petición: **ruta → (middleware auth) → controlador → servicio → modelo → Firestore**.

## Puesta en marcha

1. `npm install`
2. Copiá `.env.example` a `.env` y completá los valores.
3. **Firebase:**
   1. Entrá a https://console.firebase.google.com y creá un proyecto.
   2. *Compilación → Firestore Database → Crear base de datos* (modo de prueba para empezar).
   3. Creá la colección **`products`** con un primer documento (ID automático) con estos campos:
      `name` (string), `price` (number), `stock` (number), `category` (string), `description` (string).
   4. *Configuración del proyecto → Tus apps → Web (`</>`)*: registrá una app y copiá los valores de `firebaseConfig` a las variables `FIREBASE_*` del `.env`.
4. `npm run start` (o `npm run dev` para reiniciar solo al guardar).

> ⚠️ Las reglas en "modo de prueba" dejan la base abierta por 30 días. Como el SDK `firebase` es el cliente web, la seguridad de escritura la da nuestra API con JWT; para producción conviene endurecer las reglas o migrar a `firebase-admin`.

## Endpoints

| Método | Ruta | Protegida | Descripción |
|---|---|---|---|
| POST | `/auth/login` | No | Body `{ email, password }` → `{ type: "Bearer", token }` |
| GET | `/api/products` | No | Lista todos los productos |
| GET | `/api/products/:id` | No | Producto por ID |
| POST | `/api/products/create` | Sí | Crea un producto (`name` y `price` obligatorios) |
| PUT | `/api/products/:id` | Sí | *(extra)* Actualiza campos de un producto |
| DELETE | `/api/products/:id` | Sí | Elimina un producto |

Las rutas protegidas requieren el header `Authorization: Bearer <token>`.

## Códigos de estado

| Código | Cuándo |
|---|---|
| 200 / 201 | OK / producto creado |
| 400 | Body inválido, JSON mal formado o faltan campos |
| 401 | Credenciales incorrectas en el login, o no se envió token |
| 403 | Se envió un token inválido o expirado |
| 404 | Ruta inexistente o producto no encontrado |
| 500 | Error interno o Firestore no responde |
