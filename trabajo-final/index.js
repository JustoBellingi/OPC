// Punto de entrada de la aplicación
import "dotenv/config"; // carga las variables del archivo .env en process.env
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import productsRouter from "./src/routes/products.routes.js";
import authRouter from "./src/routes/auth.routes.js";
import { notFound } from "./src/middlewares/notFound.middleware.js";
import { errorHandler } from "./src/middlewares/error.middleware.js";

const app = express();
const PORT = process.env.PORT || 3000;

// ---------- Middlewares globales ----------
app.use(cors()); // habilita peticiones de otros orígenes (frontends de la empresa)
app.use(bodyParser.json()); // interpreta los body en formato JSON

// ---------- Rutas ----------
app.get("/", (req, res) => {
  res.json({ message: "API de productos funcionando 🚀" });
});
app.use("/api/products", productsRouter);
app.use("/auth", authRouter);

// ---------- Rutas desconocidas (404) ----------
// Va DESPUÉS de todas las rutas: si ninguna coincidió, llega acá.
app.use(notFound);

// ---------- Manejo centralizado de errores ----------
// Siempre último. Express lo reconoce porque recibe 4 parámetros.
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
