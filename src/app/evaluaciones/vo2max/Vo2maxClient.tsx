"use client";

import { motion } from "framer-motion";

const BP = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const ACCENT = "#00AEEF";

const BENEFITS = [
  {
    n: "01",
    t: "Máximo\nuso de grasa",
    b: "Identificamos la intensidad exacta a la que tu cuerpo oxida más grasa por minuto (FATmax). La zona fisiológica para perder grasa de verdad — no solo bajar de peso.",
  },
  {
    n: "02",
    t: "Gasto calórico\nreal",
    b: "A partir de tu consumo de oxígeno (VO2) medido en tiempo real, conocemos cuántas kilocalorías quemas por minuto a cada intensidad. Tu gasto exacto, no la estimación del reloj.",
  },
  {
    n: "03",
    t: "Plan según\ntus objetivos",
    b: "Con tus umbrales VT1 y VT2 medidos directamente, diseñamos tus zonas de entrenamiento orientadas a tu meta: bajar grasa, ganar resistencia o rendimiento.",
  },
];

const HOW = [
  {
    n: "01",
    t: "Preparación\ny máscara",
    b: "Te equipamos con la máscara de análisis directo de gases y sensores cardíacos. Te explicamos el protocolo.",
  },
  {
    n: "02",
    t: "Test\nprogresivo",
    b: "Caminas o pedaleas mientras la intensidad sube por etapas. Medimos cada respiración y latido en tiempo real.",
  },
  {
    n: "03",
    t: "Informe\n+ estrategia",
    b: "Recibes tu VO2max absoluto, umbrales y zonas de entrenamiento personalizadas — el mismo día.",
  },
];

export function Vo2maxClient() {
  return (
    <div className="bg-[#050505] min-h-screen">

      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section className="relative h-screen overflow-hidden">
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src={`${BP}/vo2max.mp4`}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(105deg, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.55) 55%, rgba(5,5,5,0.18) 100%)" }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(5,5,5,0.55) 0%, transparent 15%, transparent 80%, rgba(5,5,5,0.8) 100%)" }}
        />

        <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 md:px-20">
          <motion.a
            href={`${BP}/evaluaciones/`}
            initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 self-start flex items-center gap-2 text-xs font-bold tracking-widest uppercase"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M10 7H4M7 4l-3 3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Evaluaciones
          </motion.a>
          <motion.span
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 self-start rounded-full px-4 py-1.5 text-[11px] font-bold tracking-widest uppercase"
            style={{ backgroundColor: "rgba(0,174,239,0.18)", color: ACCENT, border: `1px solid rgba(0,174,239,0.4)` }}
          >
            VO2max
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-8xl leading-[0.95] text-white mb-6 max-w-3xl"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em", textShadow: "0 2px 20px rgba(0,0,0,0.95), 0 4px 40px rgba(0,0,0,0.9)" }}
          >
            El número que<br /><span style={{ color: ACCENT }}>te predice.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-base md:text-lg leading-relaxed max-w-md mb-10"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Mide tu máximo uso de grasa, tu gasto calórico real y diseña un plan de entrenamiento a la medida de tu fisiología.
          </motion.p>
          <motion.a
            href="#reservar"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="self-start inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-sm font-bold text-white"
            style={{ backgroundColor: ACCENT, boxShadow: `0 0 32px rgba(0,174,239,0.35)` }}
          >
            Agendar VO2max →
          </motion.a>
        </div>
      </section>

      {/* ── BENEFITS BENTO ─────────────────────────────────────────── */}
      <section className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-16 grid grid-cols-1 md:grid-cols-3">
          {BENEFITS.map(({ n, t, b }, i) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }} viewport={{ once: true }}
              className={[
                "py-7 md:py-10",
                i === 0 ? "md:pr-8" : i === 2 ? "md:pl-8" : "md:px-8",
                i < 2 ? "md:border-r border-white/10" : "",
                i < 2 ? "border-b border-white/10 md:border-b-0" : "",
              ].join(" ")}
            >
              <span
                className="block leading-none mb-3"
                style={{ fontFamily: "var(--font-reto)", fontSize: "clamp(3rem,8vw,5rem)", color: ACCENT, letterSpacing: "-0.02em" }}
              >
                {n}
              </span>
              <div className="w-7 h-0.5 mb-4" style={{ backgroundColor: ACCENT }} />
              <h3
                className="font-bold uppercase text-white mb-3 whitespace-pre-line"
                style={{ fontFamily: "var(--font-reto)", fontSize: "clamp(1.1rem,2vw,1.4rem)", letterSpacing: "0.04em", lineHeight: 1.1 }}
              >
                {t}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{b}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────────── */}
      <section className="border-t border-white/10 bg-[#0e0e0e]">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-16 py-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }} viewport={{ once: true }}
            className="mb-2 text-sm font-bold uppercase tracking-widest" style={{ color: ACCENT }}
          >
            Cómo funciona
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }}
            className="mb-12 text-4xl md:text-5xl text-white"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em", lineHeight: "1.1" }}
          >
            15 minutos.<br />Supervisión clínica.
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-white/10">
            {HOW.map(({ n, t, b }, i) => (
              <motion.div
                key={n}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.12 }} viewport={{ once: true }}
                className={[
                  "py-7 md:py-10",
                  "px-0 md:px-0",
                  i === 0 ? "md:pr-8" : i === 2 ? "md:pl-8" : "md:px-8",
                  i < 2 ? "md:border-r border-white/10" : "",
                  i < 2 ? "border-b border-white/10 md:border-b-0" : "",
                ].join(" ")}
              >
                <span
                  className="block leading-none mb-3"
                  style={{ fontFamily: "var(--font-reto)", fontSize: "clamp(3rem,8vw,5rem)", color: ACCENT, letterSpacing: "-0.02em" }}
                >
                  {n}
                </span>
                <div className="w-7 h-0.5 mb-3" style={{ backgroundColor: ACCENT }} />
                <h3
                  className="font-bold uppercase text-white mb-2 whitespace-pre-line"
                  style={{ fontFamily: "var(--font-reto)", fontSize: "clamp(1rem,4vw,1.4rem)", letterSpacing: "0.04em", lineHeight: 1.1 }}
                >
                  {t}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{b}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: ACCENT }} className="py-20">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-16 grid grid-cols-3 gap-8 text-center">
          {[
            { num: "15", suffix: "min", label: "duración del test" },
            { num: "#1", suffix: "", label: "predictor de mortalidad" },
            { num: "+25", suffix: "", label: "parámetros cardiopulmonares" },
          ].map(({ num, suffix, label }) => (
            <div key={label}>
              <div className="leading-none mb-2">
                <span className="text-5xl md:text-7xl font-black text-white" style={{ letterSpacing: "-0.04em" }}>{num}</span>
                {suffix && <span className="text-3xl md:text-4xl font-black ml-1" style={{ color: "rgba(255,255,255,0.5)" }}>{suffix}</span>}
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.7)" }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── BOOKING ────────────────────────────────────────────────── */}
      <section id="reservar" className="bg-white py-24 px-6 sm:px-10 md:px-16">
        <div className="max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }} viewport={{ once: true }}
            className="mb-3 text-sm font-bold uppercase tracking-widest" style={{ color: ACCENT }}
          >
            Reserva tu evaluación
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }}
            className="mb-10 text-4xl md:text-5xl"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em", lineHeight: "1.1", color: "#0A0A0A" }}
          >
            Elige tu horario.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }} viewport={{ once: true }}
            className="rounded-2xl overflow-hidden"
            style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.08)" }}
          >
            <iframe
              src="https://centrometabolico.site.agendapro.com/cl/iframe/sucursal/364121"
              title="Reservar evaluación VO2max — Centro Metabólico"
              style={{ width: "100%", minHeight: "620px", border: "none", display: "block" }}
              scrolling="yes"
            />
          </motion.div>
        </div>
      </section>

    </div>
  );
}
