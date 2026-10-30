"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PlanesPricing } from "@/components/sections/PlanesPricing";
import { PLANES_FAQ } from "@/lib/planes";

const BP = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
import { waPlan } from "@/lib/contacto";
const BRAND = "#00AEEF";
const PILATES = "#EC4899";

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
    id: "pilates",
    waLabel: "Pilates Reformer",
    badge: "PILATES REFORMER",
    name: "Pilates\nReformer",
    // Sin "Reformer": ya está en el badge y en el nombre.
    tagline: "Control · Postura · Precisión",
    image: `${BP}/pilates-card.webp`,
    focusPoint: "50% 50%",
    href: "/entrenamiento/pilates",
    schedule: [
      { d: "Lun a Vie", h: "08:00, 09:00, 10:00" },
      { d: "Lun a Jue", h: "18:00, 19:00, 20:00" },
      { d: "Dom", h: "10:00" },
    ],
    gradient: "linear-gradient(135deg, #831843 0%, #EC4899 100%)",
    color: PILATES,
    sessions: "4 clases / mes",
    price: "Desde $40.500",
    bullets: [
      "Grupos reducidos con corrección postural en cada ejercicio",
      "Trabajo profundo de core, movilidad y control respiratorio",
      "Bajo impacto: ideal si vuelves de una lesión o partes de cero",
      "Complementa tu entrenamiento de fuerza sin sobrecargarte",
    ],
  },
  {
    id: "personalizado",
    waLabel: "Entrenamiento Personalizado",
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
    waLabel: "Entrenamiento Funcional",
    badge: "FUNCIONAL DINAFIT",
    name: "Entrenamiento\nFuncional",
    tagline: "Velocidad · Coordinación · Agilidad",
    image: `${BP}/funcional.webp`,
    href: "/entrenamiento/funcional",
    schedule: [
      { d: "Lun a Jue", h: "18:00" },
      { d: "Lun y Mié", h: "19:00" },
      { d: "Sáb", h: "10:00" },
    ],
    gradient: "linear-gradient(135deg, #0369A1 0%, #0EA5E9 100%)",
    color: BRAND,
    sessions: "4 clases / mes",
    price: "Desde $40.500",
    bullets: [
      "Luces de acción y reacción para mejorar tu respuesta neuromuscular",
      "Encoder deportivo para medir tu fuerza en tiempo real (1RM)",
      "Grupos reducidos con guía profesional en cada sesión",
      "Metodología basada en evidencia científica",
    ],
  },
  {
    id: "fuerza",
    waLabel: "Fuerza IRONFIT",
    badge: "FUERZA IRONFIT",
    name: "Entrenamiento\nde Fuerza",
    tagline: "Potencia · Músculo · Rendimiento",
    image: `${BP}/fuerza4.webp`,
    focusPoint: "50% 50%",
    href: "/entrenamiento/fuerza",
    schedule: [
      { d: "Mié", h: "12:30" },
      { d: "Lun a Jue", h: "18:00, 19:00" },
      { d: "Dom", h: "10:00, 11:00" },
    ],
    gradient: "linear-gradient(135deg, #1C1917 0%, #44403C 100%)",
    color: "#F97316",
    sessions: "4 clases / mes",
    price: "Desde $40.500",
    bullets: [
      "Máximo 7 personas por clase para atención personalizada",
      "Medición en tiempo real de tu nivel de fuerza y fatiga",
      "Profesor presente en cada movimiento para corregir técnica",
      "Progresión registrada sesión a sesión con datos reales",
    ],
  },
  {
    id: "hibrido",
    waLabel: "Entrenamiento Híbrido",
    badge: "HÍBRIDO",
    name: "Entrenamiento\nHíbrido",
    tagline: "Fuerza + Resistencia · Estilo Hyrox",
    image: `${BP}/hibrido.webp`,
    focusPoint: "50% 50%",
    href: "/entrenamiento/hibrido",
    schedule: [
      { d: "Mar y Jue", h: "19:00" },
    ],
    gradient: "linear-gradient(135deg, #2E1065 0%, #7C3AED 100%)",
    color: "#7C3AED",
    sessions: "4 clases / mes",
    price: "Desde $40.500",
    bullets: [
      "Combina fuerza y resistencia en una sola sesión, estilo Hyrox",
      "Corres + estaciones funcionales: trineo, remo, sandbag, wall balls y más",
      "Mejora tu capacidad aeróbica, tu potencia y tu resistencia a la fatiga",
      "Acondicionamiento integral que se traslada directo a tu vida diaria",
    ],
  },
  {
    id: "boxeo",
    waLabel: "Boxeo Funcional",
    badge: "BOXEO FUNCIONAL",
    name: "Boxeo\nFuncional",
    tagline: "Técnica · Reacción · Descarga",
    // PENDIENTE: foto real de la sala. Mientras no exista, la tarjeta se ve
    // con el degradado de fondo, no con la foto de otra disciplina.
    image: `${BP}/boxeo.webp`,
    focusPoint: "50% 50%",
    href: "/entrenamiento/boxeo",
    // PENDIENTE: dias y horas reales. No se inventan: alguien se presentaria
    // a una clase que no existe.
    schedule: [],
    gradient: "linear-gradient(135deg, #450A0A 0%, #DC2626 100%)",
    color: "#DC2626",
    sessions: "4 clases / mes",
    price: "Desde $40.500",
    bullets: [
      "Técnica real: guardia, jab, cross, hook, uppercut y trabajo de pies",
      "Saco y manoplas dentro de circuitos de alta intensidad",
      "Sin sparring ni contacto — nadie recibe golpes",
      "Coordinación, reacción y un gasto energético alto en poco tiempo",
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
  // Parallax suave y centrado: poco desplazamiento para que el sujeto quede
  // centrado en la tarjeta sin que el zoom lo corra hacia los bordes.
  const y = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

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
      <motion.div className="absolute inset-0" style={{ y, scale: 1.08 }}>
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
          {card.id === "personalizado" ? card.price : "Incluido en tu plan"}
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
                href={waPlan(card.waLabel)}
                target="_blank"
                rel="noopener noreferrer"
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
  Pilates: PILATES,
  Funcional: "#00AEEF",
  Fuerza: "#F97316",
  "Híbrido": "#7C3AED",
  Boxeo: "#DC2626",
};
const ROWS: { time: string; cells: Record<string, string[]> }[] = [
  { time: "08:00", cells: { Lun: ["Pilates"], Mar: ["Pilates"], "Mié": ["Pilates"], Jue: ["Pilates"], Vie: ["Pilates"] } },
  { time: "09:00", cells: { Lun: ["Pilates"], Mar: ["Pilates"], "Mié": ["Pilates"], Jue: ["Pilates"], Vie: ["Pilates"] } },
  { time: "10:00", cells: { Lun: ["Pilates"], Mar: ["Pilates"], "Mié": ["Pilates"], Jue: ["Pilates"], Vie: ["Pilates"], "Sáb": ["Funcional"], Dom: ["Fuerza", "Pilates"] } },
  { time: "11:00", cells: { Dom: ["Fuerza"] } },
  { time: "12:30", cells: { "Mié": ["Fuerza"] } },
  { time: "18:00", cells: { Lun: ["Funcional", "Fuerza", "Pilates"], Mar: ["Funcional", "Fuerza", "Pilates"], "Mié": ["Funcional", "Fuerza", "Pilates"], Jue: ["Funcional", "Fuerza", "Pilates"] } },
  { time: "19:00", cells: { Lun: ["Funcional", "Fuerza", "Pilates"], Mar: ["Fuerza", "Híbrido", "Pilates"], "Mié": ["Funcional", "Fuerza", "Pilates"], Jue: ["Fuerza", "Híbrido", "Pilates"] } },
  { time: "20:00", cells: { Lun: ["Pilates"], Mar: ["Pilates"], "Mié": ["Pilates"], Jue: ["Pilates"] } },
];

/**
 * Nombre visible de cada disciplina.
 *
 * La CLAVE sigue siendo la del dato -PROG la usa para el color y el SaaS para
 * la bolsa de creditos-, asi que renombrarla romperia ambos. Esto cambia solo
 * como se escribe.
 */
const ETIQUETA: Record<string, string> = {
  Pilates: "Pilates Reformer",
  Boxeo: "Boxeo Funcional",
};
const etiqueta = (p: string) => ETIQUETA[p] ?? p;

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
                          {progs.map(etiqueta).join(" / ")}
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
              {etiqueta(name)}
            </span>
          ))}
        </div>
        <p className="mt-3 text-center text-xs" style={{ color: t.textMuted }}>Cupos limitados · Reserva tu hora al agendar. Solo se muestran los días con clases.</p>
      </div>
    </section>
  );
}

/* ── Planes por compromiso ──────────────────────────────────────── */
const DISCIPLINAS: { name: string; color: string }[] = [
  { name: "Pilates Reformer", color: PILATES },
  { name: "Fuerza", color: "#F97316" },
  { name: "Funcional", color: "#00AEEF" },
  { name: "Híbrido", color: "#7C3AED" },
  { name: "Boxeo Funcional", color: "#DC2626" },
];

const PILARES = [
  {
    t: "Arrastra lo que no usaste",
    d: "Desde el plan Semestral las clases que te sobran pasan al mes siguiente. Hasta 4 en el Anual.",
  },
  {
    t: "Tus mediciones, incluidas",
    d: "La evaluación InBody viene dentro del plan. Entrenas con datos de tu composición corporal, no con sensaciones.",
  },
];

const COMO_FUNCIONA = [
  { n: "1", t: "Elige tu plan", d: "Cuántas clases al mes (4, 8, 12 o 16) y por cuánto tiempo te comprometes." },
  { n: "2", t: "Reserva online", d: "Cada clase la reservas desde tu portal, con cupo asegurado." },
  { n: "3", t: "Entrena donde quieras", d: "Pilates Reformer, Fuerza, Funcional o Híbrido: tu plan sirve para todas." },
  { n: "4", t: "Mide tu progreso", d: "Desde el plan Trimestral tus evaluaciones InBody vienen incluidas." },
];

const EJEMPLO = [
  { dia: "Lunes", clase: "Pilates Reformer", color: PILATES },
  { dia: "Martes", clase: "Fuerza", color: "#F97316" },
  { dia: "Jueves", clase: "Funcional", color: "#00AEEF" },
  { dia: "Sábado", clase: "Híbrido", color: "#7C3AED" },
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

function PlanesSection() {
  const [faq, setFaq] = useState<number | null>(0);
  return (
    <>
      {/* ── Concepto ─────────────────────────────────────────────── */}
      <section id="planes-concepto" className="px-6 py-16 md:px-10 md:py-24" style={{ backgroundColor: t.bg }}>
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: BRAND }}>El modelo</p>
            <h2 className="text-3xl font-bold md:text-4xl" style={{ color: t.text, fontFamily: "var(--font-display)" }}>
              Un plan. Todas las disciplinas.
            </h2>
            <p className="mx-auto mt-3 max-w-[54ch] text-base leading-relaxed" style={{ color: t.textMid }}>
              No compras clases sueltas: eliges cuántas quieres al mes y por cuánto tiempo. Mientras
              más largo el compromiso, menos pagas por clase y más evaluaciones vienen incluidas.
            </p>
          </div>
          <div className="mx-auto grid max-w-[760px] grid-cols-1 gap-4 md:grid-cols-2">
            {PILARES.map((p) => (
              <div key={p.t} className="rounded-2xl p-6" style={{ backgroundColor: t.bgSoft, border: `1px solid ${t.border}` }}>
                <h3 className="mb-2 text-lg font-bold" style={{ color: t.text }}>{p.t}</h3>
                <p className="text-sm leading-relaxed" style={{ color: t.textMid }}>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tabla de planes ──────────────────────────────────────── */}
      <PlanesPricing />

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
              Plan de <span style={{ color: BRAND }}>8 clases al mes</span>
            </h3>
            <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>Una semana tipo, repartida como tú quieras:</p>
          </div>
          <div className="mx-auto mt-8 grid max-w-[760px] grid-cols-2 gap-3 sm:grid-cols-4">
            {EJEMPLO.map((e, i) => (
              <div key={i} className="rounded-2xl p-5 text-center" style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.5)" }}>{e.dia}</p>
                <p className="mt-1.5 text-lg font-bold text-white">{e.clase}</p>
                <span className="mt-3 inline-block rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: `${e.color}22`, color: e.color }}>
                  1 clase
                </span>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-lg font-bold text-white">
            2 clases por semana · <span style={{ color: BRAND }}>tú decides en cuál disciplina</span>
          </p>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="px-6 pb-20 md:px-10" style={{ backgroundColor: t.bg }}>
        <div className="mx-auto max-w-[760px]">
          <div className="mb-8 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: BRAND }}>Preguntas frecuentes</p>
            <h3 className="text-3xl font-bold md:text-4xl" style={{ color: t.text, fontFamily: "var(--font-display)" }}>Sobre los planes</h3>
          </div>
          <div>
            {PLANES_FAQ.map((f, i) => (
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
          Tu plan. Tus clases.<br />
          <span style={{ color: BRAND }}>Tu elección.</span>
        </h1>
        <p className="mx-auto max-w-[52ch] text-base leading-relaxed" style={{ color: t.textMid }}>
          Eliges cuántas clases quieres al mes y las usas donde prefieras:
          Pilates Reformer, Fuerza, Funcional o Híbrido.
        </p>
      </section>

      {/* ── Planes ─────────────────────────────────────── */}
      <PlanesSection />

      {/* ── Grid de tarjetas ────────────────────────────────────────── */}
      <section className="px-4 py-16 md:px-6" style={{ backgroundColor: t.bgSoft, borderTop: `1px solid ${t.border}` }}>
        <div className="mx-auto mb-10 max-w-[1000px] text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: BRAND }}>Las clases</p>
          <h3 className="text-3xl font-bold md:text-4xl" style={{ color: t.text, fontFamily: "var(--font-display)" }}>Elige dónde entrenar</h3>
          <p className="mx-auto mt-2 max-w-[46ch] text-base" style={{ color: t.textMid }}>Todas nuestras disciplinas. Tu plan sirve en cualquiera de ellas.</p>
        </div>
        <div className="mx-auto flex max-w-[1240px] flex-wrap justify-center gap-4">
          {cards.map((card, i) => (
            <div key={card.id} className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]">
              <TrainingCard card={card} index={i} />
            </div>
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
