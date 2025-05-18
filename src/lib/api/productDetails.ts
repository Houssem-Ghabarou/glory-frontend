import { getter } from "@/axios/api";
import { Product } from "@/types/models/product";

export const getProductDetailsById = async (
  productId: string
): Promise<Product> => {
  try {
    const res = await getter(`/products/product/${productId}`);
    return res as Product;
  } catch (err) {
    console.error("Error fetching product details:", err);
    throw new Error("Failed to fetch product details");
  }
};
