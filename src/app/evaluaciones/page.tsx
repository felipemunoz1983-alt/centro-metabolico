import type { Metadata } from "next";
import Link from "next/link";

const BASE_PATH = "/centro-metabolico";

export const metadata: Metadata = {
  title: "Evaluaciones Metabólicas de Precisión",
  description:
    "Evaluaciones metabólicas de precisión: VO₂ max, metabolismo basal, umbral anaeróbico y composición corporal en Santiago, Chile.",
  keywords: [
    "evaluación metabólica",
    "VO2 max",
    "metabolismo basal",
    "umbral anaeróbico",
    "composición corporal",
    "InBody",
    "Santiago",
  ],
  alternates: {
    canonical: `${BASE_PATH}/evaluaciones/`,
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: `${BASE_PATH}/evaluaciones/`,
    siteName: "Centro Metabólico",
    title: "Evaluaciones Metabólicas — Centro Metabólico",
    description:
      "Mediciones de precisión: VO₂ max, metabolismo basal, umbral anaeróbico y composición corporal.",
    images: [{ url: `${BASE_PATH}/evaluacion_metabolica.webp`, width: 1200, height: 630, alt: "Evaluaciones Metabólicas — Centro Metabólico" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Evaluaciones Metabólicas — Centro Metabólico",
    description: "Mediciones de precisión basadas en evidencia.",
    images: [`${BASE_PATH}/evaluacion_metabolica.webp`],
  },
};

const evaluaciones = [
  {
    title: "Evaluación Metabólica",
    href: "/evaluaciones/metabolica",
    meta: "Calorimetría indirecta",
    desc: "Cuántas calorías quemas en reposo y tu mezcla de grasas y carbohidratos. La base para diseñar dietas que sí funcionan.",
  },
  {
    title: "VO₂ max",
    href: "/evaluaciones/vo2max",
    meta: "≈ 15 min",
    desc: "Tu capacidad aeróbica máxima y tus umbrales, para entrenar con zonas de frecuencia cardíaca reales, no estimadas.",
  },
  {
    title: "InBody · Composición corporal",
    href: "/evaluaciones/inbody",
    meta: "En minutos · sin agujas",
    desc: "Masa muscular segmentada, porcentaje de grasa y agua corporal por bioimpedancia. Para medir tu progreso real.",
  },
];

export default function EvaluacionesPage() {
  return (
    <main className="min-h-screen px-6 md:px-8" style={{ paddingTop: "7rem", paddingBottom: "5rem" }}>
      <div className="mx-auto max-w-[1100px]">

        {/* Header */}
        <div className="mb-12 text-center">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5"
            style={{ border: "1px solid rgba(0,174,239,0.25)", backgroundColor: "rgba(0,174,239,0.08)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full animate-pulse-dot" style={{ backgroundColor: "var(--brand)" }} />
            <span className="text-[11px] font-medium tracking-widest uppercase" style={{ color: "var(--brand-light)" }}>
              Evaluaciones · Centro Metabólico
            </span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-sky-50 mb-4 md:text-5xl">
            Medimos lo que otros adivinan.
          </h1>
          <p className="mx-auto max-w-[54ch] text-lg leading-relaxed" style={{ color: "rgba(200,230,255,0.55)" }}>
            Elige la evaluación que necesitas. Datos reales para decisiones reales sobre tu salud, tu dieta y tu entrenamiento.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {evaluaciones.map((ev) => (
            <Link
              key={ev.href}
              href={ev.href}
              className="group flex flex-col rounded-3xl p-7 transition-all"
              style={{
                backgroundColor: "rgba(6,14,26,0.9)",
                border: "1px solid rgba(0,174,239,0.18)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
              }}
            >
              <span
                className="mb-4 inline-flex w-fit items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                style={{ backgroundColor: "rgba(0,174,239,0.1)", color: "var(--brand-light)", border: "1px solid rgba(0,174,239,0.25)" }}
              >
                {ev.meta}
              </span>
              <h2 className="mb-3 text-xl font-semibold text-sky-50">{ev.title}</h2>
              <p className="mb-6 flex-1 text-sm leading-relaxed" style={{ color: "rgba(200,230,255,0.6)" }}>
                {ev.desc}
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--brand)" }}>
                Ver evaluación
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </span>
            </Link>
          ))}
        </div>

        {/* Fallback CTA */}
        <div className="mt-10 text-center">
          <Link
            href={"https://centro-metabolico-agendamiento.vercel.app/reservar?cat=Evaluaciones"}
            className="inline-flex items-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-semibold text-white transition-all"
            style={{ backgroundColor: "var(--brand)" }}
          >
            Ver disponibilidad y agendar →
          </Link>
          <p className="mt-3 text-xs" style={{ color: "rgba(200,230,255,0.4)" }}>
            ¿No sabes cuál elegir? Escríbenos por WhatsApp y te orientamos.
          </p>
        </div>

      </div>
    </main>
  );
}
