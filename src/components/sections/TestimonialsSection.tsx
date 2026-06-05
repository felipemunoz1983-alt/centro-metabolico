"use client";

import { motion } from "framer-motion";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";

const testimonials = [
  {
    name: "Valentina Torres",
    role: "Triatleta amateur, 34 años",
    avatar: "VT",
    quote:
      "Después de la evaluación metabólica entendí por qué siempre llegaba agotada a las competencias. Ajustamos la nutrición según mis zonas de entrenamiento y en 3 meses mejoré mi tiempo en 8 minutos.",
    result: "−8 min en triatlón",
  },
  {
    name: "Rodrigo Fuentes",
    role: "Ejecutivo, 42 años",
    avatar: "RF",
    quote:
      "Llevaba años haciendo dietas que no funcionaban. El Centro Metabólico midió mi metabolismo real y diseñó un plan que se adaptaba a mi vida. Bajé 12 kilos sin pasar hambre.",
    result: "−12 kg en 5 meses",
  },
  {
    name: "Carolina Méndez",
    role: "Mamá activa, 38 años",
    avatar: "CM",
    quote:
      "Lo que más me sorprendió fue la precisión. No me dieron una dieta genérica — analizaron mi composición corporal y mi metabolismo basal. Por primera vez en mi vida tengo resultados sostenibles.",
    result: "−8% grasa corporal",
  },
];

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 12 12" className="h-3 w-3 fill-amber-400">
          <path d="M6 0.75l1.37 2.78 3.07.45-2.22 2.16.52 3.06L6 7.73 3.26 9.2l.52-3.06L1.56 3.98l3.07-.45L6 .75z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section id="testimonios" className="px-6 py-28 md:px-8 md:py-36" style={{ backgroundColor: "var(--surface)" }}>
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <AnimatedSection className="mb-16 text-center">
          <EyebrowBadge>Testimonios</EyebrowBadge>
          <h2 className="mt-5 text-4xl font-semibold tracking-tighter text-sky-50 md:text-5xl">
            Resultados que hablan<br />
            <span className="gradient-text">por sí solos.</span>
          </h2>
        </AnimatedSection>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <AnimatedItem key={t.name} index={i}>
              <motion.div
                className="card-surface flex h-full flex-col gap-5 p-7"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
              >
                <StarRating />

                <blockquote className="flex-1 text-sm leading-relaxed text-sky-100/50">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Result badge */}
                <div
                  className="inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1"
                  style={{ border: "1px solid rgba(0,174,239,0.2)", backgroundColor: "rgba(0,174,239,0.08)" }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--brand)" }} />
                  <span className="text-[11px] font-semibold" style={{ color: "var(--brand-light)" }}>{t.result}</span>
                </div>

                {/* Author */}
                <div
                  className="flex items-center gap-3 pt-5"
                  style={{ borderTop: "1px solid rgba(0,174,239,0.08)" }}
                >
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold"
                    style={{ backgroundColor: "rgba(0,174,239,0.12)", color: "var(--brand)" }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-sky-100">{t.name}</p>
                    <p className="text-xs text-sky-200/35">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatedItem>
          ))}
        </div>
      </div>
    </section>
  );
}
