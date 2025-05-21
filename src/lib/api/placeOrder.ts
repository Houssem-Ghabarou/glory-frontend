"use server";
import { poster } from "@/axios/api";

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
