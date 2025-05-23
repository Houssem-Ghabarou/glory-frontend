"use server";
import { poster } from "@/axios/api";
import { getErrorMessage } from "../getErrorMessage";

interface LoginResponse {
  success: boolean;
  user?: any;
  token?: string;
  error?: string;
  errorCode?: string;
}

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = (await poster("/auth/login", { email, password })) as {
      user: any;
      token: string;
    };

    return {
      success: true,
      user: response.user,
      token: response.token,
    };
  } catch (error: any) {
    const errorCode = error?.response?.data?.errorCode;
    const message =
      getErrorMessage(errorCode) ||
      error?.response?.data?.message ||
      "Erreur inconnue";

    console.error("Login error:", message);

    return {
      success: false,
      error: message,
      errorCode,
    };
  }
};
