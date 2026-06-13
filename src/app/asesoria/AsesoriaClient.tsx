"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const BP = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const AGENDA_URL = "https://centrometabolico.site.agendapro.com/cl/sucursal/364121";
const BRAND = "#00AEEF";
const BRAND_DARK = "#0090C5";

/* ── Tokens ─────────────────────────────────────────────────────── */
const t = {
  bg:         "#ffffff",
  bgSoft:     "#F0F9FF",
  bgCard:     "#ffffff",
  border:     "#E2E8F0",
  borderBrand:"rgba(0,174,239,0.25)",
  text:       "#0F172A",
  textMid:    "#475569",
  textMuted:  "#94A3B8",
  brand:      BRAND,
  brandBg:    "#EBF8FF",
  brandDark:  BRAND_DARK,
  teal:       "#0D9488",
  tealBg:     "#F0FDFA",
};

function CheckIcon({ color = BRAND }: { color?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 flex-shrink-0 mt-0.5" stroke={color} strokeWidth="2.2" aria-hidden="true">
      <path d="M4 10l4.5 4.5L16 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Tag({ children, color = t.brand, bg = t.brandBg }: { children: React.ReactNode; color?: string; bg?: string }) {
  return (
    <span
      className="rounded-full px-3 py-1 text-[11px] font-semibold cursor-default"
      style={{ color, backgroundColor: bg, border: `1px solid ${color}25` }}
    >
      {children}
    </span>
  );
}

const decisions = [
  { text: "Quiero revisar mi salud general", type: "medica" },
  { text: "Tengo exámenes que no entiendo", type: "medica" },
  { text: "Tengo +30 años y quiero prevenir enfermedades", type: "medica" },
  { text: "Quiero mejorar mi composición corporal", type: "nutricional" },
  { text: "Busco un plan de alimentación personalizado", type: "nutricional" },
  { text: "Quiero optimizar mi rendimiento deportivo", type: "nutricional" },
];

export function AsesoriaClient() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ backgroundColor: t.bg, color: t.text }} className="min-h-screen font-sans">

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="pt-32 pb-14 px-6 text-center md:px-8" style={{ backgroundColor: t.bgSoft }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="mx-auto max-w-[680px]"
        >
          <div
            className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
            style={{ backgroundColor: t.brandBg, border: `1px solid ${t.brand}30` }}
          >
            <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: t.brand }} aria-hidden="true" />
            <span className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: t.brand }}>
              Asesoría personalizada
            </span>
          </div>

          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl" style={{ color: t.text, lineHeight: 1.1 }}>
            ¿Cuál consulta es{" "}
            <span style={{ color: t.brand }}>la adecuada para ti?</span>
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: t.textMid }}>
            Dos especialidades, un mismo objetivo: transformar tu salud con ciencia y datos reales.
          </p>
        </motion.div>
      </section>

      {/* ── Decision helper ────────────────────────────────────────── */}
      <section className="px-6 py-10 md:px-8" style={{ backgroundColor: t.bg, borderBottom: `1px solid ${t.border}` }}>
        <div className="mx-auto max-w-[860px]">
          <p className="mb-5 text-center text-xs font-semibold uppercase tracking-widest" style={{ color: t.textMid }}>
            Selecciona lo que mejor te describe
          </p>
          <div className="flex flex-wrap justify-center gap-2.5" role="group" aria-label="Filtro de recomendación">
            {decisions.map((d) => {
              const active = selected === d.type;
              return (
                <button
                  key={d.text}
                  onClick={() => setSelected(s => s === d.type ? null : d.type)}
                  className="rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer"
                  style={{
                    backgroundColor: active ? t.brand : "#F8FAFC",
                    color: active ? "#fff" : t.text,
                    border: `1.5px solid ${active ? t.brand : "#94A3B8"}`,
                    boxShadow: active ? `0 0 0 3px ${t.brand}20` : "none",
                  }}
                  aria-pressed={active}
                >
                  {d.text}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {selected && (
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-5 flex items-center justify-center gap-2"
                role="alert"
              >
                <div className="flex items-center gap-2 rounded-xl px-4 py-2.5" style={{ backgroundColor: t.brandBg, border: `1px solid ${t.brand}30` }}>
                  <CheckIcon />
                  <span className="text-sm font-semibold" style={{ color: t.brand }}>
                    {selected === "medica"
                      ? "Te recomendamos la Consulta Médica Integral con la Dra. Bárbara Plass."
                      : "Te recomendamos la Consulta Nutricional con Valeska o Felipe."}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Cards ──────────────────────────────────────────────────── */}
      <section className="px-6 py-14 md:px-8">
        <div className="mx-auto flex max-w-[1300px] flex-col gap-8">

          {/* ── CARD 1: Consulta Médica — content left, Bárbara right ─ */}
          {(() => {
            const professionals = [
              {
                id: "barbara",
                type: "medica" as const,
                name: "Dra. Bárbara Plass Villanueva",
                firstName: "Bárbara",
                role: "Médico Cirujano · UDD Distinción Máxima",
                photo: "barbara.webp",
                focus: "center 22%",
                badge: "Consulta Médica",
                price: "$60.000",
                duration: "1 hora",
                title: "Consulta Médica Integral",
                quote: "Más que un chequeo, es una inversión en tu salud.",
                description:
                  "Una consulta médica completa donde evaluamos tu estado de salud, metabolismo y hábitos para darte un enfoque claro, personalizado y basado en datos.",
                includes: [
                  "Revisión de tu estado de salud y antecedentes.",
                  "Análisis de tus exámenes de laboratorio.",
                  "Evaluación de tu metabolismo.",
                  "Consejos en alimentación, ejercicio y prevención.",
                ],
              },
              {
                id: "valeska",
                type: "nutricional" as const,
                name: "Valeska Vidal",
                firstName: "Valeska",
                role: "Nutricionista Clínica y Deportiva",
                photo: "VALE_WEB.webp",
                focus: "center 35%",
                badge: "Consulta Nutricional",
                price: "$40.000",
                duration: "45 min",
                title: "Consulta Nutricional",
                quote: "Una evaluación precisa y un plan realmente adaptado a ti.",
                description:
                  "Evaluamos tu composición corporal con InBody y diseñamos un plan alimentario personalizado ajustado a tus objetivos, estilo de vida y preferencias.",
                includes: [
                  "Evaluación de composición corporal con InBody.",
                  "Análisis e interpretación experta de tus datos.",
                  "Planificación alimentaria personalizada.",
                  "Estrategia adaptada a tus objetivos.",
                ],
              },
              {
                id: "felipe",
                type: "nutricional" as const,
                name: "Felipe Muñoz Zambrano",
                firstName: "Felipe",
                role: "Nutricionista Deportivo · Clínica Alemana",
                photo: "felipe.webp",
                focus: "center 75%",
                badge: "Consulta Nutricional",
                price: "$40.000",
                duration: "45 min",
                title: "Consulta Nutricional",
                quote: "Una evaluación precisa y un plan realmente adaptado a ti.",
                description:
                  "Evaluamos tu composición corporal con InBody y diseñamos un plan alimentario personalizado ajustado a tus objetivos, estilo de vida y preferencias.",
                includes: [
                  "Evaluación de composición corporal con InBody.",
                  "Análisis e interpretación experta de tus datos.",
                  "Planificación alimentaria personalizada.",
                  "Estrategia adaptada a tus objetivos.",
                ],
              },
            ];

            const visible = professionals.filter((p) => !selected || p.type === selected);

            return (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {visible.map((pro, idx) => {
                  const accent = pro.type === "medica" ? t.brand : t.teal;
                  const accentBg = pro.type === "medica" ? t.brandBg : t.tealBg;
                  const accentDark = pro.type === "medica" ? t.brandDark : "#0F766E";
                  const isHighlighted = selected === pro.type;

                  return (
                    <motion.article
                      key={pro.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 + idx * 0.08 }}
                      className="flex flex-col overflow-hidden rounded-3xl"
                      style={{
                        backgroundColor: t.bgCard,
                        border: `2px solid ${isHighlighted ? accent : t.border}`,
                        boxShadow: isHighlighted
                          ? `0 0 0 4px ${accent}18, 0 8px 40px rgba(0,0,0,0.08)`
                          : "0 2px 12px rgba(0,0,0,0.06), 0 8px 40px rgba(0,0,0,0.04)",
                        transition: "border-color 0.35s, box-shadow 0.35s",
                      }}
                    >
                      {isHighlighted && (
                        <div
                          className="h-1 w-full"
                          style={{ background: `linear-gradient(to right, transparent, ${accent}, transparent)` }}
                        />
                      )}

                      {/* Avatar header */}
                      <div className="flex flex-col items-center gap-3 px-6 py-6 text-center" style={{ borderBottom: `1px solid ${t.border}` }}>
                        <div
                          className="relative size-24 shrink-0 overflow-hidden rounded-full md:size-28"
                          style={{ border: `2px solid ${accent}25` }}
                        >
                          <Image
                            src={`${BP}/${pro.photo}`}
                            alt={`${pro.name}, ${pro.role}`}
                            fill
                            className="object-cover"
                            style={{ objectPosition: pro.focus }}
                            sizes="112px"
                          />
                        </div>
                        <div className="w-full">
                          <p className="text-base font-bold" style={{ color: t.text }}>{pro.name}</p>
                          <p className="mt-0.5 text-xs font-semibold" style={{ color: accent }}>{pro.role}</p>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex flex-1 flex-col p-6 md:p-7">
                        <div className="mb-5 flex flex-wrap items-center gap-3">
                          <span
                            className="rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest"
                            style={{ backgroundColor: accentBg, color: accent, border: `1px solid ${accent}30` }}
                          >
                            {pro.badge}
                          </span>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-2xl font-bold" style={{ color: t.text }}>{pro.price}</span>
                            <span className="text-xs" style={{ color: t.textMuted }}>· {pro.duration}</span>
                          </div>
                        </div>

                        <h2 className="mb-2 text-2xl font-bold tracking-tight" style={{ color: t.text }}>
                          {pro.title}
                        </h2>
                        <p className="mb-4 text-sm font-medium italic" style={{ color: accent }}>
                          &ldquo;{pro.quote}&rdquo;
                        </p>
                        <p className="mb-6 text-sm leading-relaxed" style={{ color: t.textMid }}>
                          {pro.description}
                        </p>

                        <p className="mb-3 text-[11px] font-bold uppercase tracking-widest" style={{ color: t.textMuted }}>
                          Incluye
                        </p>
                        <ul className="mb-6 flex flex-col gap-2.5" role="list">
                          {pro.includes.map((item) => (
                            <li key={item} className="flex items-start gap-2.5">
                              <CheckIcon color={accent} />
                              <span className="text-sm leading-relaxed" style={{ color: t.textMid }}>{item}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-auto">
                          <motion.a
                            href={AGENDA_URL}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold text-white cursor-pointer"
                            style={{ backgroundColor: accent }}
                            whileHover={{ scale: 1.02, backgroundColor: accentDark }}
                            transition={{ duration: 0.2 }}
                            aria-label={`Agendar ${pro.title} con ${pro.name}`}
                          >
                            Agendar con {pro.firstName} →
                          </motion.a>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            );
          })()}
        </div>
      </section>

      {/* ── Footer strip ───────────────────────────────────────────── */}
      <footer className="px-6 py-14 text-center md:px-8" style={{ borderTop: `1px solid ${t.border}`, backgroundColor: t.bgSoft }}>
        <p className="mb-6 text-sm" style={{ color: t.textMuted }}>¿Tienes dudas? Escríbenos y te ayudamos a elegir la consulta correcta.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={AGENDA_URL}
            className="rounded-2xl px-6 py-3 text-sm font-semibold text-white transition-all cursor-pointer"
            style={{ backgroundColor: t.brand }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = t.brandDark)}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = t.brand)}
          >
            Ver disponibilidad →
          </a>
          <Link
            href="/"
            className="rounded-2xl px-6 py-3 text-sm font-semibold transition-all cursor-pointer"
            style={{ border: `1.5px solid ${t.border}`, color: t.textMid, backgroundColor: t.bg }}
          >
            ← Volver al inicio
          </Link>
        </div>
      </footer>
    </div>
  );
}
