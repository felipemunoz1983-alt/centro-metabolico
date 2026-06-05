import type { Metadata } from "next";
import { AsesoriaClient } from "./AsesoriaClient";

export const metadata: Metadata = {
  title: "Asesoría — Centro Metabólico",
  description:
    "Consulta Médica Integral y Consulta Nutricional personalizada. Descubre cuál es la más adecuada para ti.",
};

export default function AsesoriaPage() {
  return <AsesoriaClient />;
}
