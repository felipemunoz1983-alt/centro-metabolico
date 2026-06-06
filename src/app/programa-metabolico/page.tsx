import type { Metadata } from "next";
import { ProgramaMetabolicoClient } from "./ProgramaMetabolicoClient";

export const metadata: Metadata = {
  title: "Programa Metabólico — Centro Metabólico",
  description:
    "Plan Metabólico y Programa Metabólico Dinámics. Ciencia de precisión para transformar tu composición corporal y metabolismo.",
};

export default function ProgramaMetabolicoPage() {
  return <ProgramaMetabolicoClient />;
}
