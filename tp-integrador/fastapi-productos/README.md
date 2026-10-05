# Backend — FastAPI Productos y Categorías

## Cómo correrlo

```bash
python -m venv .venv
source .venv/bin/activate      # macOS/Linux
.venv\Scripts\activate         # Windows
pip install -r requirements.txt
fastapi dev app/main.py
```

- API: http://localhost:8000
- Documentación automática (Swagger): http://localhost:8000/docs

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | /categorias | Lista todas las categorías |
| GET | /categorias/{id} | Obtiene una categoría |
| POST | /categorias | Crea una categoría |
| PUT | /categorias/{id} | Edita una categoría |
| DELETE | /categorias/{id} | Elimina una categoría |
| GET | /productos | Lista todos los productos (con sus categorías) |
| GET | /productos/{id} | Obtiene un producto |
| POST | /productos | Crea un producto |
| PUT | /productos/{id} | Edita un producto |
| DELETE | /productos/{id} | Elimina un producto |
| GET | /productos/{id}/categorias | Categorías de un producto |
| POST | /productos/{id}/categorias/{categoria_id} | Asigna una categoría a un producto |
| DELETE | /productos/{id}/categorias/{categoria_id} | Quita una categoría de un producto |

Los endpoints de Productos y ProductoCategoria se prueban con el archivo `requests.http`
(extensión **REST Client** de VS Code: abrir el archivo y hacer clic en "Send Request").

La base de datos es SQLite (`productos.db`), se crea sola al iniciar el servidor.
