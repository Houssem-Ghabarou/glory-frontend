// app/layout.tsx

import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Glory",
  description: "Interface de gestion pour les administrateurs.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <main>{children}</main>
        <Toaster
          position="top-center"
          toastOptions={{
            success: {
              style: {
                background: "#4ade80",
                color: "white",
              },
            },
            error: {
              style: {
                background: "#f87171",
                color: "white",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
