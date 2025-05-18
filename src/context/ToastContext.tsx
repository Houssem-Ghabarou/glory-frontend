"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { toast, Toaster, ToastOptions } from "react-hot-toast";

type ToastContextType = {
  showError: (message: string, options?: ToastOptions) => void;
  showSuccess: (message: string, options?: ToastOptions) => void;
  showInfo: (message: string, options?: ToastOptions) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ToastContext.Provider
      value={{
        showError: (msg, options) => toast.error(msg, options),
        showSuccess: (msg, options) => toast.success(msg, options),
        showInfo: (msg, options) => toast(msg, { ...options, icon: "ℹ️" }),
      }}
    >
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            fontWeight: "bold",
          },
        }}
      />
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
