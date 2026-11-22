// Middleware que protege rutas: verifica que venga un JWT válido.
// El cliente debe enviar el header:  Authorization: Bearer <token>
import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 401 Unauthorized -> no se identificó (no mandó token)
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Token no proporcionado. Usá: Authorization: Bearer <token>" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // verify comprueba la firma y la expiración; si falla, lanza un error
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // dejamos los datos del usuario disponibles para el controlador
    next();
  } catch (error) {
    // 403 Forbidden -> mandó un token, pero no es válido o expiró
    const message =
      error.name === "TokenExpiredError" ? "El token expiró" : "Token inválido";
    return res.status(403).json({ error: message });
  }
};
