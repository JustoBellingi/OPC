import type { FormEvent } from 'react'
import type { Categoria, CategoriaInput } from '../types/categoria'

interface CategoriaModalProps {
  isOpen: boolean
  categoria: Categoria | null // null = crear, con datos = editar
  onClose: () => void
  onSubmit: (datos: CategoriaInput) => void
}

function CategoriaModal({ isOpen, categoria, onClose, onSubmit }: CategoriaModalProps) {
  if (!isOpen) return null

  const esEdicion = categoria !== null

  // Formulario "no controlado": leemos los valores con FormData al enviar,
  // así el componente no necesita hooks propios.
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    onSubmit({
      nombre: String(formData.get('nombre')).trim(),
      descripcion: String(formData.get('descripcion')).trim(),
    })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()} // evita que un clic adentro cierre el modal
      >
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          {esEdicion ? 'Editar categoría' : 'Nueva categoría'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nombre" className="mb-1 block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              required
              maxLength={100}
              defaultValue={categoria?.nombre ?? ''}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="descripcion" className="mb-1 block text-sm font-medium text-gray-700">
              Descripción
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              rows={3}
              maxLength={255}
              defaultValue={categoria?.descripcion ?? ''}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md bg-gray-200 px-4 py-2 font-medium text-gray-700 hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700"
            >
              {esEdicion ? 'Guardar cambios' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CategoriaModal
