import type { Metadata } from "next";
import { MovilidadClient } from "./MovilidadClient";

export const metadata: Metadata = {
  title: "Movilidad Articular — Centro Metabólico",
  description: "Entrenamiento de movilidad articular en grupos reducidos. Control motor, estabilidad funcional y movimiento sin dolor.",
};

export default function MovilidadPage() {
  return <MovilidadClient />;
}
