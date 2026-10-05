import { useEffect, useState } from 'react'
import CategoriaList from './components/CategoriaList'
import CategoriaModal from './components/CategoriaModal'
import Navbar from './components/Navbar'
import type { Categoria, CategoriaInput } from './types/categoria'

const API_URL = 'http://localhost:8000/categorias'

function App() {
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<Categoria | null>(null)
  const [error, setError] = useState<string | null>(null)

  // GET /categorias al montar el componente (el [] hace que corra una sola vez)
  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const res = await fetch(API_URL)
        if (!res.ok) throw new Error(`Error ${res.status}`)
        const data: Categoria[] = await res.json()
        setCategorias(data)
      } catch {
        setError('No se pudieron cargar las categorías. ¿Está corriendo el backend?')
      }
    }
    cargarCategorias()
  }, [])

  // POST /categorias
  const handleCreate = async (datos: CategoriaInput) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
      })
      if (!res.ok) throw new Error(`Error ${res.status}`)
      const nueva: Categoria = await res.json()
      setCategorias([...categorias, nueva])
      cerrarModal()
    } catch {
      setError('No se pudo crear la categoría.')
    }
  }

  // PUT /categorias/{id}
  const handleUpdate = async (id: number, datos: CategoriaInput) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
      })
      if (!res.ok) throw new Error(`Error ${res.status}`)
      const actualizada: Categoria = await res.json()
      setCategorias(categorias.map((c) => (c.id === id ? actualizada : c)))
      cerrarModal()
    } catch {
      setError('No se pudo actualizar la categoría.')
    }
  }

  // DELETE /categorias/{id}
  const handleDelete = async (id: number) => {
    if (!confirm('¿Seguro que querés eliminar esta categoría?')) return
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error(`Error ${res.status}`)
      setCategorias(categorias.filter((c) => c.id !== id))
    } catch {
      setError('No se pudo eliminar la categoría.')
    }
  }

  const abrirModalCrear = () => {
    setCategoriaSeleccionada(null)
    setIsModalOpen(true)
  }

  const abrirModalEditar = (categoria: Categoria) => {
    setCategoriaSeleccionada(categoria)
    setIsModalOpen(true)
  }

  const cerrarModal = () => {
    setIsModalOpen(false)
    setCategoriaSeleccionada(null)
  }

  // El modal llama a onSubmit; acá decidimos si es alta o edición
  const handleSubmit = (datos: CategoriaInput) => {
    setError(null)
    if (categoriaSeleccionada) {
      handleUpdate(categoriaSeleccionada.id, datos)
    } else {
      handleCreate(datos)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar titulo="Gestión de Categorías" />

      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">Categorías</h2>
          <button
            onClick={abrirModalCrear}
            className="rounded-md bg-indigo-600 px-4 py-2 font-medium text-white shadow hover:bg-indigo-700"
          >
            + Nueva categoría
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-red-700">
            {error}
          </div>
        )}

        <CategoriaList
          categorias={categorias}
          onEdit={abrirModalEditar}
          onDelete={handleDelete}
        />
      </main>

      <CategoriaModal
        isOpen={isModalOpen}
        categoria={categoriaSeleccionada}
        onClose={cerrarModal}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default App
