"use server";

import { getter } from "@/axios/api";
import { Item } from "@/types/item";

const getProductsByRefs = async (refs: string[]): Promise<Item[]> => {
  if (!refs.length) return [];

  try {
    const res = await getter<Item[]>("/products/products/by-references", {
      references: refs.join(","),
    });
    return res || [];
  } catch (error) {
    console.error("Server error fetching products:", error);
    throw new Error("Unable to fetch products");
  }
};
export default getProductsByRefs;
