import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

import "@/styles/globals.css";

export const metadata = {
  title: "Connexion",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <main className="min-h-screen flex items-center justify-center text-black">
          <AuthProvider>
            {children}
            <Toaster position="top-center" reverseOrder={false} />
          </AuthProvider>
        </main>
      </body>
    </html>
  );
}
