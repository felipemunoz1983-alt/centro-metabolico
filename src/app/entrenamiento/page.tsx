import type { Metadata } from "next";
import { EntrenamientoClient } from "./EntrenamientoClient";

export const metadata: Metadata = {
  title: "Entrenamiento Personalizado",
  description:
    "Funcional, Fuerza, Stretching y Movilidad. Programas diseñados con tecnología de precisión para transformar tu rendimiento en Centro Metabólico, Santiago.",
  alternates: {
    canonical: "/centro-metabolico/entrenamiento/",
  },
  openGraph: {
    title: "Entrenamiento Personalizado — Centro Metabólico",
    description:
      "Funcional, Fuerza, Stretching y Movilidad. Programas diseñados con tecnología de precisión para transformar tu rendimiento.",
    url: "https://felipemunoz1983-alt.github.io/centro-metabolico/entrenamiento/",
    images: [
      {
        url: "/centro-metabolico/entrenamiento_funcional2.webp",
        width: 1200,
        height: 630,
        alt: "Entrenamiento Personalizado — Centro Metabólico",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Entrenamiento Personalizado — Centro Metabólico",
    description:
      "Funcional, Fuerza, Stretching y Movilidad. Programas diseñados con tecnología de precisión.",
    images: ["/centro-metabolico/entrenamiento_funcional2.webp"],
  },
};

export default function EntrenamientoPage() {
  return <EntrenamientoClient />;
}
