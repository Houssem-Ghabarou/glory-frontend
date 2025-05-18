import React from "react";
import Collections from "./Collections";
import { getter } from "@/axios/api";
import { Product } from "@/types/models/product";

const ProductCollections = async () => {
  let products: Product[] = [];
  try {
    products = await getter<Product[]>("/products/product");
    // You can add logic here to handle the fetched products if needed
  } catch (error) {
    console.error("Error fetching products:", error);
    // Handle the error appropriately, e.g., show a message to the user
  }

  if (products?.length === 0) {
    return null; // or some fallback UI
  }
  return (
    <Collections
      products={products} // Pass the fetched products to the Collections component
    />
  );
};

export default ProductCollections;
