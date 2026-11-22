// Se ejecuta cuando ninguna ruta coincidió con la petición
export const notFound = (req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada",
    path: req.originalUrl,
    method: req.method,
  });
};
