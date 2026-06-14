import type { Metadata } from "next";
import { Vo2maxClient } from "./Vo2maxClient";

export const metadata: Metadata = {
  title: "VO2max — Capacidad Aeróbica | Centro Metabólico",
  description:
    "Prueba de VO2max con análisis directo de gases: conoce tu máximo uso de grasa (FATmax), tu gasto calórico real a cada intensidad y obtén un plan de entrenamiento personalizado según tus objetivos.",
  alternates: {
    canonical: "/centro-metabolico/evaluaciones/vo2max/",
  },
  openGraph: {
    title: "VO2max — Centro Metabólico",
    description:
      "Tu FATmax, tu gasto calórico real y un plan de entrenamiento personalizado. Análisis directo de gases en 15 minutos.",
    url: "https://felipemunoz1983-alt.github.io/centro-metabolico/evaluaciones/vo2max/",
    images: [
      {
        url: "/centro-metabolico/energy.webp",
        width: 1200,
        height: 630,
        alt: "VO2max — Centro Metabólico",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VO2max — Centro Metabólico",
    description:
      "Tu FATmax, tu gasto calórico real y un plan de entrenamiento personalizado. Análisis directo de gases en 15 minutos.",
    images: ["/centro-metabolico/energy.webp"],
  },
};

export default function Vo2maxPage() {
  return <Vo2maxClient />;
}
