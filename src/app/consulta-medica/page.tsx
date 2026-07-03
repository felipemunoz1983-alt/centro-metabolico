import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

const BASE_PATH = "/centro-metabolico";

export const metadata: Metadata = {
  title: "Consulta Médica con Equipo Especializado",
  description:
    "Consulta Médica con nuestro equipo de profesionales especializados en salud metabólica, nutrición clínica y medicina deportiva en Santiago, Chile.",
  keywords: [
    "consulta médica",
    "nutrición clínica",
    "medicina metabólica",
    "medicina deportiva",
    "Santiago",
    "Centro Metabólico",
  ],
  alternates: {
    canonical: `${BASE_PATH}/consulta-medica/`,
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: `${BASE_PATH}/consulta-medica/`,
    siteName: "Centro Metabólico",
    title: "Consulta Médica — Centro Metabólico",
    description:
      "Consulta Médica con equipo especializado en salud metabólica, nutrición clínica y medicina deportiva.",
    images: [{ url: `${BASE_PATH}/barbara.webp`, width: 1200, height: 630, alt: "Consulta Médica — Centro Metabólico" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Consulta Médica — Centro Metabólico",
    description: "Equipo especializado en salud metabólica y nutrición clínica.",
    images: [`${BASE_PATH}/barbara.webp`],
  },
};

const BP = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const profesionales = [
  {
    id: "barbara",
    name: "Dra. Bárbara Plass Villanueva",
    role: "Médico Cirujano",
    especialidad: "Nutrición Clínica y Medicina Metabólica",
    registro: "UDD Distinción Máxima · EUNACOM",
    photo: "/barbara.webp",
    photoBg: "#ffffff",
    tags: ["Medicina Metabólica", "Nutrición Clínica", "Obesidad"],
    badge: "Hospital Padre Hurtado",
    service: "Consulta Médica Integral",
  },
  {
    id: "valeska",
    name: "Valeska Vidal",
    role: "Nutricionista Clínica y Deportiva",
    especialidad: "Evaluación Metabólica y Nutrición de Precisión",
    registro: "Reg. 12.845",
    photo: "/VALE_WEB.webp",
    tags: ["Nutrición Clínica", "Composición Corporal", "Metabolismo"],
    badge: "Colegio de Nutricionistas",
    service: "Consulta Nutricional",
  },
  {
    id: "felipe",
    name: "Felipe Muñoz Zambrano",
    role: "Nutricionista Deportivo",
    especialidad: "Rendimiento Atlético y Optimización Metabólica",
    registro: "Reg. U. Mayor 2011",
    photo: "/felipe.webp",
    tags: ["Nutrición Deportiva", "Pérdida de Grasa", "Rendimiento"],
    badge: "Clínica Alemana",
    service: "Consulta Nutricional",
  },
];

export default function ConsultaMedicaPage() {
  return (
    <main style={{ backgroundColor: "var(--bg)", minHeight: "100vh", paddingTop: "7rem", paddingBottom: "5rem" }}>
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">

        {/* Header */}
        <div className="mb-12 text-center">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5"
            style={{ border: "1px solid rgba(0,174,239,0.25)", backgroundColor: "rgba(0,174,239,0.08)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--brand)", animation: "pulse-dot 2s ease-in-out infinite" }} />
            <span className="text-[11px] font-medium tracking-widest uppercase" style={{ color: "var(--brand-light)" }}>
              Medicina · Centro Metabólico
            </span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-sky-50 mb-4 md:text-5xl">
            Consulta Médica
          </h1>
          <p className="max-w-[52ch] mx-auto text-lg leading-relaxed" style={{ color: "rgba(200,230,255,0.55)" }}>
            Nuestro equipo de especialistas combina medicina, nutrición y ciencia del ejercicio
            para optimizar tu salud desde adentro.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {profesionales.map((p) => (
            <div
              key={p.id}
              className="flex flex-col rounded-3xl overflow-hidden"
              style={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                boxShadow: "var(--card-shadow)",
                transform: "translateZ(0)",
                WebkitTransform: "translateZ(0)",
                isolation: "isolate",
              }}
            >
              {/* Photo */}
              <div className="relative w-full" style={{ aspectRatio: "3/3.5", backgroundColor: p.photoBg ?? "rgba(11,22,40,0.8)" }}>
                <Image
                  src={`${BP}${p.photo}`}
                  alt={p.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(3,8,15,0.85) 0%, transparent 50%)" }}
                />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-base font-semibold text-white leading-tight">{p.name}</p>
                  <p className="text-sm mt-0.5 text-white/80">{p.role}</p>
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-col flex-1 gap-4 p-5">
                <p className="text-sm leading-relaxed" style={{ color: "rgba(200,230,255,0.6)" }}>
                  {p.especialidad}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full px-3 py-1 text-xs font-medium text-white/80"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(255,255,255,0.15)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Badge */}
                <div
                  className="flex items-center gap-2 rounded-xl px-3 py-2 mt-auto"
                  style={{ backgroundColor: "rgba(0,174,239,0.06)", border: "1px solid rgba(0,174,239,0.12)" }}
                >
                  <svg className="w-3.5 h-3.5 flex-shrink-0 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-xs text-white/50">{p.badge} · {p.registro}</span>
                </div>

                {/* CTAs */}
                <div className="mt-1 flex flex-col gap-2">
                  <Link
                    href={`/#${p.id}`}
                    className="flex items-center justify-center gap-2 rounded-2xl py-2.5 text-sm font-medium text-white/70 transition-all"
                    style={{
                      border: "1px solid rgba(255,255,255,0.15)",
                      backgroundColor: "rgba(255,255,255,0.05)",
                    }}
                  >
                    Ver perfil completo
                  </Link>
                  <Link
                    href={`https://centro-metabolico-agendamiento.vercel.app/reservar?servicio=${encodeURIComponent(p.service)}&pro=${encodeURIComponent(p.name)}`}
                    className="flex items-center justify-center gap-2 rounded-2xl py-2.5 text-sm font-semibold text-white transition-all"
                    style={{ backgroundColor: "var(--brand)" }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Reservar hora
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
