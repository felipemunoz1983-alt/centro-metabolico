import type { Metadata } from "next";
import { FuncionalClient } from "./FuncionalClient";

export const metadata: Metadata = {
  title: "Entrenamiento Funcional DINAFIT — Centro Metabólico",
  description: "Entrenamiento funcional en grupos reducidos con tecnología de luces de acción y reacción. Velocidad, coordinación y agilidad.",
};

export default function FuncionalPage() {
  return <FuncionalClient />;
}
