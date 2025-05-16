//lib/prod.ts
import { getErrorMessage } from "./getErrorMessage";

export const getProducts = async () => {
  const res = await fetch("http://localhost:5000/products/product");
  if (!res.ok) throw new Error("Erreur lors de la récupération des produits");
  return res.json();
};

export const getOrders = async () => {
  const res = await fetch("http://localhost:5000/orders/order");
  if (!res.ok) throw new Error("Erreur lors de la récupération des commandes");
  return res.json();
};
