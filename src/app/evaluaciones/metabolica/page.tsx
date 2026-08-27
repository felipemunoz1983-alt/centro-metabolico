import type { Metadata } from "next";
import { RedirectTo } from "@/components/ui/RedirectTo";

const BASE_PATH = "/centro-metabolico";

export const metadata: Metadata = {
  title: "Evaluación Metabólica — Calorimetría Indirecta",
  description:
    "La evaluación metabólica se realiza por calorimetría indirecta: medición del gasto energético en reposo y del uso de grasas y carbohidratos.",
  alternates: {
    canonical: `${BASE_PATH}/calorimetria-indirecta/`,
  },
  robots: { index: false, follow: true },
};

export default function EvaluacionMetabolicaPage() {
  return <RedirectTo to="/calorimetria-indirecta" label="Calorimetría Indirecta" />;
}
