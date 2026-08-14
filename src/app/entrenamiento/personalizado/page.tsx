import type { Metadata } from "next";
import { PersonalizadoClient } from "./PersonalizadoClient";

export const metadata: Metadata = {
  title: "Entrenamiento Personalizado",
  description:
    "Entrenamiento personalizado uno a uno: plan 100% individual, 2 sesiones por semana de 1 hora, evaluación InBody incluida y horario a convenir.",
  alternates: { canonical: "/centro-metabolico/entrenamiento/personalizado/" },
  openGraph: {
    title: "Entrenamiento Personalizado — Centro Metabólico",
    description: "Plan 100% individual, 2 sesiones por semana de 1 hora, InBody incluido. Horario a convenir.",
    url: "https://felipemunoz1983-alt.github.io/centro-metabolico/entrenamiento/personalizado/",
    images: [{ url: "/centro-metabolico/fuerza3.webp", width: 1200, height: 630, alt: "Entrenamiento Personalizado — Centro Metabólico" }],
  },
  twitter: { card: "summary_large_image", title: "Entrenamiento Personalizado — Centro Metabólico", description: "Plan individual 1 a 1, 2× semana, InBody incluido.", images: ["/centro-metabolico/fuerza3.webp"] },
};

export default function PersonalizadoPage() {
  return <PersonalizadoClient />;
}
