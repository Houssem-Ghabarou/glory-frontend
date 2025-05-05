import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GLORY",
  description: "GLORY clothing brand store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="relative min-h-screen">
          {/* Background Image */}
          <Image
            src="/images/noise4.jpeg"
            fill
            alt="hero"
            className="w-full h-full object-cover object-center"
          />

          {/* App Content */}
          <div className="relative z-10">{children}</div>
        </div>
      </body>
    </html>
  );
}
