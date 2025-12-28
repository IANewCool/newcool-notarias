import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Notarias Chile - Aranceles y Tramites | NewCooltura Informada",
  description: "Buscador de notarias, tramites notariales, aranceles y documentos requeridos en Chile",
  keywords: ["notarias Chile", "aranceles notariales", "escrituras", "poderes", "legalizacion documentos"],
  openGraph: {
    title: "Notarias Chile - NewCooltura Informada",
    description: "Aranceles y tramites notariales",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
