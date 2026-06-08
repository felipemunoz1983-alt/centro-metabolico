import type { Metadata } from "next";
import { Reto21DiasClient } from "./Reto21DiasClient";

export const metadata: Metadata = {
  title: "Reto 21 Días — Centro Metabólico",
  description:
    "Un programa intensivo de 3 semanas que combina evaluación metabólica, plan nutricional y entrenamiento guiado para crear hábitos que se mantienen.",
};

export default function Reto21DiasPage() {
  return <Reto21DiasClient />;
}
