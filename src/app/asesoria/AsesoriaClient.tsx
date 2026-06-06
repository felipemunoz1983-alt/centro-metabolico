"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const BP = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const AGENDA_URL = "/agendar";
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
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="overflow-hidden rounded-3xl"
            style={{
              backgroundColor: t.bgCard,
              border: `2px solid ${selected === "medica" ? t.brand : t.border}`,
              boxShadow: selected === "medica"
                ? `0 0 0 4px ${t.brand}18, 0 8px 40px rgba(0,0,0,0.08)`
                : "0 2px 12px rgba(0,0,0,0.06), 0 8px 40px rgba(0,0,0,0.04)",
              transition: "border-color 0.35s, box-shadow 0.35s",
            }}
          >
            {selected === "medica" && (
              <div className="h-1 w-full" style={{ background: `linear-gradient(to right, transparent, ${t.brand}, transparent)` }} />
            )}

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px]">
              {/* Content */}
              <div className="p-8 md:p-12">
                {/* Header */}
                <div className="mb-7 flex flex-wrap items-center gap-4">
                  <span className="rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-widest"
                    style={{ backgroundColor: t.brandBg, color: t.brand, border: `1px solid ${t.brand}30` }}>
                    Consulta Médica
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold" style={{ color: t.text }}>$60.000</span>
                    <span className="text-sm" style={{ color: t.textMuted }}>· 1 hora</span>
                  </div>
                </div>

                <h2 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl" style={{ color: t.text }}>
                  Consulta Médica Integral
                </h2>
                <p className="mb-6 text-base font-medium italic" style={{ color: t.brand }}>
                  &ldquo;Más que un chequeo, es una inversión en tu salud.&rdquo;
                </p>
                <p className="mb-8 text-base leading-relaxed max-w-[55ch]" style={{ color: t.textMid }}>
                  Una consulta médica completa donde evaluamos tu estado de salud, metabolismo y hábitos para darte un enfoque claro, personalizado y basado en datos.
                </p>

                {/* Includes */}
                <p className="mb-4 text-[11px] font-bold uppercase tracking-widest" style={{ color: t.textMuted }}>Incluye</p>
                <ul className="mb-8 flex flex-col gap-3" role="list">
                  {[
                    "Revisión de tu estado de salud y antecedentes.",
                    "Análisis y explicación clara de tus exámenes de laboratorio.",
                    "Evaluación de tu metabolismo para entender cómo funciona tu cuerpo.",
                    "Consejos prácticos en alimentación, ejercicio y prevención de enfermedades.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckIcon />
                      <span className="text-sm leading-relaxed" style={{ color: t.textMid }}>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Ideal para */}
                <div className="mb-7 rounded-2xl p-5" style={{ backgroundColor: t.brandBg, border: `1px solid ${t.brand}20` }}>
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-widest" style={{ color: t.brand }}>Ideal para</p>
                  <p className="text-sm leading-relaxed" style={{ color: "#0369A1" }}>
                    Personas mayores de 30 años que quieren prevenir patologías como hipertensión, diabetes o sarcopenia, y ganar energía y vitalidad en su día a día.
                  </p>
                </div>

                <p className="mb-8 text-sm leading-relaxed italic max-w-[55ch]" style={{ color: t.textMuted }}>
                  Nuestro compromiso: acompañarte con un enfoque cercano, claro y personalizado, para que entiendas tu cuerpo y cuides tu salud de forma sostenible.
                </p>

                <div className="mb-8 flex flex-wrap gap-2">
                  {["Medicina preventiva", "Exámenes laboratorio", "Metabolismo", "Prevención"].map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>

                <motion.a
                  href={AGENDA_URL}
                  className="inline-flex items-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-semibold text-white cursor-pointer"
                  style={{ backgroundColor: t.brand }}
                  whileHover={{ scale: 1.02, backgroundColor: t.brandDark }}
                  transition={{ duration: 0.2 }}
                  aria-label="Agendar Consulta Médica en AgendaPro"
                >
                  Agendar Consulta Médica →
                </motion.a>
              </div>

              {/* Bárbara photo */}
              <div className="relative hidden lg:flex flex-col" style={{ borderLeft: `1px solid ${t.border}` }}>
                <div className="relative flex-1 overflow-hidden" style={{ minHeight: 400 }}>
                  <Image
                    src={`${BP}/barbara.webp`}
                    alt="Dra. Bárbara Plass Villanueva, Médico Cirujano"
                    fill
                    className="object-cover object-top"
                    sizes="360px"
                  />
                  <div className="absolute inset-0" style={{
                    background: "linear-gradient(to right, rgba(255,255,255,0.15) 0%, transparent 25%, transparent 75%, rgba(255,255,255,0.05) 100%)",
                  }} />
                </div>
                <div className="p-5" style={{ borderTop: `1px solid ${t.border}`, backgroundColor: t.bgSoft }}>
                  <p className="font-bold text-sm" style={{ color: t.text }}>Dra. Bárbara Plass Villanueva</p>
                  <p className="text-xs mt-0.5" style={{ color: t.brand }}>Médico Cirujano · UDD Distinción Máxima</p>
                </div>
              </div>
            </div>
          </motion.article>

          {/* ── CARD 2: Consulta Nutricional — fotos left, content right ─ */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12 }}
            className="overflow-hidden rounded-3xl"
            style={{
              backgroundColor: t.bgCard,
              border: `2px solid ${selected === "nutricional" ? t.teal : t.border}`,
              boxShadow: selected === "nutricional"
                ? `0 0 0 4px ${t.teal}18, 0 8px 40px rgba(0,0,0,0.08)`
                : "0 2px 12px rgba(0,0,0,0.06), 0 8px 40px rgba(0,0,0,0.04)",
              transition: "border-color 0.35s, box-shadow 0.35s",
            }}
          >
            {selected === "nutricional" && (
              <div className="h-1 w-full" style={{ background: `linear-gradient(to right, transparent, ${t.teal}, transparent)` }} />
            )}

            <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr]">
              {/* Fotos Valeska + Felipe */}
              <div className="relative hidden lg:grid grid-rows-2" style={{ borderRight: `1px solid ${t.border}` }}>
                {/* Valeska */}
                <div className="relative overflow-hidden">
                  <Image
                    src={`${BP}/VALE_WEB.webp`}
                    alt="Valeska Vidal, Nutricionista Clínica y Deportiva"
                    fill
                    className="object-cover object-top"
                    sizes="360px"
                  />
                  <div className="absolute bottom-0 left-0 right-0 px-4 py-3"
                    style={{ background: "linear-gradient(to top, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.7) 50%, transparent 100%)" }}>
                    <p className="text-xs font-bold" style={{ color: t.text }}>Valeska Vidal</p>
                    <p className="text-[10px]" style={{ color: t.teal }}>Nutricionista Clínica y Deportiva</p>
                  </div>
                </div>
                {/* Felipe */}
                <div className="relative overflow-hidden" style={{ borderTop: `1px solid ${t.border}` }}>
                  <Image
                    src={`${BP}/felipe.webp`}
                    alt="Felipe Muñoz Zambrano, Nutricionista Deportivo"
                    fill
                    className="object-cover object-top"
                    sizes="360px"
                  />
                  <div className="absolute bottom-0 left-0 right-0 px-4 py-3"
                    style={{ background: "linear-gradient(to top, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.7) 50%, transparent 100%)" }}>
                    <p className="text-xs font-bold" style={{ color: t.text }}>Felipe Muñoz Zambrano</p>
                    <p className="text-[10px]" style={{ color: t.teal }}>Nutricionista Deportivo · Clínica Alemana</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-12">
                <div className="mb-7 flex flex-wrap items-center gap-4">
                  <span className="rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-widest"
                    style={{ backgroundColor: t.tealBg, color: t.teal, border: `1px solid ${t.teal}30` }}>
                    Consulta Nutricional
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold" style={{ color: t.text }}>$40.000</span>
                    <span className="text-sm" style={{ color: t.textMuted }}>· 45 min</span>
                  </div>
                </div>

                <h2 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl" style={{ color: t.text }}>
                  Consulta Nutricional
                </h2>
                <p className="mb-6 text-base font-medium italic" style={{ color: t.teal }}>
                  &ldquo;Una evaluación precisa y un plan realmente adaptado a ti.&rdquo;
                </p>
                <p className="mb-8 text-base leading-relaxed max-w-[55ch]" style={{ color: t.textMid }}>
                  Evaluamos tu composición corporal con InBody y diseñamos un plan alimentario personalizado ajustado a tus objetivos, estilo de vida y preferencias.
                </p>

                <p className="mb-4 text-[11px] font-bold uppercase tracking-widest" style={{ color: t.textMuted }}>Incluye</p>
                <ul className="mb-8 flex flex-col gap-3" role="list">
                  {[
                    "Evaluación de composición corporal con InBody (% grasa, masa muscular, distribución regional).",
                    "Análisis e interpretación experta de tus datos corporales.",
                    "Planificación alimentaria personalizada, sostenible y sin restricciones innecesarias.",
                    "Estrategia adaptada a tus objetivos: rendimiento, composición o salud metabólica.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckIcon color={t.teal} />
                      <span className="text-sm leading-relaxed" style={{ color: t.textMid }}>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mb-7 rounded-2xl p-5" style={{ backgroundColor: t.tealBg, border: `1px solid ${t.teal}25` }}>
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-widest" style={{ color: t.teal }}>Ideal para</p>
                  <p className="text-sm leading-relaxed" style={{ color: "#0F766E" }}>
                    Quienes buscan mejorar su composición corporal, rendimiento o salud sin dietas genéricas. El objetivo no es solo cambiar lo que comes, sino transformar tu cuerpo desde adentro.
                  </p>
                </div>

                <p className="mb-8 text-sm leading-relaxed italic max-w-[55ch]" style={{ color: t.textMuted }}>
                  Enfoque profesional y basado en datos: tu plan evoluciona contigo a medida que tu cuerpo cambia y mejora.
                </p>

                <div className="mb-8 flex flex-wrap gap-2">
                  {["InBody", "Composición corporal", "Plan alimentario", "Rendimiento"].map((tag) => (
                    <Tag key={tag} color={t.teal} bg={t.tealBg}>{tag}</Tag>
                  ))}
                </div>

                <motion.a
                  href={AGENDA_URL}
                  className="inline-flex items-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-semibold text-white cursor-pointer"
                  style={{ backgroundColor: t.teal }}
                  whileHover={{ scale: 1.02, backgroundColor: "#0F766E" }}
                  transition={{ duration: 0.2 }}
                  aria-label="Agendar Consulta Nutricional en AgendaPro"
                >
                  Agendar Consulta Nutricional →
                </motion.a>
              </div>
            </div>
          </motion.article>
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
