import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.categoria.router import router as categoria_router
from app.core.database import Base, engine
from app.producto.router import router as producto_router

# Crea las tablas en la base de datos si todavía no existen
Base.metadata.create_all(bind=engine)

app = FastAPI(title="API Productos y Categorías")

# CORS: permite que el frontend (Vite, puerto 5173) llame a esta API (puerto 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "http://localhost:5173")],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(categoria_router)
app.include_router(producto_router)


@app.get("/")
def raiz():
    return {"mensaje": "API funcionando. Documentación en /docs"}
