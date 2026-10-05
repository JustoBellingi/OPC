# Frontend — Gestión de Categorías (React + TypeScript + Tailwind)

## Cómo correrlo

```bash
pnpm install
pnpm dev
```

Abrir http://localhost:5173. El backend (FastAPI) tiene que estar corriendo en http://localhost:8000.

## Estructura

```
src/
├── App.tsx                  # Estado (useState), carga inicial (useEffect) y fetch al backend
├── main.tsx
├── index.css                # Importa Tailwind
├── types/
│   ├── categoria.ts         # interface Categoria
│   └── producto.ts          # interface Producto
└── components/
    ├── Navbar.tsx
    ├── CategoriaCard.tsx
    ├── CategoriaList.tsx
    └── CategoriaModal.tsx
```
