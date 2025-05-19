import { getErrorMessage } from "../getErrorMessage";
import { envconf } from "../env/envconf";
import { axiosInstance } from "@/axios/axiosInstance";

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

export const sendProductForm = async (
  formData: FormData,
  isEdit: boolean,
  productId?: string
) => {
  const API_URL = "http://localhost:5000/products/product";
  const url = isEdit && productId ? `${API_URL}/${productId}` : API_URL;
  const method = isEdit && productId ? "put" : "post";

  try {
    const res = await axiosInstance.request({
      url,
      method,
      data: formData,
      headers: {
        // Ne PAS fixer Content-Type, laisse axios le gérer automatiquement pour FormData
        // "Content-Type": "multipart/form-data" <-- à ne pas mettre ici
      },
    });

    return res.data;
  } catch (error: any) {
    // Gestion d'erreur axios
    if (error.response) {
      const message =
        error.response.data?.message ||
        `Erreur HTTP ${error.response.status}: ${error.response.statusText}`;
      throw new Error(message);
    }
    throw error;
  }
};
