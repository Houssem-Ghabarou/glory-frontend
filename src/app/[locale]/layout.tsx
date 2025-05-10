import type { Metadata } from "next";
import Image from "next/image";
import "@/styles/globals.css";
import { beatriceFonts } from "@/assets/fonts";
import Footer from "@/components/shared/footer/Footer";
import Header from "@/components/shared/header/Header";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import backgroundIMage from "@/assets/images/noise4.jpeg";
export const metadata: Metadata = {
  title: "GLORY",
  description: "GLORY clothing brand store",
};
import { routing } from "../../../i18n/routing";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Get the current locale from the URL
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html className={beatriceFonts.variable} lang={locale}>
      <body>
        <NextIntlClientProvider>
          <div className="relative min-h-screen">
            {/* Background Image */}
            <Image
              src={backgroundIMage}
              fill
              alt="hero"
              className="w-full h-full object-cover object-center"
            />

            {/* Header */}

            <Header />

            {/* Overlay */}
            {/* App Content */}
            <div className="relative z-10">{children}</div>

            {/* Footer */}

            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
