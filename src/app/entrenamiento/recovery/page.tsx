import type { Metadata } from "next";
import { RecoveryClient } from "./RecoveryClient";

export const metadata: Metadata = {
  title: "Recovery",
  description:
    "Recuperación activa en grupos reducidos. Reducción de fatiga, regeneración muscular y optimización del rendimiento.",
  alternates: { canonical: "/centro-metabolico/entrenamiento/recovery/" },
  openGraph: {
    title: "Recovery — Centro Metabólico",
    description: "Recuperación activa en grupos reducidos. Reducción de fatiga y optimización del rendimiento.",
    url: "https://felipemunoz1983-alt.github.io/centro-metabolico/entrenamiento/recovery/",
    images: [{ url: "/centro-metabolico/energy.webp", width: 1200, height: 630, alt: "Recovery — Centro Metabólico" }],
  },
  twitter: { card: "summary_large_image", title: "Recovery — Centro Metabólico", description: "Recuperación activa. Reducción de fatiga y optimización del rendimiento.", images: ["/centro-metabolico/energy.webp"] },
};

export default function RecoveryPage() {
  return <RecoveryClient />;
}
