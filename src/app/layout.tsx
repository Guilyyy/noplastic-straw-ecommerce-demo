import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NoPlastic Straw - Paille metal gratuite",
  description:
    "Landing e-commerce demo inspiree du reel : paille metal gratuite, seuls les frais de livraison sont payes.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
