"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import Link from "next/link";

const BRAND = "#00AEEF";
const VIOLET = "#A78BFA";
const AGENDA_URL = "/agendar";

function CheckIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color }}>
      <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 shrink-0 transition-transform duration-200" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const proFeatures = [
  {
    icon: "🧬",
    title: "Evaluación de composición corporal (InBody)",
    items: [
      "Conocerás tu porcentaje de grasa, masa muscular y estado nutricional.",
      "Identificaremos zonas críticas como grasa visceral, que impacta en diabetes, hipertensión y síndrome metabólico.",
    ],
  },
  {
    icon: "💨",
    title: "Evaluación de VO₂máx",
    items: [
      "Mediremos tu capacidad aeróbica y nivel de condición física.",
      "Planificamos entrenamientos más eficientes y adaptados a tu nivel.",
    ],
  },
  {
    icon: "🔥",
    title: "Calorimetría indirecta",
    items: [
      "Determinamos tu gasto energético en reposo (metabolismo basal) con precisión clínica.",
      "Diseñamos tu plan alimentario ajustado a tus necesidades energéticas reales, no a estimaciones generales.",
    ],
  },
  {
    icon: "🥗",
    title: "4 Consultas nutricionales",
    items: [
      "Educación alimentaria práctica para que entiendas tu alimentación.",
      "Seguimiento continuo, ajustes progresivos y resolución de dudas.",
      "Enfoque en hábitos sostenibles adaptados a tu estilo de vida.",
    ],
  },
  {
    icon: "📋",
    title: "Planificación alimentaria personalizada",
    items: [
      "Creada según tus objetivos, gustos y rutinas diarias.",
      "Diseñada para pérdida de grasa, ganancia muscular o equilibrio metabólico.",
    ],
  },
];

const dinamicsEvaluations = [
  {
    icon: "📊",
    title: "Evaluación de composición corporal",
    desc: "Permite conocer el nivel de grasa corporal y comprender cómo se distribuye el tejido adiposo en el organismo.",
  },
  {
    icon: "⚗️",
    title: "Evaluación metabólica",
    desc: "Entrega información sobre el funcionamiento del metabolismo y permite diseñar estrategias nutricionales más precisas.",
  },
  {
    icon: "💪",
    title: "Evaluación de fuerza",
    desc: "Determina la condición física inicial del paciente y orienta la planificación del entrenamiento.",
  },
];

const dinamicsApproach = [
  "Evaluación fisiológica completa",
  "Nutrición basada en evidencia científica",
  "Entrenamiento estructurado — 40 sesiones",
  "Seguimiento profesional durante todo el proceso",
];

const dinamicsBenefits = [
  "Reducir grasa corporal de manera sostenible",
  "Mejorar tu metabolismo",
  "Aumentar tu capacidad física",
  "Comprender cómo funciona realmente tu organismo",
  "Desarrollar hábitos que puedas mantener en el tiempo",
];

function FeatureAccordion({ feature, color }: { feature: typeof proFeatures[0]; color: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-2xl overflow-hidden cursor-pointer"
      style={{ border: `1px solid ${open ? `${color}30` : "rgba(255,255,255,0.07)"}`, transition: "border-color 0.2s" }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between gap-3 px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="text-xl">{feature.icon}</span>
          <span className="text-sm font-semibold text-white">{feature.title}</span>
        </div>
        <span style={{ color: `${color}99` }}>
          <ChevronIcon open={open} />
        </span>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: "hidden" }}
          >
            <ul className="px-5 pb-5 space-y-2 border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              {feature.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 pt-3">
                  <CheckIcon color={color} />
                  <span className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ProgramaMetabolicoClient() {
  return (
    <div style={{ backgroundColor: "var(--bg)", color: "white", minHeight: "100vh" }}>
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="px-6 pt-36 pb-24 text-center md:px-8"
        style={{ background: "radial-gradient(ellipse 90% 55% at 50% 0%, rgba(0,174,239,0.07) 0%, transparent 70%)" }}>
        <AnimatedSection>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
            style={{ border: "1px solid rgba(0,174,239,0.3)", backgroundColor: "rgba(0,174,239,0.06)" }}>
            <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: BRAND }} />
            <span className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: BRAND }}>
              Programa Metabólico
            </span>
          </div>

          <h1 className="mb-5 text-5xl font-semibold leading-[1.05] tracking-tighter text-sky-50 md:text-7xl">
            Ciencia real para<br />
            <span className="gradient-text-animated">transformar tu metabolismo.</span>
          </h1>

          <p className="mb-10 mx-auto max-w-[52ch] text-lg leading-relaxed text-sky-100/45">
            Dos programas diseñados desde la evidencia clínica. Primero evaluamos tu organismo — luego actuamos con precisión.
          </p>

          <div className="flex flex-col gap-3 items-center sm:flex-row sm:justify-center">
            <motion.a
              href={AGENDA_URL}
              className="inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-sm font-semibold text-white"
              style={{ backgroundColor: BRAND }}
              whileHover={{ scale: 1.02, boxShadow: "0 0 32px rgba(0,174,239,0.45)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              Agendar evaluación →
            </motion.a>
            <motion.a
              href="https://wa.me/56991377915"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-sm font-semibold text-white"
              style={{ backgroundColor: "#25D366" }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Consultar por WhatsApp
            </motion.a>
          </div>
        </AnimatedSection>
      </section>

      {/* ── Plans ────────────────────────────────────────────── */}
      <section id="programas" className="px-4 pb-28 md:px-6">
        <div className="mx-auto max-w-[1260px]">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">

            {/* ── PLAN METABÓLICO PRO ──────────────────────── */}
            <AnimatedSection>
              <div
                className="rounded-3xl overflow-hidden flex flex-col"
                style={{
                  border: "1px solid rgba(0,174,239,0.22)",
                  backgroundColor: "rgba(0,174,239,0.03)",
                  boxShadow: "0 0 60px rgba(0,174,239,0.06)",
                }}
              >
                {/* Top accent bar */}
                <div className="h-1 w-full" style={{ background: `linear-gradient(to right, transparent, ${BRAND}, transparent)` }} />

                {/* Header */}
                <div className="p-8 pb-7" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="rounded-full px-3 py-0.5 text-[10px] font-bold tracking-widest uppercase"
                      style={{ backgroundColor: "rgba(0,174,239,0.12)", color: BRAND, border: "1px solid rgba(0,174,239,0.25)" }}>
                      6 Sesiones
                    </span>
                    <span className="rounded-full px-3 py-0.5 text-[10px] font-bold tracking-widest uppercase"
                      style={{ backgroundColor: "rgba(0,174,239,0.08)", color: "rgba(0,174,239,0.7)" }}>
                      1 hr c/u
                    </span>
                  </div>

                  <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">Plan Metabólico Pro</h2>
                  <p className="mt-1.5 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                    2 Consultas médicas · 4 Consultas Nutricionales
                  </p>

                  <div className="mt-5 flex items-end gap-2">
                    <span className="text-4xl font-bold text-white">$330.000</span>
                    <span className="mb-1 text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>CLP</span>
                  </div>

                  <motion.a
                    href={AGENDA_URL}
                    className="mt-5 block w-full rounded-2xl py-3.5 text-center text-sm font-semibold text-white"
                    style={{ backgroundColor: BRAND }}
                    whileHover={{ scale: 1.01, boxShadow: "0 0 28px rgba(0,174,239,0.4)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    Agendar Plan Metabólico Pro →
                  </motion.a>
                </div>

                {/* Includes label */}
                <div className="px-8 pt-7 pb-3">
                  <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "rgba(0,174,239,0.6)" }}>
                    ¿Qué incluye?
                  </p>
                </div>

                {/* Features — accordion */}
                <div className="px-8 pb-8 flex flex-col gap-2">
                  {proFeatures.map((feature) => (
                    <FeatureAccordion key={feature.title} feature={feature} color={BRAND} />
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* ── PROGRAMA METABÓLICO DINÁMICS ─────────────── */}
            <AnimatedSection delay={0.12}>
              <div
                className="rounded-3xl overflow-hidden flex flex-col"
                style={{
                  border: "1px solid rgba(167,139,250,0.22)",
                  backgroundColor: "rgba(167,139,250,0.02)",
                  boxShadow: "0 0 60px rgba(167,139,250,0.05)",
                }}
              >
                {/* Top accent bar */}
                <div className="h-1 w-full" style={{ background: `linear-gradient(to right, transparent, ${VIOLET}, transparent)` }} />

                {/* Header */}
                <div className="p-8 pb-7" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="rounded-full px-3 py-0.5 text-[10px] font-bold tracking-widest uppercase"
                      style={{ backgroundColor: "rgba(167,139,250,0.12)", color: VIOLET, border: "1px solid rgba(167,139,250,0.25)" }}>
                      40 Sesiones
                    </span>
                    <span className="rounded-full px-3 py-0.5 text-[10px] font-bold tracking-widest uppercase"
                      style={{ backgroundColor: "rgba(167,139,250,0.08)", color: "rgba(167,139,250,0.7)" }}>
                      1 hr c/u
                    </span>
                  </div>

                  <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">Programa Metabólico Dinámics</h2>
                  <p className="mt-1.5 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Programa Metabólico Integral
                  </p>

                  <div className="mt-5 flex items-end gap-2">
                    <span className="text-4xl font-bold text-white">$380.000</span>
                    <span className="mb-1 text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>CLP</span>
                  </div>

                  <motion.a
                    href={AGENDA_URL}
                    className="mt-5 block w-full rounded-2xl py-3.5 text-center text-sm font-semibold text-white"
                    style={{ backgroundColor: VIOLET }}
                    whileHover={{ scale: 1.01, boxShadow: "0 0 28px rgba(167,139,250,0.4)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    Agendar Metabólico Dinámics →
                  </motion.a>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col gap-8">

                  {/* Description */}
                  <AnimatedItem index={0}>
                    <div className="rounded-2xl p-5" style={{ backgroundColor: "rgba(167,139,250,0.07)", border: "1px solid rgba(167,139,250,0.15)" }}>
                      <p className="text-sm font-semibold text-white mb-2">
                        Un enfoque científico para reducir grasa corporal y transformar tu metabolismo.
                      </p>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                        Bajar de peso no debería depender de dietas restrictivas o métodos que no consideran cómo funciona realmente tu organismo. Cada persona tiene un metabolismo distinto, una composición corporal diferente y necesidades específicas.
                      </p>
                    </div>
                  </AnimatedItem>

                  {/* The Approach */}
                  <AnimatedItem index={1}>
                    <div>
                      <p className="mb-4 text-[11px] font-bold uppercase tracking-widest" style={{ color: "rgba(167,139,250,0.7)" }}>
                        El enfoque — primero evaluar, luego intervenir
                      </p>
                      <div className="flex flex-col gap-2">
                        {dinamicsApproach.map((item, i) => (
                          <div key={item} className="flex items-center gap-3 rounded-xl px-4 py-3"
                            style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                            <span className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold shrink-0"
                              style={{ backgroundColor: "rgba(167,139,250,0.15)", color: VIOLET }}>
                              {i + 1}
                            </span>
                            <span className="text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </AnimatedItem>

                  {/* Evaluations */}
                  <AnimatedItem index={2}>
                    <div>
                      <p className="mb-4 text-[11px] font-bold uppercase tracking-widest" style={{ color: "rgba(167,139,250,0.7)" }}>
                        Evaluaciones incluidas
                      </p>
                      <div className="flex flex-col gap-3">
                        {dinamicsEvaluations.map((ev) => (
                          <div key={ev.title} className="flex gap-4">
                            <span className="text-xl shrink-0 mt-0.5">{ev.icon}</span>
                            <div>
                              <p className="text-sm font-semibold text-white">{ev.title}</p>
                              <p className="mt-0.5 text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.48)" }}>{ev.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </AnimatedItem>

                  {/* Benefits */}
                  <AnimatedItem index={3}>
                    <div>
                      <p className="mb-4 text-[11px] font-bold uppercase tracking-widest" style={{ color: "rgba(167,139,250,0.7)" }}>
                        Los pacientes buscan
                      </p>
                      <ul className="flex flex-col gap-2.5">
                        {dinamicsBenefits.map((b) => (
                          <li key={b} className="flex items-start gap-2.5">
                            <CheckIcon color={VIOLET} />
                            <span className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AnimatedItem>

                </div>
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>

      {/* ── Why section ──────────────────────────────────────── */}
      <section className="px-6 py-24 md:px-8"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="mx-auto max-w-[900px]">
          <AnimatedSection className="text-center mb-14">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-widest" style={{ color: BRAND }}>
              ¿Por qué funciona este enfoque?
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-sky-50 md:text-4xl">
              Intentar cambiar el cuerpo sin evaluarlo<br className="hidden md:block" /> suele llevar a resultados temporales.
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              {
                icon: "🔬",
                title: "Datos reales",
                desc: "Sin evaluaciones adecuadas, es imposible saber cuánto tejido adiposo necesitas reducir, cómo responde tu metabolismo o qué entrenamiento es más efectivo para ti.",
              },
              {
                icon: "🎯",
                title: "Plan personalizado",
                desc: "Con los datos de tu evaluación, diseñamos una estrategia específica que genera cambios reales en tu composición corporal — no una dieta genérica.",
              },
              {
                icon: "📈",
                title: "Resultados sostenibles",
                desc: "El seguimiento profesional continuo permite ajustar las estrategias cuando es necesario, garantizando que el proceso genere una transformación duradera.",
              },
            ].map((item, i) => (
              <AnimatedItem key={item.title} index={i}>
                <div className="rounded-2xl p-6 h-full"
                  style={{ border: "1px solid rgba(255,255,255,0.07)", backgroundColor: "rgba(255,255,255,0.02)" }}>
                  <span className="text-3xl block mb-4">{item.icon}</span>
                  <h3 className="mb-2 text-base font-semibold text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{item.desc}</p>
                </div>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────── */}
      <section className="px-6 py-28 text-center md:px-8"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,174,239,0.05) 0%, transparent 70%)" }}>
        <AnimatedSection>
          <h2 className="mb-4 text-4xl font-semibold tracking-tight text-sky-50 md:text-5xl">
            ¿No sabes cuál elegir?
          </h2>
          <p className="mb-10 mx-auto max-w-[44ch] text-lg leading-relaxed text-sky-100/45">
            Agenda una evaluación inicial y nuestro equipo te orientará hacia el programa más adecuado para tus objetivos.
          </p>
          <div className="flex flex-col gap-3 items-center sm:flex-row sm:justify-center">
            <motion.a
              href={AGENDA_URL}
              className="inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-sm font-semibold text-white"
              style={{ backgroundColor: BRAND }}
              whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(0,174,239,0.45)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              Agendar evaluación →
            </motion.a>
            <motion.a
              href="https://wa.me/56991377915"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-sm font-semibold text-white"
              style={{ backgroundColor: "#25D366" }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Consultar por WhatsApp
            </motion.a>
          </div>

          {/* Trust signals */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-sky-200/28">
            {["Sin compromiso de permanencia", "Atención personalizada", "Equipo certificado"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" style={{ color: "rgba(0,174,239,0.45)" }}>
                  <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      <Footer />
    </div>
  );
}
