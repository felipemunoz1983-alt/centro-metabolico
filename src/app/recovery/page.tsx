import type { Metadata } from "next";
import { RecoveryClient } from "./RecoveryClient";

export const metadata: Metadata = {
  title: "Recovery — Recuperación Activa",
  description:
    "Recuperación activa guiada para reducir fatiga, acelerar regeneración y optimizar tu rendimiento. Protocolo científico en Centro Metabólico, Santiago.",
  alternates: {
    canonical: "/centro-metabolico/recovery/",
  },
  openGraph: {
    title: "Recovery — Centro Metabólico",
    description:
      "Recuperación activa guiada para reducir fatiga, acelerar regeneración y optimizar tu rendimiento.",
    url: "https://felipemunoz1983-alt.github.io/centro-metabolico/recovery/",
    images: [
      {
        url: "/centro-metabolico/energy.webp",
        width: 1200,
        height: 630,
        alt: "Recovery — Centro Metabólico",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Recovery — Centro Metabólico",
    description:
      "Recuperación activa guiada para reducir fatiga, acelerar regeneración y optimizar tu rendimiento.",
    images: ["/centro-metabolico/energy.webp"],
  },
};

export default function RecoveryPage() {
  return <RecoveryClient />;
}
