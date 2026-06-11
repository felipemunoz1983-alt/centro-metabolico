"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";
import { Footer } from "@/components/sections/Footer";

const BP = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const BRAND = "#00AEEF";

const pillars = [
  {
    label: "EVALÚA",
    title: "Medimos lo que realmente importa",
    desc: "Evaluación de composición corporal con InBody para conocer tu porcentaje de grasa, masa muscular y estado metabólico real.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "NUTRE",
    title: "Alimentación inteligente para tu metabolismo",
    desc: "Plan nutricional personalizado según tu biología, tus gustos y tu ritmo de vida. Sin dietas genéricas, sin restricciones absurdas.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M12 3v1m0 16v1M5.05 5.05l.707.707M18.243 18.243l.707.707M3 12h1m16 0h1M5.05 18.95l.707-.707M18.243 5.757l.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "OPTIMIZA",
    title: "Mejoramos tu salud metabólica",
    desc: "Consulta médica y nutricional integradas. Identificamos y corregimos los factores que frenan tu transformación.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "ENTRENA",
    title: "Entrenamiento personalizado basado en datos",
    desc: "Sesiones diseñadas según tu perfil metabólico y composición corporal. Cada movimiento tiene un propósito medible.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const steps = [
  { day: "Semana 1", title: "Evalúa y activa", desc: "Evaluación metabólica completa (InBody), consulta médica y nutricional. Diseño de tu plan personalizado." },
  { day: "Semana 2", title: "Ajusta y progresa", desc: "Primera semana de entrenamiento guiado. Ajuste nutricional según tu respuesta inicial. Control de adherencia." },
  { day: "Semana 3", title: "Consolida y habita", desc: "Entrenamiento de alta adherencia. Refuerzo de hábitos. Evaluación de resultados y plan de continuidad." },
];

export function Reto21DiasClient() {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const imgScale  = useTransform(scrollYProgress, [0, 1], [1.0, 1.2]);
  const imgY      = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const textY     = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const textOp    = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const hintOp    = useTransform(scrollYProgress, [0, 0.12], [0.7, 0]);

  return (
    <div style={{ backgroundColor: "var(--bg)", color: "white", minHeight: "100vh" }}>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] overflow-hidden">

        {/* Background: reto21diasbanner for dark hero */}
        <motion.div className="absolute inset-0" style={{ scale: imgScale, y: imgY }}>
          <Image
            src={`${BP}/reto21diasbanner.webp`}
            alt="Reto 21 Días"
            fill
            priority
            className="object-cover"
            style={{ objectPosition: "25% 60%" }}
            sizes="100vw"
          />
        </motion.div>

        {/* Overlays */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(3,8,20,0.60) 0%, rgba(3,8,20,0.20) 40%, rgba(3,8,20,0.90) 100%)" }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to right, rgba(3,8,20,0.65) 0%, transparent 65%)" }} />

        {/* Content */}
        <motion.div
          className="absolute inset-0 flex flex-col items-start justify-end px-6 pb-14 md:items-end md:justify-center md:px-0 md:pr-12 lg:pr-16 md:text-right"
          style={{ y: textY, opacity: textOp }}
        >
          <span className="mb-4 self-start rounded-full px-4 py-1.5 text-[11px] font-bold tracking-widest uppercase md:self-auto md:mb-5 md:px-5 md:py-2 md:text-xs"
            style={{ backgroundColor: "rgba(0,174,239,0.18)", color: BRAND, border: "1px solid rgba(0,174,239,0.35)" }}>
            Programa de Transformación
          </span>

          <h1
            className="leading-none text-white"
            style={{
              fontFamily: "var(--font-reto)",
              fontSize: "clamp(3.8rem, 14vw, 11rem)",
              letterSpacing: "0.06em",
              textShadow: "0 4px 40px rgba(0,0,0,0.9)",
            }}
          >
            RETO
          </h1>
          <div className="flex items-center gap-4 md:flex-row-reverse">
            <span
              className="text-white"
              style={{
                fontFamily: "var(--font-reto)",
                fontSize: "clamp(5rem, 20vw, 14rem)",
                letterSpacing: "0.02em",
                lineHeight: 0.85,
                textShadow: `0 0 80px ${BRAND}55, 0 4px 40px rgba(0,0,0,0.9)`,
                color: BRAND,
              }}
            >
              21
            </span>
            <div className="h-px" style={{ backgroundColor: `${BRAND}60`, width: 60 }} />
          </div>
          <h2
            className="text-white mb-4 md:mb-6"
            style={{
              fontFamily: "var(--font-reto)",
              fontSize: "clamp(1.6rem, 6vw, 4rem)",
              letterSpacing: "0.18em",
              textShadow: "0 4px 40px rgba(0,0,0,0.9)",
            }}
          >
            — DÍAS —
          </h2>

          <p className="mb-6 text-sm leading-relaxed md:mb-8 md:max-w-[32ch] md:text-base" style={{ color: "rgba(255,255,255,0.65)" }}>
            21 días para cambiar hábitos.<br />
            <strong style={{ color: "rgba(255,255,255,0.9)" }}>Resultados que duran mucho más.</strong>
          </p>

          <motion.a
            href="#inscribirse"
            className="self-start inline-flex items-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-bold text-white md:self-auto md:px-8 md:py-4"
            style={{ backgroundColor: BRAND }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0,174,239,0.55)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            Inscribirse al Reto →
          </motion.a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          style={{ opacity: hintOp }}
        >
          <span className="text-[9px] tracking-[0.25em] uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>Scroll</span>
          <div className="h-7 w-px" style={{ background: `linear-gradient(to bottom, ${BRAND}99, transparent)` }} />
        </motion.div>
      </section>

      {/* ── Infografía + descripción ─────────────────────────── */}
      <section className="relative overflow-hidden py-24"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="mx-auto max-w-[1260px] px-6 md:px-8">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">

            {/* Texto */}
            <AnimatedSection className="lg:w-[48%]">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-widest" style={{ color: BRAND }}>
                El programa
              </p>
              <h2 className="mb-5 text-3xl font-semibold tracking-tight text-sky-50 md:text-4xl">
                Un programa integral<br />
                <span className="gradient-text">de 3 semanas.</span>
              </h2>
              <p className="mb-6 text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                El Reto 21 Días combina evaluación metabólica con InBody, consulta médica, plan nutricional personalizado y entrenamiento guiado en un solo programa diseñado para crear hábitos reales.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  "Evaluación de composición corporal (InBody)",
                  "Consulta médica y nutricional",
                  "Plan alimentario personalizado",
                  "Entrenamiento guiado",
                  "Seguimiento durante las 3 semanas",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 shrink-0" style={{ color: BRAND }}>
                      <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Infografía */}
            <AnimatedItem index={1} className="lg:w-[52%]">
              <div className="relative rounded-2xl overflow-hidden"
                style={{ border: "1px solid rgba(0,174,239,0.18)", backgroundColor: "rgba(255,255,255,0.96)" }}>
                <Image
                  src={`${BP}/reto21dias1.webp`}
                  alt="Reto 21 Días — Programa de Transformación"
                  width={900}
                  height={506}
                  className="w-full h-auto"
                  sizes="(max-width: 1024px) 100vw, 52vw"
                />
              </div>
            </AnimatedItem>

          </div>
        </div>
      </section>

      {/* ── 4 Pilares ────────────────────────────────────────── */}
      <section className="px-6 md:px-8" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="mx-auto max-w-[1260px]">
          <AnimatedSection className="pt-24 pb-14">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-widest" style={{ color: BRAND }}>
              Metodología
            </p>
            <h2 className="text-4xl md:text-6xl text-white leading-[1.0]"
              style={{ fontFamily: "var(--font-reto)", letterSpacing: "0.02em" }}>
              Cuatro pilares.<br />Un resultado.
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            {pillars.map((p, i) => (
              <AnimatedItem key={p.label} index={i}>
                <motion.div
                  className={[
                    "group pb-14",
                    i === 0 ? "pt-10 pr-0 md:pr-8" : i === 3 ? "pt-10 pl-6 md:pl-8" : "pt-10 px-6 md:px-8",
                    i < 3 ? "md:border-r" : "",
                    i < 2 ? "border-b md:border-b-0" : "",
                  ].join(" ")}
                  style={{ borderColor: "rgba(255,255,255,0.08)" }}
                  whileHover={{}}
                >
                  <span
                    className="block leading-none mb-5"
                    style={{ fontFamily: "var(--font-reto)", fontSize: "clamp(3.5rem,6vw,5.5rem)", color: BRAND, letterSpacing: "-0.02em" }}
                  >
                    0{i + 1}
                  </span>
                  <motion.div
                    className="h-0.5 mb-5"
                    style={{ backgroundColor: BRAND, width: "28px" }}
                    whileHover={{ width: "48px" }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="mb-3 block text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: BRAND }}>
                    {p.label}
                  </span>
                  <h3
                    className="mb-3 text-white uppercase leading-[1.1]"
                    style={{ fontFamily: "var(--font-reto)", fontSize: "clamp(1.2rem,2vw,1.5rem)", letterSpacing: "0.04em" }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{p.desc}</p>
                </motion.div>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3 Semanas ────────────────────────────────────────── */}
      <section className="px-6 md:px-8" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="mx-auto max-w-[1260px]">
          <AnimatedSection className="pt-24 pb-14">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-widest" style={{ color: BRAND }}>
              Semana a semana
            </p>
            <h2 className="text-4xl md:text-6xl text-white leading-[1.0]"
              style={{ fontFamily: "var(--font-reto)", letterSpacing: "0.02em" }}>
              Cómo funciona<br />el reto.
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            {steps.map((s, i) => (
              <AnimatedItem key={s.day} index={i}>
                <motion.div
                  className={[
                    "group pb-14 pt-10",
                    i === 0 ? "pr-0 md:pr-8" : i === 2 ? "pl-0 md:pl-8" : "pl-0 md:px-8",
                    i < 2 ? "md:border-r" : "",
                    i < 2 ? "border-b md:border-b-0" : "",
                  ].join(" ")}
                  style={{ borderColor: "rgba(255,255,255,0.08)" }}
                >
                  <span
                    className="block leading-none mb-5"
                    style={{ fontFamily: "var(--font-reto)", fontSize: "clamp(3.5rem,6vw,5.5rem)", color: BRAND, letterSpacing: "-0.02em" }}
                  >
                    0{i + 1}
                  </span>
                  <motion.div
                    className="h-0.5 mb-5"
                    style={{ backgroundColor: BRAND, width: "28px" }}
                    whileHover={{ width: "48px" }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="mb-3 block text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: BRAND }}>
                    {s.day}
                  </span>
                  <h3
                    className="mb-3 text-white uppercase leading-[1.1]"
                    style={{ fontFamily: "var(--font-reto)", fontSize: "clamp(1.2rem,2vw,1.5rem)", letterSpacing: "0.04em" }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{s.desc}</p>
                </motion.div>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section id="inscribirse" className="px-6 py-28 text-center md:px-8"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,174,239,0.06) 0%, transparent 70%)" }}>
        <AnimatedSection>
          <span
            className="block mb-4"
            style={{ fontFamily: "var(--font-reto)", fontSize: "clamp(2rem, 6vw, 3.5rem)", letterSpacing: "0.08em", color: BRAND }}
          >
            RETO 21 DÍAS
          </span>
          <h2 className="mb-4 text-4xl font-semibold tracking-tight text-sky-50 md:text-5xl">
            ¿Listo para el cambio?
          </h2>
          <p className="mb-10 mx-auto max-w-[40ch] text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
            Agenda tu evaluación y comienza el reto. Tu transformación empieza con datos reales.
          </p>
          <div className="flex flex-col gap-3 items-stretch sm:items-center sm:flex-row sm:justify-center">
            <motion.a
              href={"https://agendapro.com/overview/51643841-fc06-42db-bcb5-78232dc5802a"}
              className="inline-flex items-center justify-center gap-2 rounded-2xl px-8 py-4 text-sm font-semibold text-white"
              style={{ backgroundColor: BRAND }}
              whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(0,174,239,0.45)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              Agendar evaluación →
            </motion.a>
            <motion.a
              href="https://wa.me/56991377915"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl px-8 py-4 text-sm font-semibold text-white"
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
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>
            {["3 semanas · 1 objetivo", "Evaluación incluida", "Equipo certificado"].map((item) => (
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
