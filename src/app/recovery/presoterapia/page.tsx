import type { Metadata } from "next";
import { PresoterapiaClient } from "./PresoterapiaClient";

export const metadata: Metadata = {
  title: "Presoterapia — Recuperación Elite",
  description:
    "Compresión neumática secuencial para eliminar lactato, reducir inflamación y activar la circulación. Recupera 3× más rápido en Centro Metabólico, Santiago.",
  alternates: {
    canonical: "/centro-metabolico/recovery/presoterapia/",
  },
  openGraph: {
    title: "Presoterapia — Centro Metabólico",
    description:
      "Compresión neumática secuencial para eliminar lactato, reducir inflamación y activar la circulación en 60 minutos.",
    url: "https://felipemunoz1983-alt.github.io/centro-metabolico/recovery/presoterapia/",
    images: [
      {
        url: "/centro-metabolico/energy.webp",
        width: 1200,
        height: 630,
        alt: "Presoterapia — Centro Metabólico",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Presoterapia — Centro Metabólico",
    description:
      "Compresión neumática secuencial para eliminar lactato, reducir inflamación y activar la circulación en 60 minutos.",
    images: ["/centro-metabolico/energy.webp"],
  },
};

export default function PresoterapiaPage() {
  return <PresoterapiaClient />;
}
