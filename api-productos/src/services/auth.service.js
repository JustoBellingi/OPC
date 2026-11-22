// Lógica de autenticación: validar credenciales y generar el token JWT.
import jwt from "jsonwebtoken";
import { HttpError } from "../utils/httpError.js";

export const login = (body) => {
  const { email, password } = body || {};

  if (!email || !password) {
    throw new HttpError(400, "Se requieren 'email' y 'password'");
  }

  // Usuario administrador definido en las variables de entorno.
  // (En un sistema real buscaríamos al usuario en la BD y compararíamos
  //  el password hasheado con bcrypt.)
  const isValid =
    email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD;

  if (!isValid) {
    throw new HttpError(401, "Credenciales inválidas");
  }

  // El "payload" es la info que viaja dentro del token (¡nunca poner contraseñas!)
  const payload = { email, role: "admin" };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  });

  return token;
};
