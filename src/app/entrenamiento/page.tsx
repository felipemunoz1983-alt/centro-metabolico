import type { Metadata } from "next";
import { EntrenamientoClient } from "./EntrenamientoClient";

export const metadata: Metadata = {
  title: "Entrenamiento — Centro Metabólico",
  description:
    "Funcional, Fuerza, Stretching y Movilidad. Programas diseñados con tecnología de precisión para transformar tu rendimiento.",
};

export default function EntrenamientoPage() {
  return <EntrenamientoClient />;
}
