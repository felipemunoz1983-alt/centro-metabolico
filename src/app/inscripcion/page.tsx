import type { Metadata } from "next";
import { InscripcionClient } from "./InscripcionClient";

export const metadata: Metadata = {
  title: "Inscríbete a Entrenamiento Funcional y Fuerza",
  description:
    "Anótate a las clases de Entrenamiento Funcional (DINAFIT) y Entrenamiento de Fuerza (IRONFIT) del Centro Metabólico. Revisa los horarios e inscríbete en un clic.",
  alternates: { canonical: "/centro-metabolico/inscripcion/" },
  openGraph: {
    title: "Inscríbete a Entrenamiento Funcional y Fuerza — Centro Metabólico",
    description:
      "Horarios de clases de Funcional (DINAFIT) y Fuerza (IRONFIT). Inscríbete en un clic.",
    url: "https://felipemunoz1983-alt.github.io/centro-metabolico/inscripcion/",
    images: [{ url: "/centro-metabolico/energy.webp", width: 1200, height: 630, alt: "Inscripción a clases — Centro Metabólico" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Inscríbete a clases — Centro Metabólico",
    description: "Horarios de Funcional (DINAFIT) y Fuerza (IRONFIT). Inscríbete en un clic.",
    images: ["/centro-metabolico/energy.webp"],
  },
};

export default function InscripcionPage() {
  return <InscripcionClient />;
}
