import type { Metadata } from "next";
import { beatriceFonts } from "@/assets/fonts";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import "keen-slider/keen-slider.min.css";
import { routing } from "../../../../../i18n/routing";

export const metadata: Metadata = {
  title: "Login - GLORY",
  description: "Login to your GLORY account",
};

export default async function LoginLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html className={beatriceFonts.variable} lang={locale}>
      <body>
        <NextIntlClientProvider>
          <div className="min-h-screen">{children}</div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
