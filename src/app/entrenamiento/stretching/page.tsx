import type { Metadata } from "next";
import { StretchingClient } from "./StretchingClient";

export const metadata: Metadata = {
  title: "Stretching FNP",
  description:
    "Sesiones de stretching FNP en grupos reducidos. Flexibilidad real, reducción de tensión muscular y bienestar corporal duradero.",
  alternates: { canonical: "/centro-metabolico/entrenamiento/stretching/" },
  openGraph: {
    title: "Stretching FNP — Centro Metabólico",
    description: "Stretching FNP en grupos reducidos. Flexibilidad real y bienestar corporal duradero.",
    url: "https://felipemunoz1983-alt.github.io/centro-metabolico/entrenamiento/stretching/",
    images: [{ url: "/centro-metabolico/energy.webp", width: 1200, height: 630, alt: "Stretching FNP — Centro Metabólico" }],
  },
  twitter: { card: "summary_large_image", title: "Stretching FNP — Centro Metabólico", description: "Flexibilidad real, reducción de tensión muscular.", images: ["/centro-metabolico/energy.webp"] },
};

export default function StretchingPage() {
  return <StretchingClient />;
}
