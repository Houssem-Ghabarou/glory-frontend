"use server";

import { getter } from "@/axios/api";
import { Product } from "@/types/models/product";
const getProductsByRefs = async (refs: string[]): Promise<Product[]> => {
  if (!refs.length) return [];

  try {
    const res = await getter<Product[]>("/products/products/by-references", {
      references: refs.join(","),
    });
    return res || [];
  } catch (error) {
    console.error("Server error fetching products:", error);
    throw new Error("Unable to fetch products");
  }
};
export default getProductsByRefs;
