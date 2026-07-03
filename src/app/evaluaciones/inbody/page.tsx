import type { Metadata } from "next";
import Link from "next/link";

const BASE_PATH = "/centro-metabolico";

export const metadata: Metadata = {
  title: "InBody — Composición Corporal",
  description:
    "Análisis InBody de composición corporal: masa muscular segmentaria, grasa corporal, agua intra y extracelular. Resultados en minutos, en Santiago.",
  keywords: [
    "InBody",
    "composición corporal",
    "bioimpedancia",
    "masa muscular",
    "grasa corporal",
    "Santiago",
    "Centro Metabólico",
  ],
  alternates: {
    canonical: `${BASE_PATH}/evaluaciones/inbody/`,
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: `${BASE_PATH}/evaluaciones/inbody/`,
    siteName: "Centro Metabólico",
    title: "InBody — Composición Corporal | Centro Metabólico",
    description:
      "Análisis InBody: masa muscular segmentaria, grasa corporal, agua intra y extracelular. Resultados en minutos.",
    images: [{ url: `${BASE_PATH}/energy.webp`, width: 1200, height: 630, alt: "InBody — Centro Metabólico" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "InBody — Composición Corporal | Centro Metabólico",
    description: "Análisis de bioimpedancia con resultados en minutos.",
    images: [`${BASE_PATH}/energy.webp`],
  },
};

export default function InBodyPage() {
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
          InBody
        </h1>
        <p className="text-sky-100/60 leading-relaxed mb-8">
          Análisis de composición corporal por bioimpedancia: masa muscular segmentaria, porcentaje de grasa, agua corporal total y puntuación InBody. En minutos, sin agujas.
        </p>
        <Link
          href={"https://centro-metabolico-agendamiento.vercel.app/reservar?servicio=InBody%20%E2%80%94%20Composici%C3%B3n%20Corporal"}
          className="inline-flex items-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-semibold text-white transition-all"
          style={{ backgroundColor: "var(--brand)" }}
        >
          Agendar InBody →
        </Link>
      </div>
    </main>
  );
}
