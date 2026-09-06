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
    id: "personalizado",
    badge: "PERSONALIZADO",
    name: "Entrenamiento\nPersonalizado",
    tagline: "1 a 1 · A tu medida · Resultados",
    image: `${BP}/kettebell.webp`,
    href: "/entrenamiento/personalizado",
    schedule: [
      { d: "A convenir", h: "2 días/sem · 1 h" },
    ],
    gradient: "linear-gradient(135deg, #78350F 0%, #EAB308 100%)",
    color: "#EAB308",
    sessions: "2 días / semana · 1 h",
    price: "$200.000 / mes",
    bullets: [
      "Plan 100% individual, uno a uno con tu profesor",
      "2 sesiones por semana de 1 hora, a tu ritmo",
      "Evaluación InBody incluida para medir tu progreso",
      "Horario flexible, a convenir según tu disponibilidad",
    ],
  },
  {
    id: "funcional",
    badge: "FUNCIONAL DINAFIT",
    name: "Entrenamiento\nFuncional",
    tagline: "Velocidad · Coordinación · Agilidad",
    image: `${BP}/funcional.webp`,
    href: "/entrenamiento/funcional",
    schedule: [
      { d: "Lun", h: "18:00, 19:00" },
      { d: "Mar", h: "18:00" },
      { d: "Mié", h: "18:00, 19:00" },
      { d: "Jue", h: "18:00" },
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
    image: `${BP}/fuerza4.webp`,
    focusPoint: "32% 45%",
    href: "/entrenamiento/fuerza",
    schedule: [
      { d: "Lun", h: "08:00, 18:00, 19:00" },
      { d: "Mar", h: "08:00, 18:00, 19:00" },
      { d: "Mié", h: "08:00, 12:30, 18:00, 19:00" },
      { d: "Jue", h: "18:00, 19:00" },
      { d: "Vie", h: "08:00" },
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
    id: "halterofilia",
    badge: "HALTEROFILIA",
    name: "Halterofilia",
    tagline: "Arranque · Envión · Potencia",
    image: `${BP}/halterofilia.webp`,
    focusPoint: "70% 48%",
    href: "/entrenamiento/halterofilia",
    schedule: [
      { d: "Mar", h: "19:00" },
      { d: "Jue", h: "19:00" },
    ],
    gradient: "linear-gradient(135deg, #450A0A 0%, #DC2626 100%)",
    color: "#DC2626",
    sessions: "4 clases / mes",
    price: "Desde $50.000",
    bullets: [
      "Técnica olímpica: arranque, envión y sentadilla",
      "Grupos reducidos con guía profesional en cada sesión",
      "Progresión medida y segura desde el primer día",
      "Evaluación InBody incluida para medir tu progreso",
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
    schedule: [] as { d: string; h: string }[],
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
            backgroundColor: "rgba(0,0,0,0.5)",
            color: card.color,
            border: `1px solid ${card.color}66`,
            backdropFilter: "blur(4px)",
          }}
        >
          {card.badge}
        </span>

        {/* Name — altura fija (2 líneas) para que los badges queden alineados */}
        <h2
          className="mb-1 flex flex-col justify-end text-2xl leading-[1.1] md:text-3xl"
          style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em", whiteSpace: "pre-line", color: "#ffffff", textShadow: "0 2px 16px rgba(0,0,0,0.75)", minHeight: "2.2em" }}
        >
          {card.name}
        </h2>

        {/* Tagline — altura fija (2 líneas) */}
        <p className="mb-3 min-h-[2.5rem] text-sm font-medium text-white/75" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}>{card.tagline}</p>

        {/* Créditos (el precio real vive en las tarjetas de créditos) */}
        <p className="mb-6 text-sm font-semibold uppercase tracking-widest" style={{ color: card.color, textShadow: "0 1px 10px rgba(0,0,0,0.65)" }}>
          {card.id === "personalizado" ? card.price : "Usa tus créditos"}
        </p>

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
  Halterofilia: "#DC2626",
};
const ROWS: { time: string; cells: Record<string, string[]> }[] = [
  { time: "08:00", cells: { Lun: ["Fuerza"], Mar: ["Fuerza"], Mié: ["Fuerza"], Vie: ["Fuerza"] } },
  { time: "10:00", cells: { Dom: ["Fuerza"] } },
  { time: "11:00", cells: { Sáb: ["Funcional"], Dom: ["Fuerza"] } },
  { time: "12:30", cells: { Mié: ["Fuerza"] } },
  { time: "18:00", cells: { Lun: ["Funcional", "Fuerza"], Mar: ["Funcional", "Fuerza"], Mié: ["Funcional", "Fuerza"], Jue: ["Funcional", "Fuerza"] } },
  { time: "19:00", cells: { Lun: ["Funcional", "Fuerza"], Mar: ["Fuerza", "Halterofilia"], Mié: ["Funcional", "Fuerza"], Jue: ["Fuerza", "Halterofilia"] } },
  { time: "20:00", cells: { Lun: ["Movilidad"] } },
];

function cellBg(progs: string[]) {
  const colors = progs.map((p) => PROG[p]).filter(Boolean);
  if (colors.length <= 1) return colors[0] ?? PROG[progs[0]];
  const stops = colors
    .map((c, i) => `${c} ${Math.round((i / (colors.length - 1)) * 100)}%`)
    .join(", ");
  return `linear-gradient(135deg, ${stops})`;
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

/* ── Sistema de créditos (nuevo modelo) ─────────────────────────── */
const CREDIT_PLANS = [
  { n: 4, precio: "$50.000", freq: "1× por semana", hint: "Para empezar", featured: false },
  { n: 8, precio: "$70.000", freq: "2× por semana", hint: "El más elegido", featured: true },
  { n: 12, precio: "$80.000", freq: "3× por semana", hint: "Máxima frecuencia", featured: false },
];

const CREDIT_FAQ = [
  { q: "¿Qué es un crédito?", a: "Un crédito equivale a una clase." },
  { q: "¿Puedo usar mis créditos en distintas clases?", a: "Sí. Puedes distribuirlos entre las clases disponibles según tus preferencias." },
  { q: "¿Tengo que elegir todas mis clases al comprar?", a: "No. Primero compras tus créditos y luego reservas cada entrenamiento cuando quieras utilizarlo." },
  { q: "¿Puedo cambiar de tipo de entrenamiento?", a: "Sí. Puedes combinar las diferentes clases disponibles." },
  { q: "¿Cambian los horarios?", a: "No. Se mantienen los horarios disponibles del centro." },
  { q: "¿Cambian los valores?", a: "No. Se mantienen los valores definidos para cada cantidad de clases/créditos." },
];

const DISCIPLINAS: { name: string; color: string }[] = [
  { name: "Fuerza", color: "#F97316" },
  { name: "Halterofilia", color: "#DC2626" },
  { name: "Funcional", color: "#00AEEF" },
  { name: "Movilidad", color: "#10B981" },
  { name: "Stretching", color: "#8B5CF6" },
];

const COMO_FUNCIONA = [
  { n: "1", t: "Compra tus créditos", d: "Elige cuántos créditos necesitas. Ej: 4 créditos = 4 clases." },
  { n: "2", t: "Elige tu clase", d: "Fuerza, Halterofilia, Funcional, Movilidad u otra disponible." },
  { n: "3", t: "Reserva", d: "Selecciona el día y horario disponible que más te acomode." },
  { n: "4", t: "Entrena", d: "Cada clase que realizas descuenta 1 crédito." },
];

const EJEMPLO = [
  { dia: "Lunes", clase: "Fuerza", color: "#F97316" },
  { dia: "Miércoles", clase: "Halterofilia", color: "#DC2626" },
  { dia: "Jueves", clase: "Funcional", color: "#00AEEF" },
  { dia: "Sábado", clase: "Fuerza", color: "#F97316" },
];

function FaqItem({ q, a, open, onClick }: { q: string; a: string; open: boolean; onClick: () => void }) {
  return (
    <div className="border-b" style={{ borderColor: t.border }}>
      <button onClick={onClick} className="flex w-full items-center justify-between gap-4 py-5 text-left" aria-expanded={open}>
        <span className="text-base font-semibold sm:text-lg" style={{ color: t.text }}>{q}</span>
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-lg transition-transform"
          style={{ backgroundColor: "rgba(0,174,239,0.1)", color: BRAND, transform: open ? "rotate(45deg)" : "rotate(0)" }}
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

function CreditsSection() {
  const [faq, setFaq] = useState<number | null>(0);
  return (
    <>
      {/* ── Concepto ─────────────────────────────────────────────── */}
      <section id="creditos" className="px-6 py-16 md:px-10 md:py-24" style={{ backgroundColor: t.bg }}>
        <div className="mx-auto max-w-[1000px] text-center">
          <span
            className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest"
            style={{ backgroundColor: "rgba(0,174,239,0.1)", color: BRAND, border: `1px solid rgba(0,174,239,0.3)` }}
          >
            Nuevo · Sistema de créditos
          </span>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl" style={{ color: t.text, fontFamily: "var(--font-display)" }}>
            Entrena como quieras
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-base leading-relaxed md:text-lg" style={{ color: t.textMid }}>
            Ahora entrenar es más simple y flexible. Compra tus créditos y úsalos en la
            clase que prefieras. Reserva tu horario y elige cómo entrenar.
          </p>

          {/* 1 crédito = 1 clase */}
          <div className="mx-auto mt-10 flex max-w-[560px] flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <div className="flex-1 rounded-2xl px-6 py-5" style={{ backgroundColor: t.bgSoft, border: `1px solid ${t.border}` }}>
              <p className="text-3xl font-black md:text-4xl" style={{ color: t.text }}>1 crédito</p>
            </div>
            <span className="text-3xl font-black" style={{ color: BRAND }}>=</span>
            <div className="flex-1 rounded-2xl px-6 py-5" style={{ background: "linear-gradient(135deg, #00AEEF 0%, #0090C5 100%)" }}>
              <p className="text-3xl font-black text-white md:text-4xl">1 clase</p>
            </div>
          </div>

          {/* Tú eliges cuál + disciplinas */}
          <p className="mt-8 text-sm font-bold uppercase tracking-widest" style={{ color: t.textMuted }}>
            Tú eliges cuál
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
            {DISCIPLINAS.map((d) => (
              <span
                key={d.name}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
                style={{ backgroundColor: t.bgSoft, border: `1px solid ${t.border}`, color: t.text }}
              >
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                {d.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tarjetas de créditos ─────────────────────────────────── */}
      <section className="px-6 py-16 md:px-10 md:py-20" style={{ backgroundColor: t.bgSoft, borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}` }}>
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-10 text-center">
            <h3 className="text-3xl font-bold md:text-4xl" style={{ color: t.text, fontFamily: "var(--font-display)" }}>Elige tus créditos</h3>
            <p className="mt-2 text-base" style={{ color: t.textMid }}>Mismos valores de siempre. Ahora los usas en la clase que quieras.</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {CREDIT_PLANS.map((p) => (
              <div
                key={p.n}
                className="relative flex flex-col rounded-3xl p-7 text-center"
                style={
                  p.featured
                    ? { backgroundColor: t.text, boxShadow: "0 20px 50px rgba(0,0,0,0.18)" }
                    : { backgroundColor: t.bg, border: `1px solid ${t.border}` }
                }
              >
                {p.featured && (
                  <span
                    className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white"
                    style={{ backgroundColor: BRAND }}
                  >
                    {p.hint}
                  </span>
                )}
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: p.featured ? "rgba(255,255,255,0.55)" : t.textMuted }}>
                  {!p.featured && p.hint}
                  {p.featured && " "}
                </p>
                <p className="mt-1 text-6xl font-black leading-none" style={{ color: p.featured ? "#fff" : t.text, fontFamily: "var(--font-display)" }}>
                  {p.n}
                </p>
                <p className="mt-1 text-sm font-bold uppercase tracking-widest" style={{ color: BRAND }}>créditos</p>
                <p className="mt-3 text-lg font-semibold" style={{ color: p.featured ? "rgba(255,255,255,0.9)" : t.text }}>
                  = {p.n} clases
                </p>
                <p className="mt-4 text-3xl font-extrabold" style={{ color: p.featured ? "#fff" : t.text }}>{p.precio}</p>
                <p className="mt-4 text-sm" style={{ color: p.featured ? "rgba(255,255,255,0.7)" : t.textMid }}>
                  Úsalos en las clases que prefieras.
                </p>
                <a
                  href={AGENDA_URL}
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-bold transition-all"
                  style={
                    p.featured
                      ? { backgroundColor: BRAND, color: "#fff" }
                      : { backgroundColor: t.text, color: "#fff" }
                  }
                >
                  Comprar {p.n} créditos →
                </a>
              </div>
            ))}
          </div>

          {/* Trimestral */}
          <div
            className="mt-4 flex flex-col items-center gap-4 rounded-3xl p-6 text-center sm:flex-row sm:justify-between sm:text-left"
            style={{ backgroundColor: t.bg, border: `1px solid ${BRAND}55` }}
          >
            <div>
              <p className="text-lg font-bold" style={{ color: t.text }}>
                Plan Trimestral · <span style={{ color: BRAND }}>36 créditos</span>
              </p>
              <p className="text-sm" style={{ color: t.textMid }}>3× por semana · 36 clases en 3 meses · equivale a $63.333/mes</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-2xl font-extrabold leading-none" style={{ color: BRAND }}>$190.000</p>
                <span className="text-xs font-bold" style={{ color: "#16A34A" }}>Ahorras $50.000</span>
              </div>
              <a href={AGENDA_URL} className="rounded-2xl px-5 py-3 text-sm font-bold text-white" style={{ backgroundColor: t.text }}>
                Comprar →
              </a>
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center gap-2.5">
            <div
              className="inline-flex items-center gap-3 rounded-full px-6 py-3"
              style={{ backgroundColor: t.bg, border: `1px solid ${t.border}`, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}
            >
              <span className="text-base font-semibold sm:text-lg" style={{ color: t.text }}>Cada compra incluye evaluación</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${BP}/inbody-logo.png`} alt="InBody" style={{ height: "2em", width: "auto" }} />
            </div>
            <p className="text-sm" style={{ color: t.textMuted }}>Elige entre las clases y horarios disponibles.</p>
          </div>
        </div>
      </section>

      {/* ── ¿Cómo funciona? ──────────────────────────────────────── */}
      <section className="px-6 py-16 md:px-10 md:py-24" style={{ backgroundColor: t.bg }}>
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: BRAND }}>¿Cómo funciona?</p>
            <h3 className="text-3xl font-bold md:text-4xl" style={{ color: t.text, fontFamily: "var(--font-display)" }}>Simple, en 4 pasos</h3>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {COMO_FUNCIONA.map((s) => (
              <div key={s.n} className="rounded-2xl p-6" style={{ backgroundColor: t.bgSoft, border: `1px solid ${t.border}` }}>
                <span
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl text-lg font-black text-white"
                  style={{ backgroundColor: BRAND }}
                >
                  {s.n}
                </span>
                <h4 className="mb-1.5 text-lg font-bold" style={{ color: t.text }}>{s.t}</h4>
                <p className="text-sm leading-relaxed" style={{ color: t.textMid }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ejemplo real ─────────────────────────────────────────── */}
      <section className="px-6 pb-20 md:px-10" style={{ backgroundColor: t.bg }}>
        <div
          className="mx-auto max-w-[1000px] rounded-3xl p-8 md:p-12"
          style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)" }}
        >
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.5)" }}>Ejemplo real</p>
            <h3 className="mt-2 text-3xl font-bold text-white md:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
              Tienes <span style={{ color: BRAND }}>4 créditos</span>
            </h3>
            <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>Los combinas como quieras:</p>
          </div>
          <div className="mx-auto mt-8 grid max-w-[760px] grid-cols-2 gap-3 sm:grid-cols-4">
            {EJEMPLO.map((e, i) => (
              <div key={i} className="rounded-2xl p-5 text-center" style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.5)" }}>{e.dia}</p>
                <p className="mt-1.5 text-lg font-bold text-white">{e.clase}</p>
                <span className="mt-3 inline-block rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: `${e.color}22`, color: e.color }}>
                  −1 crédito
                </span>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-lg font-bold text-white">
            4 créditos = 4 clases · <span style={{ color: BRAND }}>tú decides dónde</span>
          </p>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="px-6 pb-20 md:px-10" style={{ backgroundColor: t.bg }}>
        <div className="mx-auto max-w-[760px]">
          <div className="mb-8 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: BRAND }}>Preguntas frecuentes</p>
            <h3 className="text-3xl font-bold md:text-4xl" style={{ color: t.text, fontFamily: "var(--font-display)" }}>Sobre los créditos</h3>
          </div>
          <div>
            {CREDIT_FAQ.map((f, i) => (
              <FaqItem key={f.q} q={f.q} a={f.a} open={faq === i} onClick={() => setFaq(faq === i ? null : i)} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Page ───────────────────────────────────────────────────────── */
export function EntrenamientoClient() {
  return (
    <div style={{ backgroundColor: t.bg, minHeight: "100vh" }}>

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="px-6 pt-28 pb-16 md:px-10 md:pt-32 md:pb-20 text-center" style={{ backgroundColor: t.bgSoft, borderBottom: `1px solid ${t.border}` }}>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: BRAND }}>
          Entrenamiento
        </p>
        <h1
          className="mb-4 text-5xl font-bold tracking-tight md:text-6xl"
          style={{ color: t.text, fontFamily: "var(--font-display)" }}
        >
          Tus créditos. Tus clases.<br />
          <span style={{ color: BRAND }}>Tu elección.</span>
        </h1>
        <p className="mx-auto max-w-[52ch] text-base leading-relaxed" style={{ color: t.textMid }}>
          1 crédito = 1 clase. Compra tus créditos y úsalos en el entrenamiento que
          prefieras: Fuerza, Halterofilia, Funcional, Movilidad y más.
        </p>
      </section>

      {/* ── Sistema de créditos ─────────────────────────────────────── */}
      <CreditsSection />

      {/* ── Grid de tarjetas ────────────────────────────────────────── */}
      <section className="px-4 py-16 md:px-6" style={{ backgroundColor: t.bgSoft, borderTop: `1px solid ${t.border}` }}>
        <div className="mx-auto mb-10 max-w-[1000px] text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: BRAND }}>Las clases</p>
          <h3 className="text-3xl font-bold md:text-4xl" style={{ color: t.text, fontFamily: "var(--font-display)" }}>Elige dónde usar tus créditos</h3>
          <p className="mx-auto mt-2 max-w-[46ch] text-base" style={{ color: t.textMid }}>Todas nuestras disciplinas. Usa tus créditos en cualquiera de ellas.</p>
        </div>
        <div className="mx-auto max-w-[1600px] grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
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
