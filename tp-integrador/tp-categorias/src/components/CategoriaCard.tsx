import type { Categoria } from '../types/categoria'

interface CategoriaCardProps {
  categoria: Categoria
  onEdit: (categoria: Categoria) => void
  onDelete: (id: number) => void
}

function CategoriaCard({ categoria, onEdit, onDelete }: CategoriaCardProps) {
  return (
    <div className="flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{categoria.nombre}</h3>
        <p className="mt-1 text-sm text-gray-600">
          {categoria.descripcion || 'Sin descripción'}
        </p>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onEdit(categoria)}
          className="flex-1 rounded-md bg-amber-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-amber-600"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(categoria.id)}
          className="flex-1 rounded-md bg-red-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-600"
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}

export default CategoriaCard
