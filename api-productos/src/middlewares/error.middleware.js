// Middleware centralizado de errores.
// Todos los errores lanzados en controladores/servicios/modelos terminan acá.
export const errorHandler = (err, req, res, next) => {
  // JSON mal formado en el body (lo detecta body-parser)
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "El body no es un JSON válido" });
  }

  // Errores que lanzamos nosotros a propósito (HttpError) traen su status
  if (err.status) {
    return res.status(err.status).json({ error: err.message });
  }

  // Cualquier otro error (ej: Firestore no responde) -> 500
  console.error("Error inesperado:", err);
  res.status(500).json({
    error: "Error interno del servidor o el servicio de datos no responde",
  });
};
