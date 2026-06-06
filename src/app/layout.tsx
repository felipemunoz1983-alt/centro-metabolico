import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Navbar } from "@/components/sections/Navbar";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-reto",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Centro Metabólico — Ciencia de Precisión para tu Metabolismo",
  description:
    "Evaluaciones metabólicas avanzadas, nutrición de precisión y entrenamiento personalizado basado en evidencia científica.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${bebasNeue.variable} h-full`}
    >
      <body className="min-h-full">
        <SmoothScrollProvider>
          <Navbar />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
