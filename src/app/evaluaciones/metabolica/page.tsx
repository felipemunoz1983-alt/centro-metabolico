import type { Metadata } from "next";
import Link from "next/link";

const BASE_PATH = "/centro-metabolico";

export const metadata: Metadata = {
  title: "Evaluación Metabólica Completa",
  description:
    "Evaluación metabólica completa: medición del metabolismo basal, oxidación de sustratos y parámetros fisiológicos clave por calorimetría indirecta, en Santiago.",
  keywords: [
    "evaluación metabólica",
    "metabolismo basal",
    "calorimetría indirecta",
    "oxidación de sustratos",
    "composición corporal",
    "Santiago",
    "Centro Metabólico",
  ],
  alternates: {
    canonical: `${BASE_PATH}/evaluaciones/metabolica/`,
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: `${BASE_PATH}/evaluaciones/metabolica/`,
    siteName: "Centro Metabólico",
    title: "Evaluación Metabólica — Centro Metabólico",
    description:
      "Calorimetría indirecta para medir metabolismo basal, oxidación de sustratos y parámetros clave.",
    images: [{ url: `${BASE_PATH}/evaluacion_metabolica.webp`, width: 1200, height: 630, alt: "Evaluación Metabólica — Centro Metabólico" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Evaluación Metabólica — Centro Metabólico",
    description: "Medición por calorimetría indirecta.",
    images: [`${BASE_PATH}/evaluacion_metabolica.webp`],
  },
};

export default function EvaluacionMetabolicaPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center" style={{ paddingTop: "6rem" }}>
      <div
        className="max-w-xl w-full rounded-3xl px-8 py-12"
        style={{
          backgroundColor: "rgba(6,14,26,0.9)",
          border: "1px solid rgba(0,174,239,0.18)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
        }}
      >
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
          style={{ border: "1px solid rgba(0,174,239,0.25)", backgroundColor: "rgba(0,174,239,0.08)" }}
        >
          <span className="h-1.5 w-1.5 rounded-full animate-pulse-dot" style={{ backgroundColor: "var(--brand)" }} />
          <span className="text-[11px] font-medium tracking-widest uppercase" style={{ color: "var(--brand-light)" }}>
            Evaluaciones
          </span>
        </div>
        <h1 className="text-3xl font-semibold text-sky-50 mb-4 leading-tight">
          Evaluación Metabólica
        </h1>
        <p className="text-sky-100/60 leading-relaxed mb-8">
          Medición precisa de tu metabolismo basal, tasa de oxidación de sustratos y parámetros fisiológicos clave. Datos reales para diseñar tu plan nutricional y de entrenamiento.
        </p>
        <Link
          href={"https://centro-metabolico-agenda.vercel.app/reservar"}
          className="inline-flex items-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-semibold text-white transition-all"
          style={{ backgroundColor: "var(--brand)" }}
        >
          Agendar evaluación →
        </Link>
      </div>
    </main>
  );
}
