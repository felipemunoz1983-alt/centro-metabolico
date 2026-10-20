"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Footer } from "@/components/sections/Footer";
import { PlanesPricing } from "@/components/sections/PlanesPricing";

const BP = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const BRAND = "#00AEEF";
const PILATES = "#EC4899";
const AGENDA_URL = "https://centro-metabolico-agendamiento.vercel.app/reservar?cat=Entrenamiento";

const t = {
  bg: "#ffffff",
  bgSoft: "#FDF2F8",
  border: "#E2E8F0",
  text: "#0F172A",
  textMid: "#475569",
  textMuted: "#94A3B8",
};

/* ── Horario de Pilates ─────────────────────────────────────────── */
const DAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"] as const;
const HORARIO: { time: string; dias: string[] }[] = [
  { time: "08:00", dias: ["Lun", "Mar", "Mié", "Jue", "Vie"] },
  { time: "09:00", dias: ["Lun", "Mar", "Mié", "Jue", "Vie"] },
  { time: "10:00", dias: ["Lun", "Mar", "Mié", "Jue", "Vie", "Dom"] },
  { time: "20:00", dias: ["Lun", "Mar", "Mié", "Jue"] },
];

const BENEFICIOS = [
  {
    t: "Core que se nota fuera del estudio",
    d: "El trabajo profundo de centro mejora tu postura sentado, tu respiración y cómo cargas peso en el resto de tus entrenamientos.",
  },
  {
    t: "Bajo impacto, alta exigencia",
    d: "Sin saltos ni cargas que castiguen articulaciones. Exige control, no impacto: por eso sirve igual si partes de cero o si compites.",
  },
  {
    t: "Corrección en cada repetición",
    d: "Grupos reducidos. El profesor te corrige en el movimiento, que es donde el Pilates realmente cambia algo.",
  },
  {
    t: "Medido, no estimado",
    d: "Aquí el progreso se mide: InBody para composición corporal y calorimetría para tu metabolismo, incluidos según tu plan.",
  },
];

const PARA_QUIEN = [
  "Vuelves de una lesión y necesitas reconstruir base sin impacto",
  "Pasas muchas horas sentado y lo estás sintiendo en la espalda",
  "Entrenas fuerza y te falta movilidad y control para progresar",
  "Buscas empezar a moverte con algo exigente pero amable",
  "Quieres trabajar el core de verdad, no hacer abdominales",
];

const FAQ = [
  {
    q: "¿Necesito experiencia previa?",
    a: "No. Las clases se adaptan al nivel de cada persona y el profesor corrige en el momento. Mucha gente parte en Pilates justamente porque nunca ha entrenado.",
  },
  {
    q: "¿Puedo combinar Pilates con las otras clases?",
    a: "Sí, y es lo que recomendamos. Tu plan sirve para Pilates, Fuerza, Funcional e Híbrido: puedes hacer Pilates en la mañana y fuerza en la tarde el mismo día.",
  },
  {
    q: "¿Sirve si tengo una lesión o dolor de espalda?",
    a: "En general sí, y es uno de los motivos más frecuentes de consulta. Si vienes de una lesión reciente, agenda primero una evaluación para adaptar el trabajo a tu caso.",
  },
  {
    q: "¿Cuántas clases a la semana me conviene?",
    a: "Dos por semana (plan de 8 al mes) es el punto donde la mayoría empieza a notar cambios de postura y control. Tres o más si lo usas como entrenamiento principal.",
  },
  {
    q: "¿Qué llevo a la clase?",
    a: "Ropa cómoda que permita moverse, calcetines antideslizantes y tu botella de agua. El resto del material lo pone el centro.",
  },
];

function FaqItem({ q, a, open, onClick }: { q: string; a: string; open: boolean; onClick: () => void }) {
  return (
    <div className="border-b" style={{ borderColor: t.border }}>
      <button onClick={onClick} className="flex w-full items-center justify-between gap-4 py-5 text-left" aria-expanded={open}>
        <span className="text-base font-semibold sm:text-lg" style={{ color: t.text }}>{q}</span>
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-lg transition-transform"
          style={{ backgroundColor: "rgba(236,72,153,0.12)", color: PILATES, transform: open ? "rotate(45deg)" : "rotate(0)" }}
        >
          +
        </span>
      </button>
      <div className="grid transition-all duration-300" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
        <div className="overflow-hidden">
          <p className="pb-5 text-sm leading-relaxed sm:text-base" style={{ color: t.textMid }}>{a}</p>
        </div>
      </div>
    </div>
  );
}

export function PilatesClient() {
  const [faq, setFaq] = useState<number | null>(0);

  return (
    <div style={{ backgroundColor: t.bg, minHeight: "100vh" }}>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#0A0A0A" }}>
        <div className="absolute inset-0">
          <Image
            src={`${BP}/pilates.webp`}
            alt="Clase de Pilates en Centro Metabólico"
            fill
            priority
            className="object-cover"
            style={{ objectPosition: "50% 50%" }}
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.92) 10%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.45) 100%)" }}
          />
        </div>

        <div className="relative mx-auto flex max-w-[1100px] flex-col items-center px-6 pt-32 pb-20 text-center md:pt-40 md:pb-28">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest"
            style={{ backgroundColor: "rgba(236,72,153,0.18)", color: "#F9A8D4", border: "1px solid rgba(236,72,153,0.4)" }}
          >
            Nueva disciplina
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-5xl leading-[1.05] text-white md:text-7xl"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em", textShadow: "0 2px 24px rgba(0,0,0,0.9)" }}
          >
            Pilates
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-5 max-w-[46ch] text-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            Control, core y postura. Bajo impacto y alta exigencia, en grupos reducidos
            y con tu progreso medido, no estimado.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-9 flex w-full max-w-xs flex-col gap-3 sm:w-auto sm:flex-row"
          >
            <a
              href="#planes"
              className="inline-flex items-center justify-center gap-2 rounded-2xl px-8 py-4 text-base font-bold text-white"
              style={{ backgroundColor: PILATES }}
            >
              Ver planes →
            </a>
            <a
              href="#horario"
              className="inline-flex items-center justify-center gap-2 rounded-2xl px-8 py-4 text-base font-bold text-white"
              style={{ backgroundColor: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.3)" }}
            >
              Ver horarios
            </a>
          </motion.div>

          <p className="mt-6 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            Lun a Vie 08:00 · 09:00 · 10:00 · 20:00 — Dom 10:00
          </p>
        </div>
      </section>

      {/* ── Beneficios ───────────────────────────────────────────── */}
      <section className="px-6 py-16 md:px-10 md:py-24" style={{ backgroundColor: t.bg }}>
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: PILATES }}>Por qué Pilates</p>
            <h2 className="text-3xl font-bold md:text-4xl" style={{ color: t.text, fontFamily: "var(--font-display)" }}>
              Lo que se trabaja de verdad
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {BENEFICIOS.map((b) => (
              <div key={b.t} className="rounded-2xl p-7" style={{ backgroundColor: t.bgSoft, border: `1px solid ${t.border}` }}>
                <h3 className="mb-2 text-lg font-bold" style={{ color: t.text }}>{b.t}</h3>
                <p className="text-sm leading-relaxed" style={{ color: t.textMid }}>{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Para quién ───────────────────────────────────────────── */}
      <section className="px-6 pb-20 md:px-10">
        <div
          className="mx-auto max-w-[1000px] rounded-3xl p-8 md:p-12"
          style={{ background: "linear-gradient(135deg, #500724 0%, #9D174D 100%)" }}
        >
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.55)" }}>Para quién es</p>
          <h3 className="mt-2 text-3xl font-bold text-white md:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
            Esto es para ti si…
          </h3>
          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {PARA_QUIEN.map((p) => (
              <li
                key={p}
                className="flex items-start gap-3 rounded-2xl p-4 text-sm leading-snug text-white/90"
                style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                <span className="mt-0.5 shrink-0" style={{ color: "#F9A8D4" }}>✓</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Horario ──────────────────────────────────────────────── */}
      <section id="horario" className="px-4 pb-20 md:px-6">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-8 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: PILATES }}>Horario</p>
            <h2 className="text-3xl font-bold md:text-4xl" style={{ color: t.text, fontFamily: "var(--font-display)" }}>
              Clases de Pilates
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl" style={{ border: `1px solid ${t.border}` }}>
            <div className="min-w-[760px]">
              <div className="grid" style={{ gridTemplateColumns: "72px repeat(7, 1fr)" }}>
                <div style={{ backgroundColor: t.text }} />
                {DAYS.map((d) => (
                  <div key={d} className="py-3 text-center text-sm font-bold uppercase tracking-wider text-white" style={{ backgroundColor: t.text }}>
                    {d}
                  </div>
                ))}
              </div>
              {HORARIO.map((row) => (
                <div key={row.time} className="grid" style={{ gridTemplateColumns: "72px repeat(7, 1fr)", borderTop: `1px solid ${t.border}` }}>
                  <div className="flex items-center justify-center py-4 text-sm font-bold" style={{ color: t.textMid, backgroundColor: t.bgSoft }}>
                    {row.time}
                  </div>
                  {DAYS.map((d) => (
                    <div key={d} className="flex items-center justify-center p-1.5" style={{ borderLeft: `1px solid ${t.border}` }}>
                      {row.dias.includes(d) ? (
                        <span
                          className="w-full rounded-lg px-2 py-2 text-center text-[11px] font-bold uppercase leading-tight text-white"
                          style={{ backgroundColor: PILATES }}
                        >
                          Pilates
                        </span>
                      ) : null}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <p className="mt-4 text-center text-xs" style={{ color: t.textMuted }}>
            Cupos limitados · Reserva cada clase desde tu portal. Solo se muestran los bloques con Pilates.
          </p>
          <div className="mt-6 text-center">
            <a
              href={AGENDA_URL}
              className="inline-flex items-center justify-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-bold text-white"
              style={{ backgroundColor: t.text }}
            >
              Reservar una clase →
            </a>
          </div>
        </div>
      </section>

      {/* ── Planes ───────────────────────────────────────────────── */}
      <PlanesPricing
        disciplina="Pilates"
        titulo="Planes para entrenar Pilates"
        bajada="El mismo plan te sirve para Pilates y para el resto de las disciplinas. Mientras más largo el compromiso, menos pagas por clase y más evaluaciones vienen incluidas."
      />

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="px-6 py-16 md:px-10 md:py-24" style={{ backgroundColor: t.bg }}>
        <div className="mx-auto max-w-[760px]">
          <div className="mb-8 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: PILATES }}>Preguntas frecuentes</p>
            <h2 className="text-3xl font-bold md:text-4xl" style={{ color: t.text, fontFamily: "var(--font-display)" }}>
              Antes de tu primera clase
            </h2>
          </div>
          <div>
            {FAQ.map((f, i) => (
              <FaqItem key={f.q} q={f.q} a={f.a} open={faq === i} onClick={() => setFaq(faq === i ? null : i)} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/entrenamiento" className="text-sm font-semibold" style={{ color: BRAND }}>
              ← Ver todas las disciplinas
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
