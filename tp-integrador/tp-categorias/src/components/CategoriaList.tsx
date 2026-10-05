import type { Categoria } from '../types/categoria'
import CategoriaCard from './CategoriaCard'

interface CategoriaListProps {
  categorias: Categoria[]
  onEdit: (categoria: Categoria) => void
  onDelete: (id: number) => void
}

function CategoriaList({ categorias, onEdit, onDelete }: CategoriaListProps) {
  if (categorias.length === 0) {
    return (
      <p className="py-10 text-center text-gray-500">
        No hay categorías cargadas. ¡Creá la primera!
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categorias.map((categoria) => (
        <CategoriaCard
          key={categoria.id}
          categoria={categoria}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default CategoriaList
