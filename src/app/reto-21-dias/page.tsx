import type { Metadata } from "next";
import { Reto21DiasClient } from "./Reto21DiasClient";

export const metadata: Metadata = {
  title: "Reto 21 Días",
  description:
    "Un programa intensivo de 3 semanas que combina evaluación metabólica, plan nutricional y entrenamiento guiado para crear hábitos que se mantienen. Únete en Centro Metabólico.",
  alternates: {
    canonical: "/centro-metabolico/reto-21-dias/",
  },
  openGraph: {
    title: "Reto 21 Días — Centro Metabólico",
    description:
      "Un programa intensivo de 3 semanas que combina evaluación metabólica, plan nutricional y entrenamiento guiado para crear hábitos que se mantienen.",
    url: "https://felipemunoz1983-alt.github.io/centro-metabolico/reto-21-dias/",
    images: [
      {
        url: "/centro-metabolico/reto21diasbanner.webp",
        width: 1200,
        height: 630,
        alt: "Reto 21 Días — Centro Metabólico",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reto 21 Días — Centro Metabólico",
    description:
      "Programa intensivo de 3 semanas: evaluación metabólica, nutrición y entrenamiento guiado.",
    images: ["/centro-metabolico/reto21diasbanner.webp"],
  },
};

export default function Reto21DiasPage() {
  return <Reto21DiasClient />;
}
