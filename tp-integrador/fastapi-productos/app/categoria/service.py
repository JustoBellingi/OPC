from sqlalchemy.orm import Session

from app.categoria.model import Categoria
from app.categoria.schema import CategoriaCreate, CategoriaUpdate


def listar(db: Session) -> list[Categoria]:
    return db.query(Categoria).all()


def obtener(db: Session, categoria_id: int) -> Categoria | None:
    return db.get(Categoria, categoria_id)


def crear(db: Session, datos: CategoriaCreate) -> Categoria:
    categoria = Categoria(**datos.model_dump())
    db.add(categoria)
    db.commit()
    db.refresh(categoria)
    return categoria


def actualizar(db: Session, categoria: Categoria, datos: CategoriaUpdate) -> Categoria:
    for campo, valor in datos.model_dump().items():
        setattr(categoria, campo, valor)
    db.commit()
    db.refresh(categoria)
    return categoria


def eliminar(db: Session, categoria: Categoria) -> None:
    db.delete(categoria)
    db.commit()
