import type { Metadata } from "next";
import { HalterofiliaClient } from "./HalterofiliaClient";

export const metadata: Metadata = {
  title: "Halterofilia",
  description:
    "Halterofilia en grupo reducido: arranque y envión con técnica olímpica, progresión medida y evaluación InBody incluida. Martes y jueves 19:00.",
  alternates: { canonical: "/centro-metabolico/entrenamiento/halterofilia/" },
  openGraph: {
    title: "Halterofilia — Centro Metabólico",
    description: "Arranque y envión con técnica olímpica en grupos reducidos. Martes y jueves 19:00.",
    url: "https://felipemunoz1983-alt.github.io/centro-metabolico/entrenamiento/halterofilia/",
    images: [{ url: "/centro-metabolico/energy.webp", width: 1200, height: 630, alt: "Halterofilia — Centro Metabólico" }],
  },
  twitter: { card: "summary_large_image", title: "Halterofilia — Centro Metabólico", description: "Halterofilia con técnica olímpica en grupos reducidos.", images: ["/centro-metabolico/energy.webp"] },
};

export default function HalterofiliaPage() {
  return <HalterofiliaClient />;
}
