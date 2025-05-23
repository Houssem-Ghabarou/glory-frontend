"use server";
import { poster } from "@/axios/api";

export const subscribeToNewsletter = async (email: string) => {
  try {
    const response = await poster("/newsletter/newsletter", { email });
    return { success: true, data: response };
  } catch (error: any) {
    console.error("Newsletter error:", error?.response?.data || error.message);
    return {
      success: false,
      message: error?.response?.data?.message || "Erreur inconnue",
    };
  }
};
