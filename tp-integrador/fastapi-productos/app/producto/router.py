from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.categoria import service as categoria_service
from app.categoria.schema import CategoriaOut
from app.core.database import get_db
from app.producto import service
from app.producto.schema import (
    ProductoCategoriaOut,
    ProductoCreate,
    ProductoOut,
    ProductoUpdate,
)

router = APIRouter(prefix="/productos", tags=["Productos"])


def _buscar_o_404(db: Session, producto_id: int):
    producto = service.obtener(db, producto_id)
    if producto is None:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return producto


# ---------- CRUD Producto ----------

@router.get("", response_model=list[ProductoOut])
def listar_productos(db: Session = Depends(get_db)):
    return service.listar(db)


@router.get("/{producto_id}", response_model=ProductoOut)
def obtener_producto(producto_id: int, db: Session = Depends(get_db)):
    return _buscar_o_404(db, producto_id)


@router.post("", response_model=ProductoOut, status_code=status.HTTP_201_CREATED)
def crear_producto(datos: ProductoCreate, db: Session = Depends(get_db)):
    return service.crear(db, datos)


@router.put("/{producto_id}", response_model=ProductoOut)
def actualizar_producto(producto_id: int, datos: ProductoUpdate, db: Session = Depends(get_db)):
    producto = _buscar_o_404(db, producto_id)
    return service.actualizar(db, producto, datos)


@router.delete("/{producto_id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_producto(producto_id: int, db: Session = Depends(get_db)):
    producto = _buscar_o_404(db, producto_id)
    service.eliminar(db, producto)


# ---------- Relación ProductoCategoria ----------

@router.get("/{producto_id}/categorias", response_model=list[CategoriaOut])
def listar_categorias_de_producto(producto_id: int, db: Session = Depends(get_db)):
    return _buscar_o_404(db, producto_id).categorias


@router.post(
    "/{producto_id}/categorias/{categoria_id}",
    response_model=ProductoCategoriaOut,
    status_code=status.HTTP_201_CREATED,
)
def asignar_categoria(producto_id: int, categoria_id: int, db: Session = Depends(get_db)):
    _buscar_o_404(db, producto_id)
    if categoria_service.obtener(db, categoria_id) is None:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")
    if service.obtener_relacion(db, producto_id, categoria_id):
        raise HTTPException(status_code=409, detail="El producto ya tiene esa categoría")
    return service.agregar_categoria(db, producto_id, categoria_id)


@router.delete("/{producto_id}/categorias/{categoria_id}", status_code=status.HTTP_204_NO_CONTENT)
def quitar_categoria(producto_id: int, categoria_id: int, db: Session = Depends(get_db)):
    relacion = service.obtener_relacion(db, producto_id, categoria_id)
    if relacion is None:
        raise HTTPException(status_code=404, detail="El producto no tiene esa categoría")
    service.quitar_categoria(db, relacion)
