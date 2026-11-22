// Capa de CONTROLADORES: recibe req, llama al servicio y arma la respuesta (res).
// En Express 5, si una función async lanza un error, se envía solo
// al middleware de errores: no hace falta try/catch en cada controlador.
import * as productsService from "../services/products.service.js";

export const getAllProducts = async (req, res) => {
  const products = await productsService.getAll();
  res.status(200).json(products);
};

export const getProductById = async (req, res) => {
  const product = await productsService.getById(req.params.id);
  res.status(200).json(product);
};

export const createProduct = async (req, res) => {
  const product = await productsService.create(req.body);
  res.status(201).json(product); // 201 = Created
};

export const updateProduct = async (req, res) => {
  const product = await productsService.update(req.params.id, req.body);
  res.status(200).json(product);
};

export const deleteProduct = async (req, res) => {
  await productsService.remove(req.params.id);
  res.status(200).json({ message: `Producto ${req.params.id} eliminado` });
};
