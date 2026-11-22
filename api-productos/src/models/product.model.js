// Capa de MODELOS: es la única que habla directamente con Firestore.
// Si mañana cambiamos de base de datos, solo se toca este archivo.
// Usamos get...FromServer para que, si Firestore no responde, falle (y respondamos 500)
// en vez de devolver datos viejos o vacíos desde la caché local del SDK.
import {
  collection,
  doc,
  getDocsFromServer,
  getDocFromServer,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../config/firebase.js";

const productsCollection = collection(db, "products");

export const getAllProducts = async () => {
  const snapshot = await getDocsFromServer(productsCollection);
  // Cada documento trae su id por separado de los datos, los juntamos
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const getProductById = async (id) => {
  const snapshot = await getDocFromServer(doc(productsCollection, id));
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() };
};

export const createProduct = async (data) => {
  const ref = await addDoc(productsCollection, data);
  return { id: ref.id, ...data };
};

export const updateProduct = async (id, data) => {
  const ref = doc(productsCollection, id);
  const snapshot = await getDocFromServer(ref);
  if (!snapshot.exists()) return null;
  await updateDoc(ref, data);
  return { id, ...snapshot.data(), ...data };
};

export const deleteProduct = async (id) => {
  const ref = doc(productsCollection, id);
  const snapshot = await getDocFromServer(ref);
  if (!snapshot.exists()) return false;
  await deleteDoc(ref);
  return true;
};
