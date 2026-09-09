import type { Metadata } from "next";
import { HibridoClient } from "./HibridoClient";

export const metadata: Metadata = {
  title: "Entrenamiento Híbrido",
  description:
    "Entrenamiento híbrido estilo Hyrox: fuerza y resistencia en la misma sesión. Corres + estaciones funcionales (trineo, remo, sandbag, wall balls) para mejorar tu capacidad aeróbica, potencia y resistencia. Grupos reducidos, martes y jueves 19:00.",
  alternates: { canonical: "/centro-metabolico/entrenamiento/hibrido/" },
  openGraph: {
    title: "Entrenamiento Híbrido — Centro Metabólico",
    description:
      "Fuerza + resistencia en la misma sesión, estilo Hyrox. Acondicionamiento integral en grupos reducidos. Martes y jueves 19:00.",
    url: "https://felipemunoz1983-alt.github.io/centro-metabolico/entrenamiento/hibrido/",
    images: [{ url: "/centro-metabolico/funcional2.webp", width: 1200, height: 630, alt: "Entrenamiento Híbrido — Centro Metabólico" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Entrenamiento Híbrido — Centro Metabólico",
    description: "Fuerza + resistencia en la misma sesión, estilo Hyrox. Martes y jueves 19:00.",
    images: ["/centro-metabolico/funcional2.webp"],
  },
};

export default function HibridoPage() {
  return <HibridoClient />;
}
