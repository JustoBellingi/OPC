from sqlalchemy.orm import Session

from app.producto.model import Producto, ProductoCategoria
from app.producto.schema import ProductoCreate, ProductoUpdate


# ---------- Producto ----------

def listar(db: Session) -> list[Producto]:
    return db.query(Producto).all()


def obtener(db: Session, producto_id: int) -> Producto | None:
    return db.get(Producto, producto_id)


def crear(db: Session, datos: ProductoCreate) -> Producto:
    producto = Producto(**datos.model_dump())
    db.add(producto)
    db.commit()
    db.refresh(producto)
    return producto


def actualizar(db: Session, producto: Producto, datos: ProductoUpdate) -> Producto:
    for campo, valor in datos.model_dump().items():
        setattr(producto, campo, valor)
    db.commit()
    db.refresh(producto)
    return producto


def eliminar(db: Session, producto: Producto) -> None:
    db.delete(producto)
    db.commit()


# ---------- ProductoCategoria ----------

def obtener_relacion(db: Session, producto_id: int, categoria_id: int) -> ProductoCategoria | None:
    return db.get(ProductoCategoria, (producto_id, categoria_id))


def agregar_categoria(db: Session, producto_id: int, categoria_id: int) -> ProductoCategoria:
    relacion = ProductoCategoria(producto_id=producto_id, categoria_id=categoria_id)
    db.add(relacion)
    db.commit()
    return relacion


def quitar_categoria(db: Session, relacion: ProductoCategoria) -> None:
    db.delete(relacion)
    db.commit()
