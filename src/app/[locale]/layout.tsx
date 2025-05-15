import type { Metadata } from "next";
import "@/styles/globals.css";
import { beatriceFonts } from "@/assets/fonts";
import Footer from "@/components/shared/footer/Footer";
import Header from "@/components/shared/header/Header";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import "keen-slider/keen-slider.min.css";
import { CartProvider } from "@/components/shared/cart/CartContext";

export const metadata: Metadata = {
  title: "GLORY",
  description: "GLORY clothing brand store",
};
import { routing } from "../../../i18n/routing";
import CartModal from "@/components/shared/cart/Cart-modal";
import NewsletterModal from "@/components/shared/newsLetter/NewsLetterModal";
import VideoModal from "@/components/shared/videoModal/VideoModal";
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
        <CartProvider>
          <NextIntlClientProvider>
            <div className="min-h-screen">
              <CartModal />

              <Header />

              {/* Overlay */}
              {/* App Content */}
              <div className="relative ">
                {children}
                {/* <VideoModal /> */}
                <NewsletterModal />
              </div>

              <Footer />
            </div>
          </NextIntlClientProvider>
        </CartProvider>
      </body>
    </html>
  );
}
