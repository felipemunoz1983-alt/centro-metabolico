import type { Metadata } from "next";
import { MovilidadClient } from "./MovilidadClient";

export const metadata: Metadata = {
  title: "Movilidad Articular",
  description:
    "Entrenamiento de movilidad articular en grupos reducidos. Control motor, estabilidad funcional y movimiento sin dolor.",
  alternates: { canonical: "/centro-metabolico/entrenamiento/movilidad/" },
  openGraph: {
    title: "Movilidad Articular — Centro Metabólico",
    description: "Movilidad articular en grupos reducidos. Control motor, estabilidad funcional y movimiento sin dolor.",
    url: "https://felipemunoz1983-alt.github.io/centro-metabolico/entrenamiento/movilidad/",
    images: [{ url: "/centro-metabolico/energy.webp", width: 1200, height: 630, alt: "Movilidad Articular — Centro Metabólico" }],
  },
  twitter: { card: "summary_large_image", title: "Movilidad Articular — Centro Metabólico", description: "Control motor, estabilidad funcional y movimiento sin dolor.", images: ["/centro-metabolico/energy.webp"] },
};

export default function MovilidadPage() {
  return <MovilidadClient />;
}
