"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";
import { Footer } from "@/components/sections/Footer";

const BP = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const BRAND = "#00AEEF";
const VIOLET = "#A78BFA";
const AGENDA_URL = "/agendar";

/* ── Icons ──────────────────────────────────────────────────── */
function CheckIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color }}>
      <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 shrink-0 transition-transform duration-200"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Data ────────────────────────────────────────────────────── */
const proFeatures = [
  {
    icon: "🧬",
    title: "Evaluación de composición corporal (InBody)",
    items: [
      "Conocerás tu porcentaje de grasa, masa muscular y estado nutricional.",
      "Identificaremos zonas críticas como grasa visceral que impacta en diabetes, hipertensión y síndrome metabólico.",
    ],
  },
  {
    icon: "💨",
    title: "Evaluación de tu metabolismo",
    items: [
      "Mediremos tu capacidad aeróbica y nivel de condición física.",
      "Planificamos entrenamientos más eficientes y adaptados a tu nivel.",
    ],
  },
  {
    icon: "🩺",
    title: "2 Consultas médicas",
    items: [
      "Evaluación clínica inicial: anamnesis completa, análisis de antecedentes y diagnóstico metabólico.",
      "Consulta de seguimiento: revisión de resultados, ajuste de indicaciones y orientación terapéutica.",
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
    desc: "Conoce el nivel de grasa corporal y cómo se distribuye el tejido adiposo en tu organismo.",
  },
  {
    icon: "⚗️",
    title: "Evaluación metabólica",
    desc: "Información sobre el funcionamiento de tu metabolismo para diseñar estrategias nutricionales más precisas.",
  },
  {
    icon: "💪",
    title: "Evaluación de fuerza",
    desc: "Determina tu condición física inicial y orienta la planificación del entrenamiento.",
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

/* ── Feature accordion ──────────────────────────────────────── */
function FeatureAccordion({ feature, color }: { feature: typeof proFeatures[0]; color: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl overflow-hidden cursor-pointer"
      style={{ border: `1px solid ${open ? `${color}35` : "rgba(255,255,255,0.07)"}`, transition: "border-color 0.2s" }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between gap-3 px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="text-xl">{feature.icon}</span>
          <span className="text-sm font-semibold text-white">{feature.title}</span>
        </div>
        <span style={{ color: `${color}80` }}>
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

/* ── Main component ─────────────────────────────────────────── */
export function ProgramaMetabolicoClient() {
  const heroRef     = useRef<HTMLElement>(null);
  const proRef      = useRef<HTMLDivElement>(null);
  const dinamicsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: proScroll } = useScroll({
    target: proRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(proScroll, [0, 1], ["8%", "-8%"]);

  const { scrollYProgress: dinamicsScroll } = useScroll({
    target: dinamicsRef,
    offset: ["start end", "end start"],
  });
  const imgY2 = useTransform(dinamicsScroll, [0, 1], ["8%", "-8%"]);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  const scale       = useTransform(scrollYProgress, [0, 1], [1.0, 1.45]);
  const darkOverlay = useTransform(scrollYProgress, [0, 0.15, 0.55, 1], [0.50, 0.40, 0.40, 0.70]);
  const vigOpacity  = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.40, 0.15, 0.25, 0.85]);

  const p1Opacity = useTransform(scrollYProgress, [0, 0.25, 0.38], [1, 1, 0]);
  const p1Y       = useTransform(scrollYProgress, [0, 0.38], [0, -60]);

  const p2Opacity = useTransform(scrollYProgress, [0.38, 0.50, 0.65, 0.74], [0, 1, 1, 0]);
  const p2Y       = useTransform(scrollYProgress, [0.38, 0.74], [60, -60]);

  const p3Opacity = useTransform(scrollYProgress, [0.74, 0.85, 1, 1], [0, 1, 1, 1]);
  const p3Y       = useTransform(scrollYProgress, [0.74, 0.85], [60, 0]);

  const hintOpacity = useTransform(scrollYProgress, [0, 0.10], [0.8, 0]);

  return (
    <div style={{ backgroundColor: "var(--bg)", color: "white", minHeight: "100vh" }}>

      {/* ── Fixed mini header ────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-10"
        style={{ backgroundColor: "rgba(3,8,15,0.55)", backdropFilter: "blur(18px)" }}
      >
        <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm">
          ← Inicio
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-base font-bold" style={{ color: BRAND, fontFamily: "var(--font-display)" }}>C</span>
          <div className="h-4 w-px" style={{ backgroundColor: BRAND, opacity: 0.4 }} />
          <span className="text-base font-bold" style={{ color: BRAND, fontFamily: "var(--font-display)" }}>M</span>
        </div>
        <a
          href={AGENDA_URL}
          className="rounded-xl px-4 py-2 text-xs font-bold text-white"
          style={{ backgroundColor: BRAND }}
        >
          Agendar →
        </a>
      </header>

      {/* ── Scroll hero ─────────────────────────────────────── */}
      <section ref={heroRef} style={{ height: "320vh" }} className="relative">
        <div className="sticky top-0 h-screen overflow-hidden bg-[#03080F]">

          {/* Background image */}
          <motion.div
            className="absolute inset-0"
            style={{ scale, transformOrigin: "50% 40%", willChange: "transform" }}
          >
            <Image
              src={`${BP}/pm1.webp`}
              alt="Programa Metabólico — Centro Metabólico"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>

          {/* Dark overlay */}
          <motion.div className="absolute inset-0 pointer-events-none bg-black" style={{ opacity: darkOverlay }} />

          {/* Vignette */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: vigOpacity,
              background: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 0%, rgba(0,0,0,0.95) 100%)",
            }}
          />

          {/* Edge fades */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, rgba(3,8,15,0.7) 0%, transparent 18%, transparent 82%, rgba(3,8,15,0.8) 100%)" }}
          />

          {/* ── Phase 1 ─────────────────────────────── */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none"
            style={{ opacity: p1Opacity, y: p1Y }}
          >
            <span className="mb-5 rounded-full px-5 py-2 text-xs font-bold tracking-widest uppercase"
              style={{ backgroundColor: "rgba(0,174,239,0.18)", color: BRAND, border: "1px solid rgba(0,174,239,0.35)" }}>
              Programa Metabólico
            </span>
            <h2 className="text-5xl leading-[1.0] text-white md:text-7xl lg:text-8xl"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em", textShadow: "0 2px 20px rgba(0,0,0,0.95), 0 4px 40px rgba(0,0,0,0.9)" }}>
              Transforma tu cuerpo<br />
              <span style={{ color: BRAND }}>con ciencia real.</span>
            </h2>
          </motion.div>

          {/* ── Phase 2 ─────────────────────────────── */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none"
            style={{ opacity: p2Opacity, y: p2Y }}
          >
            <span className="mb-5 rounded-full px-5 py-2 text-xs font-bold tracking-widest uppercase"
              style={{ backgroundColor: "rgba(167,139,250,0.18)", color: VIOLET, border: "1px solid rgba(167,139,250,0.35)" }}>
              El enfoque
            </span>
            <h2 className="text-5xl leading-[1.0] text-white md:text-7xl lg:text-8xl"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em", textShadow: "0 2px 20px rgba(0,0,0,0.95), 0 4px 40px rgba(0,0,0,0.9)" }}>
              Primero evaluar.<br />
              <span style={{ color: VIOLET }}>Luego transformar.</span>
            </h2>
          </motion.div>

          {/* ── Phase 3 CTA ─────────────────────────── */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
            style={{ opacity: p3Opacity, y: p3Y }}
          >
            <div className="flex flex-col items-center gap-4 mb-8">
              <span className="rounded-full px-5 py-2 text-xs font-bold tracking-widest uppercase"
                style={{ backgroundColor: "rgba(0,174,239,0.18)", color: BRAND, border: "1px solid rgba(0,174,239,0.35)" }}>
                Dos programas · Un objetivo
              </span>
              <h2 className="text-5xl leading-[1.0] text-white md:text-7xl lg:text-8xl"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em", textShadow: "0 2px 20px rgba(0,0,0,0.95), 0 4px 40px rgba(0,0,0,0.9)" }}>
                Elige tu camino<br />
                <span style={{ color: BRAND }}>hacia el cambio.</span>
              </h2>
            </div>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <div className="rounded-2xl px-6 py-3 text-center"
                style={{ backgroundColor: "rgba(0,174,239,0.12)", border: "1px solid rgba(0,174,239,0.3)" }}>
                <div className="text-xs font-bold tracking-widest uppercase" style={{ color: BRAND }}>Plan Metabólico Pro</div>
                <div className="text-2xl font-bold text-white mt-1">$330.000</div>
                <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>6 sesiones</div>
              </div>
              <div className="rounded-2xl px-6 py-3 text-center"
                style={{ backgroundColor: "rgba(167,139,250,0.12)", border: "1px solid rgba(167,139,250,0.3)" }}>
                <div className="text-xs font-bold tracking-widest uppercase" style={{ color: VIOLET }}>Metabólico Dinámics</div>
                <div className="text-2xl font-bold text-white mt-1">$380.000</div>
                <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>40 sesiones</div>
              </div>
            </div>
            <motion.a
              href={AGENDA_URL}
              className="mt-8 inline-flex items-center gap-2 rounded-2xl px-10 py-4 text-base font-bold text-white"
              style={{ backgroundColor: BRAND }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 48px rgba(0,174,239,0.6)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              Agendar evaluación →
            </motion.a>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
            style={{ opacity: hintOpacity }}
          >
            <span className="text-[9px] tracking-[0.25em] uppercase text-white/50">Scroll</span>
            <div className="h-7 w-px" style={{ background: `linear-gradient(to bottom, ${BRAND}99, transparent)` }} />
          </motion.div>
        </div>
      </section>

      {/* ── Plans ────────────────────────────────────────────── */}
      <section id="programas" className="py-24" style={{ backgroundColor: "var(--bg)" }}>
        <div className="mx-auto max-w-[1260px] px-4 md:px-6">

          <AnimatedSection className="text-center mb-14">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-widest" style={{ color: BRAND }}>
              Los programas
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-sky-50 md:text-4xl">
              Elige el que se adapta a tus objetivos.
            </h2>
          </AnimatedSection>

        </div>

        {/* ── PLAN METABÓLICO PRO — full-width two-column ── */}
        <div ref={proRef} className="relative overflow-hidden mb-6"
          style={{ borderTop: "1px solid rgba(0,174,239,0.15)", borderBottom: "1px solid rgba(0,174,239,0.15)" }}>

          <div className="flex flex-col lg:flex-row lg:items-stretch">

            {/* Left: card content */}
            <AnimatedSection className="flex-1 lg:max-w-[54%]">
              <div className="flex flex-col h-full px-8 py-10 md:px-12 md:py-14"
                style={{ backgroundColor: "rgba(0,174,239,0.025)" }}>
                <div className="h-1 w-32 rounded-full mb-8" style={{ background: `linear-gradient(to right, ${BRAND}, transparent)` }} />

                <div className="mb-1 flex items-center gap-2">
                  <span className="rounded-full px-3 py-0.5 text-[10px] font-bold tracking-widest uppercase"
                    style={{ backgroundColor: "rgba(0,174,239,0.12)", color: BRAND, border: "1px solid rgba(0,174,239,0.25)" }}>
                    6 Sesiones
                  </span>
                  <span className="rounded-full px-3 py-0.5 text-[10px] font-bold tracking-widest uppercase"
                    style={{ backgroundColor: "rgba(0,174,239,0.06)", color: "rgba(0,174,239,0.6)" }}>
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

                <div className="mt-8 mb-3">
                  <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "rgba(0,174,239,0.55)" }}>
                    ¿Qué incluye?
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  {proFeatures.map((feature) => (
                    <FeatureAccordion key={feature.title} feature={feature} color={BRAND} />
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Right: cm3 image with parallax */}
            <div className="relative lg:flex-1 h-72 lg:h-auto overflow-hidden">
              <motion.div className="absolute inset-0" style={{ y: imgY }}>
                <Image
                  src={`${BP}/cm3.webp`}
                  alt="Plan Metabólico Pro"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
              {/* left gradient blend */}
              <div className="absolute inset-0 pointer-events-none hidden lg:block"
                style={{ background: "linear-gradient(to right, rgba(3,8,15,0.9) 0%, rgba(3,8,15,0.3) 30%, transparent 60%)" }} />
              {/* top gradient for mobile */}
              <div className="absolute inset-0 pointer-events-none lg:hidden"
                style={{ background: "linear-gradient(to bottom, rgba(3,8,15,0.8) 0%, transparent 40%)" }} />
            </div>
          </div>
        </div>

        {/* ── PROGRAMA METABÓLICO DINÁMICS — full-width two-column ── */}
        <div ref={dinamicsRef} className="relative overflow-hidden mt-6"
          style={{ borderTop: "1px solid rgba(167,139,250,0.15)", borderBottom: "1px solid rgba(167,139,250,0.15)" }}>

          <div className="flex flex-col lg:flex-row lg:items-stretch">

            {/* Left: cm4 image with parallax */}
            <div className="relative lg:flex-1 h-72 lg:h-auto overflow-hidden order-2 lg:order-1">
              <motion.div className="absolute inset-0" style={{ y: imgY2 }}>
                <Image
                  src={`${BP}/cm4.webp`}
                  alt="Programa Metabólico Dinámics"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
              {/* right gradient blend */}
              <div className="absolute inset-0 pointer-events-none hidden lg:block"
                style={{ background: "linear-gradient(to left, rgba(3,8,15,0.9) 0%, rgba(3,8,15,0.3) 30%, transparent 60%)" }} />
              {/* bottom gradient for mobile */}
              <div className="absolute inset-0 pointer-events-none lg:hidden"
                style={{ background: "linear-gradient(to top, rgba(3,8,15,0.8) 0%, transparent 40%)" }} />
            </div>

            {/* Right: card content */}
            <AnimatedSection className="flex-1 lg:max-w-[54%] order-1 lg:order-2">
              <div className="flex flex-col h-full px-8 py-10 md:px-12 md:py-14"
                style={{ backgroundColor: "rgba(167,139,250,0.02)" }}>
                <div className="h-1 w-32 rounded-full mb-8" style={{ background: `linear-gradient(to right, ${VIOLET}, transparent)` }} />

                <div className="mb-1 flex items-center gap-2">
                  <span className="rounded-full px-3 py-0.5 text-[10px] font-bold tracking-widest uppercase"
                    style={{ backgroundColor: "rgba(167,139,250,0.12)", color: VIOLET, border: "1px solid rgba(167,139,250,0.25)" }}>
                    40 Sesiones
                  </span>
                  <span className="rounded-full px-3 py-0.5 text-[10px] font-bold tracking-widest uppercase"
                    style={{ backgroundColor: "rgba(167,139,250,0.06)", color: "rgba(167,139,250,0.6)" }}>
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

                <div className="mt-8 flex flex-col gap-8">
                  <div className="rounded-2xl p-5"
                    style={{ backgroundColor: "rgba(167,139,250,0.07)", border: "1px solid rgba(167,139,250,0.15)" }}>
                    <p className="text-sm font-semibold text-white mb-2">
                      Un enfoque científico para reducir grasa corporal y transformar tu metabolismo.
                    </p>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                      Bajar de peso no debería depender de dietas restrictivas o métodos que no consideran cómo funciona realmente tu organismo. Cada persona tiene un metabolismo distinto y necesidades específicas.
                    </p>
                  </div>

                  <div>
                    <p className="mb-4 text-[11px] font-bold uppercase tracking-widest" style={{ color: "rgba(167,139,250,0.65)" }}>
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

                  <div>
                    <p className="mb-4 text-[11px] font-bold uppercase tracking-widest" style={{ color: "rgba(167,139,250,0.65)" }}>
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

                  <div>
                    <p className="mb-4 text-[11px] font-bold uppercase tracking-widest" style={{ color: "rgba(167,139,250,0.65)" }}>
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
              Sin datos reales, cualquier plan es una suposición.
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              {
                icon: "🔬",
                title: "Datos reales",
                desc: "Sin evaluaciones adecuadas es imposible saber cuánto tejido adiposo necesitas reducir, cómo responde tu metabolismo o qué entrenamiento es más efectivo para ti.",
              },
              {
                icon: "🎯",
                title: "Plan personalizado",
                desc: "Con los datos de tu evaluación diseñamos una estrategia específica que genera cambios reales en tu composición corporal — no una dieta genérica.",
              },
              {
                icon: "📈",
                title: "Resultados sostenibles",
                desc: "El seguimiento profesional continuo permite ajustar las estrategias cuando es necesario, garantizando una transformación duradera.",
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
