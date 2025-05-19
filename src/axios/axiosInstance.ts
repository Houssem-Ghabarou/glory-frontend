import axios from "axios";
import { ErrorMessages } from "@/lib/erreurMessages";
import { envconf } from "@/lib/env/envconf";

type ErrorHandler = (message: string) => void;
let errorHandler: ErrorHandler | null = null;

export const setAxiosErrorHandler = (handler: ErrorHandler) => {
  errorHandler = handler;
};

export const axiosInstance = axios.create({
  baseURL: envconf.API_URL,
  headers: { "Content-Type": "application/json" },
}); 
