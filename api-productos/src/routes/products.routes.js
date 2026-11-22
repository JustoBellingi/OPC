// Capa de RUTAS: solo define URL + método HTTP + qué controlador lo atiende.
import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

// Lectura: pública (la tienda puede mostrar el catálogo sin login)
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Escritura: protegida con JWT (solo administradores logueados)
// OJO: "/create" va ANTES de cualquier "/:id" con POST para que no se confunda
router.post("/create", authenticate, createProduct);
router.put("/:id", authenticate, updateProduct); // extra: completa el CRUD
router.delete("/:id", authenticate, deleteProduct);

export default router;
