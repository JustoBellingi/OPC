from pydantic import BaseModel, ConfigDict, Field

from app.categoria.schema import CategoriaOut


class ProductoBase(BaseModel):
    nombre: str = Field(..., min_length=1, max_length=100)
    descripcion: str = Field("", max_length=255)
    precio_base: float = Field(..., ge=0)
    imagen_url: list[str] = []
    disponible: bool = True


class ProductoCreate(ProductoBase):
    pass


class ProductoUpdate(ProductoBase):
    pass


class ProductoOut(ProductoBase):
    id: int
    categorias: list[CategoriaOut] = []

    model_config = ConfigDict(from_attributes=True)


class ProductoCategoriaOut(BaseModel):
    producto_id: int
    categoria_id: int

    model_config = ConfigDict(from_attributes=True)
