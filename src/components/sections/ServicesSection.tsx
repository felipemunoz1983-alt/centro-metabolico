"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";

const services = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M4.5 12.75l6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 12V8.5a3 3 0 016 0V12m-8 0h10a2 2 0 012 2v4a2 2 0 01-2 2H7a2 2 0 01-2-2v-4a2 2 0 012-2z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    number: "01",
    title: "Consulta Médica y Nutricional",
    description:
      "Atención personalizada con médico y nutricionista. Evaluamos tu historial, hábitos y objetivos para diseñar una estrategia clínica basada en tu biología real.",
    tags: ["Medicina preventiva", "Nutrición clínica", "Plan personalizado"],
    href: "/asesoria",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    number: "02",
    title: "Entrenamiento Personalizado",
    description:
      "Programas de ejercicio diseñados según tu perfil metabólico, composición corporal y metas. Cada sesión maximiza tu adaptación fisiológica y rendimiento.",
    tags: ["Programa adaptado", "Progresión guiada", "Alto rendimiento"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    number: "03",
    title: "Evaluaciones",
    description:
      "VO₂ max, metabolismo basal, umbral anaeróbico y composición corporal (DEXA e impedanciometría). Datos precisos que son el punto de partida de toda transformación.",
    tags: ["VO₂ max", "Composición corporal", "DEXA"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    number: "04",
    title: "Reto 21 Días",
    description:
      "Un programa intensivo e integral de 3 semanas que combina evaluación metabólica, plan nutricional y entrenamiento guiado para crear hábitos que se mantienen.",
    tags: ["21 días", "Método CM", "Resultados medibles"],
  },
];

export function ServicesSection() {
  return (
    <section id="servicios" className="px-6 py-28 md:px-8 md:py-36" style={{ backgroundColor: "var(--bg)" }}>
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <AnimatedSection className="mb-16">
          <EyebrowBadge>Asesoría</EyebrowBadge>
          <h2 className="mt-5 text-4xl font-semibold tracking-tighter text-sky-50 md:text-5xl lg:text-6xl">
            Todo lo que necesitas<br />
            <span className="gradient-text">en un solo lugar.</span>
          </h2>
        </AnimatedSection>

        {/* 2×2 equal grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {services.map((service, i) => (
            <AnimatedItem key={service.title} index={i}>
              <motion.div
                className="card-surface group h-full cursor-default p-7 transition-all duration-300"
                whileHover={{ y: -4, borderColor: "rgba(0,174,239,0.28)" }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <div className="flex items-start gap-5">
                  {/* Icon */}
                  <div
                    className="mt-0.5 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: "rgba(0,174,239,0.12)", color: "var(--brand)" }}
                  >
                    {service.icon}
                  </div>

                  {/* Number */}
                  <span
                    className="ml-auto text-xs font-mono font-semibold"
                    style={{ color: "rgba(0,174,239,0.35)" }}
                  >
                    {service.number}
                  </span>
                </div>

                <h3 className="mb-3 mt-5 text-xl font-semibold tracking-tight text-sky-50">
                  {service.title}
                </h3>

                <p className="mb-5 text-sm leading-relaxed text-sky-100/45">
                  {service.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full px-3 py-1 text-[11px] font-medium"
                      style={{
                        border: "1px solid rgba(255,255,255,0.2)",
                        backgroundColor: "rgba(255,255,255,0.07)",
                        color: "#ffffff",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Button */}
                <div className="mt-6">
                  {(service as typeof service & { href?: string }).href ? (
                    <Link
                      href={(service as typeof service & { href?: string }).href!}
                      className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-200"
                      style={{
                        border: "1px solid rgba(0,174,239,0.25)",
                        backgroundColor: "rgba(0,174,239,0.08)",
                        color: "var(--brand-light)",
                      }}
                    >
                      Más información →
                    </Link>
                  ) : (
                    <a
                      href="#contacto"
                      className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-200"
                      style={{
                        border: "1px solid rgba(0,174,239,0.25)",
                        backgroundColor: "rgba(0,174,239,0.08)",
                        color: "var(--brand-light)",
                      }}
                    >
                      Más información →
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatedItem>
          ))}
        </div>
      </div>
    </section>
  );
}
