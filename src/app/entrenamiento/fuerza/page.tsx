import type { Metadata } from "next";
import { FuerzaClient } from "./FuerzaClient";

export const metadata: Metadata = {
  title: "Fuerza IRONFIT",
  description:
    "Entrenamiento de fuerza en grupo reducido con tecnología de encoder deportivo. Máximo 7 personas, medición en tiempo real.",
  alternates: { canonical: "/centro-metabolico/entrenamiento/fuerza/" },
  openGraph: {
    title: "Fuerza IRONFIT — Centro Metabólico",
    description: "Entrenamiento de fuerza en grupo reducido con tecnología de encoder deportivo.",
    url: "https://felipemunoz1983-alt.github.io/centro-metabolico/entrenamiento/fuerza/",
    images: [{ url: "/centro-metabolico/energy.webp", width: 1200, height: 630, alt: "Fuerza IRONFIT — Centro Metabólico" }],
  },
  twitter: { card: "summary_large_image", title: "Fuerza IRONFIT — Centro Metabólico", description: "Fuerza en grupo reducido con encoder deportivo.", images: ["/centro-metabolico/energy.webp"] },
};

export default function FuerzaPage() {
  return <FuerzaClient />;
}
