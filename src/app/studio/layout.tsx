// app/layout.tsx or app/layout.js

export const metadata = {
  title: "Studio admin glory CMS",
  description: "Admin CMS for the website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
