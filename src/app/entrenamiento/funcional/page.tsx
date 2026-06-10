import type { Metadata } from "next";
import { FuncionalClient } from "./FuncionalClient";

export const metadata: Metadata = {
  title: "Entrenamiento Funcional DINAFIT",
  description:
    "Entrenamiento funcional en grupos reducidos con tecnología de luces de acción y reacción. Velocidad, coordinación y agilidad.",
  alternates: { canonical: "/centro-metabolico/entrenamiento/funcional/" },
  openGraph: {
    title: "Entrenamiento Funcional DINAFIT — Centro Metabólico",
    description: "Entrenamiento funcional con tecnología de luces de acción y reacción.",
    url: "https://felipemunoz1983-alt.github.io/centro-metabolico/entrenamiento/funcional/",
    images: [{ url: "/centro-metabolico/entrenamiento_funcional2.webp", width: 1200, height: 630, alt: "Entrenamiento Funcional — Centro Metabólico" }],
  },
  twitter: { card: "summary_large_image", title: "Entrenamiento Funcional DINAFIT — Centro Metabólico", description: "Funcional con luces de acción y reacción.", images: ["/centro-metabolico/entrenamiento_funcional2.webp"] },
};

export default function FuncionalPage() {
  return <FuncionalClient />;
}
