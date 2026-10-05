from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.categoria import service
from app.categoria.schema import CategoriaCreate, CategoriaOut, CategoriaUpdate
from app.core.database import get_db

router = APIRouter(prefix="/categorias", tags=["Categorías"])


def _buscar_o_404(db: Session, categoria_id: int):
    categoria = service.obtener(db, categoria_id)
    if categoria is None:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")
    return categoria


@router.get("", response_model=list[CategoriaOut])
def listar_categorias(db: Session = Depends(get_db)):
    return service.listar(db)


@router.get("/{categoria_id}", response_model=CategoriaOut)
def obtener_categoria(categoria_id: int, db: Session = Depends(get_db)):
    return _buscar_o_404(db, categoria_id)


@router.post("", response_model=CategoriaOut, status_code=status.HTTP_201_CREATED)
def crear_categoria(datos: CategoriaCreate, db: Session = Depends(get_db)):
    return service.crear(db, datos)


@router.put("/{categoria_id}", response_model=CategoriaOut)
def actualizar_categoria(categoria_id: int, datos: CategoriaUpdate, db: Session = Depends(get_db)):
    categoria = _buscar_o_404(db, categoria_id)
    return service.actualizar(db, categoria, datos)


@router.delete("/{categoria_id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_categoria(categoria_id: int, db: Session = Depends(get_db)):
    categoria = _buscar_o_404(db, categoria_id)
    service.eliminar(db, categoria)
