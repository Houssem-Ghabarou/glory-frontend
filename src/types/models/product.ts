// types/models/product.ts

export interface ProductVariation {
  size: string;
  color: string;
  stock: number;
}

export interface Product {
  _id: string;
  name: string;
  description?: string;
  collection: string;
  price: number;
  images: string[];
  category?: string;
  variations: ProductVariation[];
  createdAt?: string;
  updatedAt?: string;
}
