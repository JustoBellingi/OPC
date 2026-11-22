// Capa de SERVICIOS: lógica de negocio (validaciones, reglas).
// No sabe nada de req/res (eso es del controlador) ni de Firestore (eso es del modelo).
import * as Product from "../models/product.model.js";
import { HttpError } from "../utils/httpError.js";

// Valida y "limpia" los datos de un producto.
// partial = true se usa al actualizar (no todos los campos son obligatorios).
const validateProduct = (body, partial = false) => {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new HttpError(400, "El body debe ser un objeto JSON");
  }

  const { name, price, stock, category, description } = body;
  const data = {};

  if (name !== undefined) {
    if (typeof name !== "string" || !name.trim()) {
      throw new HttpError(400, "'name' debe ser un texto no vacío");
    }
    data.name = name.trim();
  } else if (!partial) {
    throw new HttpError(400, "El campo 'name' es obligatorio");
  }

  if (price !== undefined) {
    if (typeof price !== "number" || price < 0) {
      throw new HttpError(400, "'price' debe ser un número mayor o igual a 0");
    }
    data.price = price;
  } else if (!partial) {
    throw new HttpError(400, "El campo 'price' es obligatorio");
  }

  if (stock !== undefined) {
    if (!Number.isInteger(stock) || stock < 0) {
      throw new HttpError(400, "'stock' debe ser un entero mayor o igual a 0");
    }
    data.stock = stock;
  } else if (!partial) {
    data.stock = 0;
  }

  if (category !== undefined) {
    if (typeof category !== "string") {
      throw new HttpError(400, "'category' debe ser un texto");
    }
    data.category = category.trim();
  }

  if (description !== undefined) {
    if (typeof description !== "string") {
      throw new HttpError(400, "'description' debe ser un texto");
    }
    data.description = description.trim();
  }

  if (partial && Object.keys(data).length === 0) {
    throw new HttpError(400, "No se envió ningún campo válido para actualizar");
  }

  return data;
};

export const getAll = () => Product.getAllProducts();

export const getById = async (id) => {
  const product = await Product.getProductById(id);
  if (!product) throw new HttpError(404, `No existe un producto con id ${id}`);
  return product;
};

export const create = (body) => {
  const data = validateProduct(body);
  return Product.createProduct(data);
};

export const update = async (id, body) => {
  const data = validateProduct(body, true);
  const product = await Product.updateProduct(id, data);
  if (!product) throw new HttpError(404, `No existe un producto con id ${id}`);
  return product;
};

export const remove = async (id) => {
  const deleted = await Product.deleteProduct(id);
  if (!deleted) throw new HttpError(404, `No existe un producto con id ${id}`);
};
