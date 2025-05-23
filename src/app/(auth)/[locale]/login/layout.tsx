import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

import "@/styles/globals.css";
import { beatriceFonts } from "@/assets/fonts";

export const metadata = {
  title: "Connexion",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={beatriceFonts.variable} lang="fr">
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
