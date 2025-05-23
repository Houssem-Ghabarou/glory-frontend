"use server";
import { poster, putter } from "@/axios/api";
import axios from "axios";

interface OrderPayload {
  items: any[]; // or your Item type
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address1: string;
    address2: string;
    governorate: string;
    zipCode: string;
    agreeToTerms: boolean;
  };
}
export const placeOrder = async (data: OrderPayload) => {
  try {
    const response = await poster("/orders/order", data);
    return { success: true, data: response };
  } catch (error: any) {
    console.error("Order error:", error?.response?.data || error.message);
    return {
      success: false,
      message: error?.response?.data?.message || "Unknown error occurred",
    };
  }
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  try {
    const response = await putter(`/orders/order/status/${orderId}`, {
      status,
    });

    return { success: true, data: response };
  } catch (error: any) {
    console.error(
      "Update status error:",
      error?.response?.data || error.message
    );

    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "Erreur inconnue lors de la mise à jour",
    };
  }
};

export const cancelOrder = async (orderId: string) => {
  try {
    const response = await putter(`/orders/cancelorder/${orderId}`, {});
    return { success: true, data: response };
  } catch (error: any) {
    console.error(
      "Cancel order error:",
      error?.response?.data || error.message
    );
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "Erreur inconnue lors de l'annulation de la commande",
    };
  }
};
