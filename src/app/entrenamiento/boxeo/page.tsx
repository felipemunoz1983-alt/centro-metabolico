import type { Metadata } from "next";
import { BoxeoClient } from "./BoxeoClient";

export const metadata: Metadata = {
  title: "Boxeo Funcional",
  description:
    "Boxeo funcional en grupos reducidos: técnica de golpeo, trabajo de pies y acondicionamiento de alta intensidad. Sin sparring ni contacto.",
  alternates: { canonical: "/centro-metabolico/entrenamiento/boxeo/" },
  openGraph: {
    title: "Boxeo Funcional — Centro Metabólico",
    description: "Técnica de boxeo y acondicionamiento en grupos reducidos. Sin contacto.",
    url: "https://felipemunoz1983-alt.github.io/centro-metabolico/entrenamiento/boxeo/",
    images: [{ url: "/centro-metabolico/boxeo.webp", width: 1200, height: 630, alt: "Boxeo Funcional — Centro Metabólico" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Boxeo Funcional — Centro Metabólico",
    description: "Técnica de boxeo y acondicionamiento, sin contacto.",
    images: ["/centro-metabolico/boxeo.webp"],
  },
};

export default function BoxeoPage() {
  return <BoxeoClient />;
}
