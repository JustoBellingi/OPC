from pydantic import BaseModel, ConfigDict, Field


class CategoriaBase(BaseModel):
    nombre: str = Field(..., min_length=1, max_length=100)
    descripcion: str = Field("", max_length=255)


class CategoriaCreate(CategoriaBase):
    """Datos que llegan en el POST (sin id, lo genera la DB)."""


class CategoriaUpdate(CategoriaBase):
    """Datos que llegan en el PUT."""


class CategoriaOut(CategoriaBase):
    """Lo que devuelve la API (incluye el id)."""

    id: int

    model_config = ConfigDict(from_attributes=True)
