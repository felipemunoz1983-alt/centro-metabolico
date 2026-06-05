import type { Metadata } from "next";
import { FuerzaClient } from "./FuerzaClient";

export const metadata: Metadata = {
  title: "Fuerza IRONFIT — Centro Metabólico",
  description:
    "Entrenamiento de fuerza en grupo reducido con tecnología de encoder deportivo. Máximo 7 personas, medición en tiempo real.",
};

export default function FuerzaPage() {
  return <FuerzaClient />;
}
