export interface Categoria {
  id: number
  nombre: string
  descripcion: string
}

// Datos del formulario: igual que Categoria pero sin el id (lo genera el backend)
export type CategoriaInput = Omit<Categoria, 'id'>
