"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const BP = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const AGENDA_URL = "https://centro-metabolico-agendamiento.vercel.app/reservar?cat=Entrenamiento";
const BRAND = "#00AEEF";

const t = {
  bg:       "#ffffff",
  bgSoft:   "#F0F9FF",
  border:   "#E2E8F0",
  text:     "#0F172A",
  textMid:  "#475569",
  textMuted:"#94A3B8",
  brand:    BRAND,
};

const cards = [
  {
    id: "funcional",
    badge: "FUNCIONAL DINAFIT",
    name: "Entrenamiento\nFuncional",
    tagline: "Velocidad · Coordinación · Agilidad",
    image: `${BP}/funcional.webp`,
    href: "/entrenamiento/funcional",
    schedule: [
      { d: "Lun", h: "19:00" },
      { d: "Mié", h: "19:00" },
      { d: "Sáb", h: "11:00" },
    ],
    gradient: "linear-gradient(135deg, #0369A1 0%, #0EA5E9 100%)",
    color: BRAND,
    sessions: "4 clases / mes",
    price: "Desde $50.000",
    bullets: [
      "Luces de acción y reacción para mejorar tu respuesta neuromuscular",
      "Encoder deportivo para medir tu fuerza en tiempo real (1RM)",
      "Grupos reducidos con guía profesional en cada sesión",
      "Metodología basada en evidencia científica",
    ],
  },
  {
    id: "fuerza",
    badge: "FUERZA IRONFIT",
    name: "Entrenamiento\nde Fuerza",
    tagline: "Potencia · Músculo · Rendimiento",
    image: `${BP}/fuerza3.webp`,
    focusPoint: "50% 30%",
    href: "/entrenamiento/fuerza",
    schedule: [
      { d: "Lun", h: "19:00" },
      { d: "Mar", h: "19:00" },
      { d: "Mié", h: "12:30, 19:00" },
      { d: "Dom", h: "10:00, 11:00" },
    ],
    gradient: "linear-gradient(135deg, #1C1917 0%, #44403C 100%)",
    color: "#F97316",
    sessions: "4 clases / mes",
    price: "Desde $50.000",
    bullets: [
      "Máximo 7 personas por clase para atención personalizada",
      "Medición en tiempo real de tu nivel de fuerza y fatiga",
      "Profesor presente en cada movimiento para corregir técnica",
      "Progresión registrada sesión a sesión con datos reales",
    ],
  },
  {
    id: "movilidad",
    badge: "MOVILIDAD",
    name: "Movilidad",
    tagline: "Control · Estabilidad · Movimiento",
    image: `${BP}/movilidad1.webp`,
    href: "/entrenamiento/movilidad",
    schedule: [
      { d: "Lun", h: "20:00" },
      { d: "Dom", h: "10:00" },
    ],
    gradient: "linear-gradient(135deg, #064E3B 0%, #10B981 100%)",
    color: "#10B981",
    sessions: "4 sesiones / mes",
    price: "Desde $50.000",
    bullets: [
      "Diseñado para personas +35 que quieren moverse sin dolor",
      "Movilidad articular, control motor y estabilidad funcional",
      "Recuperación activa que potencia todos tus demás entrenamientos",
      "Grupos reducidos con guía profesional en cada sesión",
    ],
  },
  {
    id: "stretching",
    badge: "STRETCHING",
    name: "Stretching",
    tagline: "Flexibilidad · Relajación · Bienestar",
    image: `${BP}/movilidad3.webp`,
    href: "/entrenamiento/stretching",
    schedule: [
      { d: "Lun", h: "18:00" },
      { d: "Mié", h: "18:00" },
    ],
    gradient: "linear-gradient(135deg, #1E3A5F 0%, #6366F1 100%)",
    color: "#6366F1",
    sessions: "4 sesiones / mes",
    price: "Desde $50.000",
    bullets: [
      "Técnicas FNP para flexibilidad real y duradera",
      "Reduce tensión muscular y mejora el rango de movimiento",
      "Ideal para complementar cualquier programa de entrenamiento",
      "Sesiones enfocadas en recuperación y bienestar corporal",
    ],
  },
];

/* ── Tarjeta con parallax independiente ─────────────────────────── */
type Card = typeof cards[0] & { focusPoint?: string };

function TrainingCard({ card, index }: { card: Card; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl"
      style={{ height: "clamp(420px, 60vw, 520px)" }}
    >
      {/* ── Background image with parallax ── */}
      <motion.div className="absolute inset-0" style={{ y, scale: 1.15 }}>
        <Image
          src={card.image}
          alt={card.name}
          fill
          className="object-cover"
          style={{ objectPosition: card.focusPoint ?? "center center" }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          onError={() => {}}
        />
        {/* Gradient fallback always under the image */}
        <div className="absolute inset-0" style={{ background: card.gradient, zIndex: -1 }} />
      </motion.div>

      {/* ── Dark overlay ── */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.15) 100%)",
        }}
      />

      {/* ── Content ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-center">
        {/* Badge */}
        <span
          className="mb-4 rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase"
          style={{
            backgroundColor: `${card.color}22`,
            color: card.color,
            border: `1px solid ${card.color}55`,
          }}
        >
          {card.badge}
        </span>

        {/* Name */}
        <h2
          className="mb-1 text-2xl leading-[1.1] md:text-3xl"
          style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em", whiteSpace: "pre-line", color: card.color }}
        >
          {card.name}
        </h2>

        {/* Tagline */}
        <p className="mb-3 text-sm font-medium text-white/70">{card.tagline}</p>

        {/* Price */}
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: card.color }}>
          {card.price}
        </p>

        {/* Horarios */}
        <div className="mb-5 w-full">
          <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.25em] text-white/50">Horarios de clases</p>
          <div className="flex flex-wrap justify-center gap-x-2.5 gap-y-1 text-xs text-white/85">
            {card.schedule.map((s) => (
              <span key={s.d} className="whitespace-nowrap">
                <span className="font-bold" style={{ color: card.color }}>{s.d}</span> {s.h}
              </span>
            ))}
          </div>
        </div>

        {/* Expand */}
        <div className="flex w-full items-center justify-center">
          {card.href ? (
            <Link
              href={card.href}
              className="flex items-center justify-center gap-2 rounded-2xl px-8 py-3.5 text-base font-bold text-white w-full transition-all"
              style={{ backgroundColor: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.35)" }}
            >
              Ver más <span className="text-lg">+</span>
            </Link>
          ) : (
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center justify-center gap-2 rounded-2xl px-8 py-3.5 text-base font-bold text-white w-full transition-all"
              style={{ backgroundColor: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.35)" }}
            >
              {open ? "Cerrar" : "Ver más"}
              <span className="text-lg" style={{ transform: open ? "rotate(45deg)" : "rotate(0)", display: "inline-block", transition: "transform 0.2s" }}>+</span>
            </button>
          )}
        </div>

        {/* Expandable bullets */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: "hidden" }}
              className="w-full text-left"
            >
              <ul className="mt-5 space-y-2">
                {card.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-white/85">
                    <span style={{ color: card.color }} className="mt-0.5 shrink-0">✓</span>
                    {b}
                  </li>
                ))}
              </ul>
              <a
                href={AGENDA_URL}
                className="mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
                style={{ backgroundColor: card.color }}
              >
                Agendar →
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ── Parrilla semanal ───────────────────────────────────────────── */
const DAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"] as const;
const PROG: Record<string, string> = {
  Funcional: "#00AEEF",
  Fuerza: "#F97316",
  Movilidad: "#10B981",
  Stretching: "#6366F1",
};
const ROWS: { time: string; cells: Record<string, string[]> }[] = [
  { time: "10:00", cells: { Dom: ["Fuerza", "Movilidad"] } },
  { time: "11:00", cells: { Sáb: ["Funcional"], Dom: ["Fuerza"] } },
  { time: "12:30", cells: { Mié: ["Fuerza"] } },
  { time: "18:00", cells: { Lun: ["Stretching"], Mié: ["Stretching"] } },
  { time: "19:00", cells: { Lun: ["Funcional", "Fuerza"], Mar: ["Fuerza"], Mié: ["Funcional", "Fuerza"] } },
  { time: "20:00", cells: { Lun: ["Movilidad"] } },
];

function cellBg(progs: string[]) {
  if (progs.length === 1) return PROG[progs[0]];
  return `linear-gradient(135deg, ${PROG[progs[0]]} 0%, ${PROG[progs[1]]} 100%)`;
}

function WeeklySchedule() {
  const cols = "72px repeat(7, 1fr)";
  return (
    <section className="px-4 pb-20 md:px-6">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-8 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: BRAND }}>Parrilla semanal</p>
          <h2 className="text-3xl font-bold md:text-4xl" style={{ color: t.text, fontFamily: "var(--font-display)" }}>Horarios de entrenamiento</h2>
        </div>

        <div className="overflow-x-auto rounded-2xl" style={{ border: `1px solid ${t.border}` }}>
          <div className="min-w-[760px]">
            {/* Header */}
            <div className="grid" style={{ gridTemplateColumns: cols }}>
              <div style={{ backgroundColor: t.text }} />
              {DAYS.map((d) => (
                <div key={d} className="py-3 text-center text-sm font-bold uppercase tracking-wider text-white" style={{ backgroundColor: t.text }}>{d}</div>
              ))}
            </div>
            {/* Rows */}
            {ROWS.map((row) => (
              <div key={row.time} className="grid" style={{ gridTemplateColumns: cols, borderTop: `1px solid ${t.border}` }}>
                <div className="flex items-center justify-center py-4 text-sm font-bold" style={{ color: t.textMid, backgroundColor: t.bgSoft }}>{row.time}</div>
                {DAYS.map((d) => {
                  const progs = row.cells[d];
                  return (
                    <div key={d} className="flex items-center justify-center p-1.5" style={{ borderLeft: `1px solid ${t.border}` }}>
                      {progs ? (
                        <span className="w-full rounded-lg px-2 py-2 text-center text-[11px] font-bold uppercase leading-tight text-white" style={{ background: cellBg(progs) }}>
                          {progs.join(" / ")}
                        </span>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Leyenda */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {Object.entries(PROG).map(([name, color]) => (
            <span key={name} className="flex items-center gap-2 text-sm" style={{ color: t.textMid }}>
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
              {name}
            </span>
          ))}
        </div>
        <p className="mt-3 text-center text-xs" style={{ color: t.textMuted }}>Cupos limitados · Reserva tu hora al agendar. Solo se muestran los días con clases.</p>
      </div>
    </section>
  );
}

/* ── Page ───────────────────────────────────────────────────────── */
export function EntrenamientoClient() {
  return (
    <div style={{ backgroundColor: t.bg, minHeight: "100vh" }}>

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="px-6 pt-28 pb-16 md:px-10 md:pt-32 md:pb-20 text-center" style={{ backgroundColor: t.bgSoft, borderBottom: `1px solid ${t.border}` }}>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: BRAND }}>
          Entrenamiento Personalizado
        </p>
        <h1
          className="mb-4 text-5xl font-bold tracking-tight md:text-6xl"
          style={{ color: t.text, fontFamily: "var(--font-display)" }}
        >
          Elige tu programa.<br />
          <span style={{ color: BRAND }}>Transforma tu cuerpo.</span>
        </h1>
        <p className="mx-auto max-w-[50ch] text-base leading-relaxed" style={{ color: t.textMid }}>
          Cuatro programas con tecnología de precisión y metodología basada en evidencia. Cada uno diseñado para un objetivo específico.
        </p>
      </section>

      {/* ── Grid de tarjetas ────────────────────────────────────────── */}
      <section className="px-4 py-16 md:px-6">
        <div className="mx-auto max-w-[1600px] grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => (
            <TrainingCard key={card.id} card={card} index={i} />
          ))}
        </div>
      </section>

      {/* ── Parrilla semanal ────────────────────────────────────────── */}
      <WeeklySchedule />

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <footer className="py-10 text-center" style={{ borderTop: `1px solid ${t.border}` }}>
        <Link href="/" className="text-sm" style={{ color: t.textMuted }}>
          ← Volver al inicio
        </Link>
      </footer>
    </div>
  );
}
