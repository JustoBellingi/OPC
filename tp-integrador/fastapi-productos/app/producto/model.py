from sqlalchemy import JSON, Boolean, Float, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.categoria.model import Categoria
from app.core.database import Base


class ProductoCategoria(Base):
    """Tabla intermedia de la relación muchos-a-muchos Producto <-> Categoria."""

    __tablename__ = "producto_categoria"

    producto_id: Mapped[int] = mapped_column(
        ForeignKey("productos.id", ondelete="CASCADE"), primary_key=True
    )
    categoria_id: Mapped[int] = mapped_column(
        ForeignKey("categorias.id", ondelete="CASCADE"), primary_key=True
    )


class Producto(Base):
    __tablename__ = "productos"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    nombre: Mapped[str] = mapped_column(String(100), nullable=False)
    descripcion: Mapped[str] = mapped_column(String(255), default="")
    precio_base: Mapped[float] = mapped_column(Float, nullable=False)
    # SQLite no tiene tipo "lista", así que guardamos la lista de URLs como JSON
    imagen_url: Mapped[list[str]] = mapped_column(JSON, default=list)
    disponible: Mapped[bool] = mapped_column(Boolean, default=True)

    categorias: Mapped[list[Categoria]] = relationship(
        secondary="producto_categoria", lazy="selectin"
    )
