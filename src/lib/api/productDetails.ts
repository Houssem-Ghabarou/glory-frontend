import { getter } from "@/axios/api";
import { Item as ProductItem } from "@/types/item";

export const getProductDetailsById = async (
  productId: string
): Promise<ProductItem> => {
  try {
    const res = await getter(`/products/product/${productId}`);
    return res as ProductItem;
  } catch (err) {
    console.error("Error fetching product details:", err);
    throw new Error("Failed to fetch product details");
  }
};
