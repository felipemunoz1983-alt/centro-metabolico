import type { Metadata } from "next";
import { AsesoriaClient } from "./AsesoriaClient";

export const metadata: Metadata = {
  title: "Asesoría Nutricional y Médica",
  description:
    "Consulta Médica Integral y Consulta Nutricional personalizada en Centro Metabólico, Santiago. Evaluación metabólica basada en ciencia para tu transformación real.",
  alternates: {
    canonical: "/centro-metabolico/asesoria/",
  },
  openGraph: {
    title: "Asesoría Nutricional y Médica — Centro Metabólico",
    description:
      "Consulta Médica Integral y Consulta Nutricional personalizada. Descubre cuál es la más adecuada para ti.",
    url: "https://felipemunoz1983-alt.github.io/centro-metabolico/asesoria/",
    images: [
      {
        url: "/centro-metabolico/energy.webp",
        width: 1200,
        height: 630,
        alt: "Asesoría Nutricional y Médica — Centro Metabólico",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Asesoría Nutricional y Médica — Centro Metabólico",
    description:
      "Consulta Médica Integral y Consulta Nutricional personalizada.",
    images: ["/centro-metabolico/energy.webp"],
  },
};

export default function AsesoriaPage() {
  return <AsesoriaClient />;
}
