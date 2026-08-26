import type { Metadata } from "next";
import { CalorimetriaClient } from "./CalorimetriaClient";

const URL =
  "https://felipemunoz1983-alt.github.io/centro-metabolico/calorimetria-indirecta/";

export const metadata: Metadata = {
  title: "Calorimetría Indirecta — Mide tu Gasto Energético | Centro Metabólico",
  description:
    "Calorimetría indirecta en Ñuñoa, Santiago: mide tu gasto energético en reposo a partir del intercambio de oxígeno (O₂) y dióxido de carbono (CO₂). Deja de estimar tu metabolismo con fórmulas y mídelo con datos fisiológicos.",
  keywords: [
    "calorimetría indirecta",
    "calorimetría indirecta Santiago",
    "calorimetría indirecta Ñuñoa",
    "medición gasto energético",
    "gasto energético en reposo",
    "evaluación metabólica",
    "medición metabolismo",
    "RER",
    "cociente respiratorio",
    "consumo de oxígeno",
  ],
  alternates: {
    canonical: "/centro-metabolico/calorimetria-indirecta/",
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    title: "Calorimetría Indirecta — Centro Metabólico",
    description:
      "Mide cuánta energía realmente utiliza tu cuerpo. Evaluación del gasto energético en reposo mediante el análisis del intercambio de gases respiratorios.",
    url: URL,
    images: [
      {
        url: "/centro-metabolico/energy.webp",
        width: 1200,
        height: 630,
        alt: "Calorimetría Indirecta — Centro Metabólico",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calorimetría Indirecta — Centro Metabólico",
    description:
      "Deja de estimar. Mide tu metabolismo. Evaluación del gasto energético en reposo mediante calorimetría indirecta.",
    images: ["/centro-metabolico/energy.webp"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalTest",
      "@id": `${URL}#test`,
      name: "Calorimetría Indirecta",
      alternateName: "Medición del gasto energético en reposo",
      description:
        "Método no invasivo que utiliza el intercambio respiratorio de oxígeno (O₂) y dióxido de carbono (CO₂) para estimar el gasto energético en condiciones de reposo.",
      usedToDiagnose: {
        "@type": "MedicalCondition",
        name: "Evaluación del gasto energético en reposo",
      },
      url: URL,
      provider: {
        "@type": "MedicalBusiness",
        name: "Centro Metabólico",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Suárez Mujica 950",
          addressLocality: "Ñuñoa",
          addressRegion: "Región Metropolitana",
          addressCountry: "CL",
        },
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${URL}#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "¿La calorimetría indirecta duele?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Es un procedimiento no invasivo: solo se analiza el aire que respiras mientras permaneces en reposo.",
          },
        },
        {
          "@type": "Question",
          name: "¿Es lo mismo que calcular mis calorías con una fórmula?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Una fórmula estima tu gasto energético a partir de variables como edad, sexo, peso y talla. La calorimetría indirecta lo evalúa a partir de tu propio intercambio de gases respiratorios.",
          },
        },
        {
          "@type": "Question",
          name: "¿La calorimetría indirecta mide mi metabolismo?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Estima tu gasto energético a partir del intercambio de gases respiratorios. En este contexto, «metabolismo» se refiere a la energía que tu cuerpo utiliza, medida en condiciones de reposo.",
          },
        },
      ],
    },
  ],
};

export default function CalorimetriaIndirectaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CalorimetriaClient />
    </>
  );
}
