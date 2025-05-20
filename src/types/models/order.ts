import { Product } from "./product";

export interface OrderItem {
  product: Product | string; // string quand c'est juste l'ID
  size: string;
  color: string;
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  email: string;
  gouvernourat: string;
  ville: string;
  address: string;
  phone: string;
}

export type OrderStatus = "Pending" | "Cancelled" | "Completed";

export interface Order {
  _id: string;
  user: string | null;
  customerInfo: CustomerInfo;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}
