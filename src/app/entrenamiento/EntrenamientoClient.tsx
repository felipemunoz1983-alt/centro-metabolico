"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const BP = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const AGENDA_URL = "/agendar";
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
    gradient: "linear-gradient(135deg, #0369A1 0%, #0EA5E9 100%)",
    color: BRAND,
    sessions: "4 clases / mes",
    price: "$50.000",
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
    gradient: "linear-gradient(135deg, #1C1917 0%, #44403C 100%)",
    color: "#F97316",
    sessions: "4 clases / mes",
    price: "$50.000",
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
    name: "Movilidad\nArticular",
    tagline: "Control · Estabilidad · Movimiento",
    image: `${BP}/movilidad1.webp`,
    href: "/entrenamiento/movilidad",
    gradient: "linear-gradient(135deg, #064E3B 0%, #10B981 100%)",
    color: "#10B981",
    sessions: "4 sesiones / mes",
    price: "$50.000",
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
    name: "Stretching\nFNP",
    tagline: "Flexibilidad · Relajación · Bienestar",
    image: `${BP}/movilidad3.webp`,
    href: "/entrenamiento/stretching",
    gradient: "linear-gradient(135deg, #1E3A5F 0%, #6366F1 100%)",
    color: "#6366F1",
    sessions: "4 sesiones / mes",
    price: "$50.000",
    bullets: [
      "Técnicas FNP para flexibilidad real y duradera",
      "Reduce tensión muscular y mejora el rango de movimiento",
      "Ideal para complementar cualquier programa de entrenamiento",
      "Sesiones enfocadas en recuperación y bienestar corporal",
    ],
  },
  {
    id: "recovery",
    badge: "RECOVERY",
    name: "Recovery\nActivo",
    tagline: "Regeneración · Descanso · Rendimiento",
    image: `${BP}/cm4.webp`,
    href: "/entrenamiento/recovery",
    gradient: "linear-gradient(135deg, #881337 0%, #F43F5E 100%)",
    color: "#F43F5E",
    sessions: "4 sesiones / mes",
    price: "$50.000",
    bullets: [
      "Técnicas de recuperación activa para deportistas y personas activas",
      "Reduce la fatiga muscular y acelera la regeneración tisular",
      "Optimiza tu rendimiento potenciando la calidad del descanso",
      "Grupos reducidos con guía profesional en cada sesión",
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
        <p className="mb-5 text-sm font-medium text-white/70">{card.tagline}</p>

        {/* Price + expand */}
        <div className="flex w-full items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-white">{card.price}</span>
            <span className="ml-2 text-xs text-white/60">{card.sessions}</span>
          </div>
          {card.href ? (
            <Link
              href={card.href}
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-all"
              style={{ backgroundColor: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)" }}
            >
              Ver más <span>+</span>
            </Link>
          ) : (
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-all"
              style={{ backgroundColor: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)" }}
            >
              {open ? "Cerrar" : "Ver más"}
              <span style={{ transform: open ? "rotate(45deg)" : "rotate(0)", display: "inline-block", transition: "transform 0.2s" }}>+</span>
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

/* ── Page ───────────────────────────────────────────────────────── */
export function EntrenamientoClient() {
  return (
    <div style={{ backgroundColor: t.bg, minHeight: "100vh" }}>

      {/* ── Navbar mini ─────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 md:px-10"
        style={{ backgroundColor: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${t.border}` }}
      >
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-70">
          <span className="text-lg font-bold" style={{ color: BRAND, fontFamily: "var(--font-display)" }}>C</span>
          <div className="h-5 w-px" style={{ backgroundColor: BRAND }} />
          <span className="text-lg font-bold" style={{ color: BRAND, fontFamily: "var(--font-display)" }}>M</span>
          <div className="ml-1 flex flex-col leading-none">
            <span className="text-[9px] font-semibold tracking-[0.18em] uppercase" style={{ color: t.textMuted }}>Centro</span>
            <span className="text-[9px] font-bold tracking-[0.12em] uppercase" style={{ color: BRAND }}>Metabólico</span>
          </div>
        </Link>
        <a
          href={AGENDA_URL}
          className="rounded-xl px-5 py-2 text-sm font-semibold text-white"
          style={{ backgroundColor: BRAND }}
        >
          Agendar →
        </a>
      </header>

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="px-6 py-16 md:px-10 md:py-20 text-center" style={{ backgroundColor: t.bgSoft, borderBottom: `1px solid ${t.border}` }}>
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
          Cinco programas con tecnología de precisión y metodología basada en evidencia. Cada uno diseñado para un objetivo específico.
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

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <footer className="py-10 text-center" style={{ borderTop: `1px solid ${t.border}` }}>
        <Link href="/" className="text-sm" style={{ color: t.textMuted }}>
          ← Volver al inicio
        </Link>
      </footer>
    </div>
  );
}
