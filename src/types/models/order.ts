import { Product } from "./product";

export interface OrderItem {
  product: Product | string; // string quand c'est juste l'ID
  size: string;
  color: string;
  quantity: number;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2?: string;
  governorate: string;
  // ville: string; // C
  zipCode: string;
  agreeToTerms?: boolean;
}

export type OrderStatus = "Pending" | "Cancelled" | "Completed";

export interface Order {
  _id: string;
  user: string | null;
  customerInfo: CustomerInfo;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  orderNumber: string;

  createdAt: string;
  updatedAt: string;
}
