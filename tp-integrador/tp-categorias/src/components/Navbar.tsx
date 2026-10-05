interface NavbarProps {
  titulo: string
}

function Navbar({ titulo }: NavbarProps) {
  return (
    <nav className="bg-indigo-600 shadow-md">
      <div className="mx-auto max-w-5xl px-4 py-4">
        <h1 className="text-xl font-bold text-white">{titulo}</h1>
      </div>
    </nav>
  )
}

export default Navbar
