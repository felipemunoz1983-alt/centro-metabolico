import type { Metadata } from "next";
import { PilatesClient } from "./PilatesClient";

export const metadata: Metadata = {
  title: "Pilates Reformer en Ñuñoa",
  description:
    "Clases de Pilates Reformer en grupos reducidos: control, core y postura. Bajo impacto, corrección en cada ejercicio y tu progreso medido con InBody. Lun a Vie 08:00, 09:00 y 10:00; Lun a Jue 18:00, 19:00 y 20:00; Dom 10:00.",
  alternates: { canonical: "/centro-metabolico/entrenamiento/pilates/" },
  openGraph: {
    title: "Pilates Reformer — Centro Metabólico",
    description:
      "Control, core y postura sobre reformer. Grupos reducidos, bajo impacto y progreso medido, no estimado.",
    url: "https://felipemunoz1983-alt.github.io/centro-metabolico/entrenamiento/pilates/",
    images: [{ url: "/centro-metabolico/pilates.webp", width: 1200, height: 630, alt: "Clase de Pilates Reformer — Centro Metabólico" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pilates Reformer — Centro Metabólico",
    description: "Control, core y postura sobre reformer. Grupos reducidos y progreso medido.",
    images: ["/centro-metabolico/pilates.webp"],
  },
};

export default function PilatesPage() {
  return <PilatesClient />;
}
