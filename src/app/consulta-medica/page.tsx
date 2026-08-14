import type { Metadata } from "next";
import { Redirect } from "./Redirect";

const BASE_PATH = "/centro-metabolico";

export const metadata: Metadata = {
  title: "Consulta Médica y Nutricional",
  description:
    "Consulta médica y nutricional en Centro Metabólico, Santiago. Ver disponibilidad, precios y agendar.",
  alternates: {
    canonical: `${BASE_PATH}/asesoria/`,
  },
  robots: { index: false, follow: true },
};

export default function ConsultaMedicaPage() {
  return <Redirect />;
}
