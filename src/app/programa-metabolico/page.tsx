import type { Metadata } from "next";
import { ProgramaMetabolicoClient } from "./ProgramaMetabolicoClient";

export const metadata: Metadata = {
  title: "Programa Metabólico",
  description:
    "Plan Metabólico y Programa Metabólico Dinámico. Ciencia de precisión para transformar tu composición corporal y metabolismo en Centro Metabólico, Santiago.",
  alternates: {
    canonical: "/centro-metabolico/programa-metabolico/",
  },
  openGraph: {
    title: "Programa Metabólico — Centro Metabólico",
    description:
      "Plan Metabólico y Programa Metabólico Dinámico. Ciencia de precisión para transformar tu composición corporal y metabolismo.",
    url: "https://felipemunoz1983-alt.github.io/centro-metabolico/programa-metabolico/",
    images: [
      {
        url: "/centro-metabolico/evaluacion_metabolica.webp",
        width: 1200,
        height: 630,
        alt: "Programa Metabólico — Centro Metabólico",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Programa Metabólico — Centro Metabólico",
    description:
      "Plan Metabólico y Programa Metabólico Dinámico. Ciencia de precisión para tu transformación.",
    images: ["/centro-metabolico/evaluacion_metabolica.webp"],
  },
};

export default function ProgramaMetabolicoPage() {
  return <ProgramaMetabolicoClient />;
}
