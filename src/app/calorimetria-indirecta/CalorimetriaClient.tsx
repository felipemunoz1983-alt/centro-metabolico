"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Footer } from "@/components/sections/Footer";

const BP = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const ACCENT = "#00AEEF";
const ACCENT_LIGHT = "#33C3F5";

/* ──────────────────────────────────────────────────────────────────────────
   DATOS EDITABLES — completar con la información real del servicio.
   Mientras no estén confirmados se muestran como "[DATO POR CONFIRMAR]".
   ────────────────────────────────────────────────────────────────────────── */
const DATA = {
  precio: "[DATO POR CONFIRMAR]",
  duracion: "[DATO POR CONFIRMAR]", // ej: "30–45 min"
  modalidad: "Presencial · en consulta",
  lugar: "Suárez Mujica 950, Ñuñoa · Santiago",
  entregaResultados: "[DATO POR CONFIRMAR]", // ej: "el mismo día"
  // URL de la agenda. El servicio debe existir en el sistema de reservas.
  agendaUrl:
    "https://centro-metabolico-agendamiento.vercel.app/reservar?servicio=Calorimetr%C3%ADa%20Indirecta",
};

/* Variables del informe. `confirmar: true` = depende del equipo/protocolo real
   y debe validarse antes de publicar. */
const VARIABLES = [
  {
    k: "REE",
    t: "Gasto energético en reposo",
    d: "Las kilocalorías que tu cuerpo utiliza en reposo para mantener sus funciones vitales.",
    confirmar: false,
  },
  {
    k: "VO₂",
    t: "Consumo de oxígeno",
    d: "El volumen de oxígeno que tu organismo consume durante la medición.",
    confirmar: false,
  },
  {
    k: "VCO₂",
    t: "Producción de dióxido de carbono",
    d: "El volumen de CO₂ que tu cuerpo produce y exhala durante la evaluación.",
    confirmar: false,
  },
  {
    k: "RER",
    t: "Cociente respiratorio",
    d: "La relación entre el CO₂ producido y el O₂ consumido (VCO₂ / VO₂).",
    confirmar: false,
  },
  {
    k: "%",
    t: "Utilización relativa de sustratos",
    d: "La proporción estimada de grasas y carbohidratos que tu cuerpo utiliza en reposo.",
    confirmar: true,
  },
];

const PROCESO = [
  {
    n: "01",
    t: "Preparación",
    d: "Recibes con anticipación las instrucciones necesarias para llegar en las condiciones adecuadas.",
  },
  {
    n: "02",
    t: "Reposo",
    d: "Permaneces en condiciones controladas y en calma antes y durante la medición.",
  },
  {
    n: "03",
    t: "Medición",
    d: "Se analiza el intercambio de gases respiratorios mientras respiras con normalidad a través del sistema utilizado.",
  },
  {
    n: "04",
    t: "Resultados",
    d: "Se entregan y se explican los datos obtenidos durante la evaluación.",
  },
];

/* Preparación — cada ítem debe validarlo el profesional responsable. */
const PREPARACION = [
  { t: "Ayuno", d: "Indicaciones sobre alimentación previa a la evaluación." },
  { t: "Ejercicio previo", d: "Recomendaciones sobre actividad física antes de la medición." },
  { t: "Cafeína", d: "Consumo de café u otras bebidas con cafeína previo a la prueba." },
  { t: "Alcohol", d: "Consumo de alcohol en las horas previas." },
  { t: "Tabaco / nicotina", d: "Consumo de tabaco o nicotina antes de la evaluación." },
  { t: "Medicamentos", d: "Fármacos que podrían influir en la medición." },
  { t: "Descanso", d: "Descanso recomendado la noche anterior." },
  { t: "Horario", d: "Momento del día sugerido para realizar la evaluación." },
];

const PERFILES = [
  {
    t: "Quieres conocer tu gasto energético",
    d: "Para disponer de una medición individualizada de tu gasto energético en condiciones de reposo.",
  },
  {
    t: "Deportistas",
    d: "Para complementar la evaluación metabólica y fisiológica dentro de un contexto deportivo.",
  },
  {
    t: "Buscas mayor precisión",
    d: "Para comparar una estimación mediante ecuaciones con una medición obtenida por calorimetría indirecta.",
  },
  {
    t: "Profesionales de la salud",
    d: "Como herramienta de evaluación dentro de un proceso clínico o deportivo, cuando esté indicada.",
  },
];

const EXPERIENCIA = [
  { n: "1", t: "Recepción", d: "Te recibimos y resolvemos tus dudas antes de comenzar." },
  { n: "2", t: "Preparación", d: "Verificamos que estés en las condiciones adecuadas para medir." },
  { n: "3", t: "Instalación", d: "Se instala el sistema de análisis de gases respiratorios." },
  { n: "4", t: "Evaluación", d: "Realizamos la medición del intercambio de gases en reposo." },
  { n: "5", t: "Análisis", d: "Procesamos los datos obtenidos durante la evaluación." },
  { n: "6", t: "Explicación", d: "Revisamos contigo qué significan tus resultados." },
];

const FAQ = [
  {
    q: "¿La calorimetría indirecta duele?",
    a: "No. Es un procedimiento no invasivo: solo se analiza el aire que respiras mientras permaneces en reposo.",
  },
  {
    q: "¿Cuánto dura?",
    a: `La duración depende del protocolo utilizado. Duración estimada: ${DATA.duracion}.`,
  },
  {
    q: "¿Tengo que estar en ayunas?",
    a: "Las condiciones de ayuno dependen del protocolo del servicio. Recibirás las instrucciones exactas al agendar. [DATO POR CONFIRMAR]",
  },
  {
    q: "¿Puedo entrenar antes?",
    a: "Las recomendaciones sobre ejercicio previo dependen del protocolo utilizado y te serán indicadas antes de la evaluación. [DATO POR CONFIRMAR]",
  },
  {
    q: "¿Qué debo llevar?",
    a: "Te indicaremos con anticipación lo que necesites para tu evaluación. [DATO POR CONFIRMAR]",
  },
  {
    q: "¿Cuándo obtengo mis resultados?",
    a: `Los resultados se entregan y explican según el proceso del servicio. Entrega estimada: ${DATA.entregaResultados}.`,
  },
  {
    q: "¿La calorimetría indirecta mide mi metabolismo?",
    a: "Estima tu gasto energético a partir del intercambio de gases respiratorios. En este contexto, «metabolismo» se refiere a la energía que tu cuerpo utiliza, medida en condiciones de reposo.",
  },
  {
    q: "¿Es lo mismo que calcular mis calorías con una fórmula?",
    a: "No. Una fórmula estima tu gasto energético a partir de variables como edad, sexo, peso y talla. La calorimetría indirecta lo evalúa a partir de tu propio intercambio de gases respiratorios.",
  },
];

/* Chip para datos aún no confirmados */
function Pending({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center rounded-md border border-dashed px-2 py-0.5 text-[0.9em] font-semibold"
      style={{ borderColor: "rgba(0,174,239,0.45)", color: ACCENT_LIGHT }}
    >
      {children}
    </span>
  );
}

/* Renderiza texto sustituyendo [DATO POR CONFIRMAR] por el chip */
function withPending(text: string) {
  const parts = text.split(/(\[DATO POR CONFIRMAR\])/g);
  return parts.map((p, i) =>
    p === "[DATO POR CONFIRMAR]" ? <Pending key={i}>{p}</Pending> : <span key={i}>{p}</span>,
  );
}

const ANCHORS = [
  { id: "que-es", label: "Qué es" },
  { id: "que-mide", label: "Qué mide" },
  { id: "como-funciona", label: "Cómo funciona" },
  { id: "preparacion", label: "Preparación" },
  { id: "faq", label: "Preguntas" },
];

/* Sub-navegación pegajosa (aparece al salir del hero) */
function SubNav() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className="fixed left-0 right-0 top-[64px] z-30 transition-all duration-300"
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(-12px)",
        pointerEvents: show ? "auto" : "none",
      }}
    >
      <div
        className="mx-auto flex max-w-[1400px] items-center gap-1 overflow-x-auto px-4 py-2.5"
        style={{
          backgroundColor: "rgba(3,8,15,0.9)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(0,174,239,0.14)",
        }}
      >
        {ANCHORS.map((a) => (
          <a
            key={a.id}
            href={`#${a.id}`}
            className="whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold text-sky-100/70 transition-colors hover:text-sky-100"
          >
            {a.label}
          </a>
        ))}
        <a
          href={DATA.agendaUrl}
          className="ml-auto whitespace-nowrap rounded-lg px-4 py-1.5 text-xs font-bold text-white"
          style={{ backgroundColor: ACCENT }}
        >
          Agendar →
        </a>
      </div>
    </div>
  );
}

/* Un ítem del acordeón FAQ */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-base font-semibold text-white sm:text-lg">{q}</span>
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-lg transition-transform"
          style={{
            backgroundColor: "rgba(0,174,239,0.12)",
            color: ACCENT_LIGHT,
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          +
        </span>
      </button>
      <div
        className="grid transition-all duration-300"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="pb-5 text-sm leading-relaxed sm:text-base" style={{ color: "rgba(255,255,255,0.6)" }}>
            {withPending(a)}
          </p>
        </div>
      </div>
    </div>
  );
}

/* Encabezado de sección reutilizable */
function SectionHead({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
}) {
  return (
    <>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-3 text-xs font-bold uppercase tracking-[0.25em]"
        style={{ color: ACCENT }}
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.08 }}
        viewport={{ once: true }}
        className="max-w-2xl text-3xl leading-[1.08] text-white sm:text-4xl md:text-5xl"
        style={{ fontFamily: "var(--font-display)", letterSpacing: "0.01em" }}
      >
        {title}
      </motion.h2>
      {sub && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16 }}
          viewport={{ once: true }}
          className="mt-5 max-w-xl text-base leading-relaxed"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          {sub}
        </motion.p>
      )}
    </>
  );
}

export function CalorimetriaClient() {
  return (
    <div style={{ backgroundColor: "#03080F" }}>
      <SubNav />

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[100svh] w-full overflow-hidden"
        style={{ backgroundColor: "#03080F" }}
      >
        {/* Fotografía a pantalla completa */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${BP}/calorimetria.webp`}
          alt="Persona realizando una evaluación de calorimetría indirecta con mascarilla de análisis de gases respiratorios en Centro Metabólico"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "72% 32%" }}
          fetchPriority="high"
        />
        {/* Degradado lateral (izquierda oscura para el texto) */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(3,8,15,0.95) 0%, rgba(3,8,15,0.85) 34%, rgba(3,8,15,0.45) 64%, rgba(3,8,15,0.12) 100%)",
          }}
        />
        {/* Degradado vertical (arriba/abajo) para navbar y borde inferior */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(3,8,15,0.96) 0%, transparent 26%, transparent 74%, rgba(3,8,15,0.7) 100%)",
          }}
        />
        {/* Resplandor de marca */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(85% 60% at 12% 42%, rgba(0,174,239,0.14) 0%, transparent 55%)" }}
        />

        {/* Contenido */}
        <div className="relative mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-center px-6 pb-28 pt-28 sm:px-10 md:px-16">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.28em]"
              style={{
                backgroundColor: "rgba(0,174,239,0.12)",
                color: ACCENT_LIGHT,
                border: "1px solid rgba(0,174,239,0.32)",
                backdropFilter: "blur(4px)",
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full animate-pulse-dot"
                style={{ backgroundColor: ACCENT }}
              />
              Calorimetría Indirecta
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl leading-[1.02] text-white sm:text-5xl md:text-6xl lg:text-7xl"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "0.01em",
                textShadow: "0 2px 30px rgba(0,0,0,0.7)",
              }}
            >
              Mide cuánta energía{" "}
              <span className="gradient-text">realmente</span> utiliza tu cuerpo.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-6 max-w-xl text-base leading-relaxed sm:text-lg"
              style={{ color: "rgba(255,255,255,0.78)", textShadow: "0 1px 16px rgba(0,0,0,0.6)" }}
            >
              La calorimetría indirecta permite evaluar tu gasto energético en
              reposo a partir del análisis del intercambio de oxígeno (O₂) y
              dióxido de carbono (CO₂) en tu respiración.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a
                href={DATA.agendaUrl}
                className="inline-flex items-center gap-2 rounded-2xl px-7 py-4 text-sm font-bold text-white transition-all"
                style={{ backgroundColor: ACCENT, boxShadow: "0 0 34px rgba(0,174,239,0.4)" }}
              >
                Agendar mi evaluación →
              </a>
              <a
                href="#como-funciona"
                className="inline-flex items-center gap-2 rounded-2xl px-7 py-4 text-sm font-semibold transition-all"
                style={{
                  color: "rgba(220,242,255,0.95)",
                  border: "1px solid rgba(0,174,239,0.4)",
                  backgroundColor: "rgba(3,8,15,0.4)",
                  backdropFilter: "blur(6px)",
                }}
              >
                ¿Cómo funciona?
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 text-sm font-semibold uppercase tracking-[0.2em]"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Deja de estimar. Mide tu metabolismo.
            </motion.p>
          </div>
        </div>

        {/* Tarjeta flotante: donut de sustratos (oculta en móvil) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute bottom-8 right-6 z-10 hidden items-center gap-4 rounded-2xl p-4 md:flex md:p-5"
          style={{
            backgroundColor: "rgba(6,14,26,0.82)",
            border: "1px solid rgba(0,174,239,0.3)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
            backdropFilter: "blur(12px)",
          }}
        >
          <Donut size={104} />
          <div className="pr-1">
            <span
              className="mb-2 inline-block rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.16em]"
              style={{ backgroundColor: "rgba(0,174,239,0.16)", color: ACCENT_LIGHT, border: "1px solid rgba(0,174,239,0.32)" }}
            >
              Ejemplo
            </span>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>
              Uso de sustratos
            </p>
            {SUSTRATOS.map((d) => (
              <div key={d.label} className="mb-1 flex items-center gap-2 text-sm last:mb-0">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="text-white/80">{d.label}</span>
                <span className="ml-auto font-bold text-white">{d.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── POR QUÉ MEDIR ─────────────────────────────────────────────── */}
      <section id="por-que" className="border-t" style={{ borderColor: "rgba(255,255,255,0.07)", backgroundColor: "#060E1A" }}>
        <div className="mx-auto max-w-[1400px] px-6 py-20 sm:px-10 md:px-16 md:py-28">
          <SectionHead
            eyebrow="Por qué medir"
            title="Deja de adivinar tus calorías"
            sub="Una fórmula estima tu gasto energético. La calorimetría lo mide. Con tu número real, tu plan nutricional deja de ser un promedio y pasa a estar hecho para ti."
          />

          {/* Comparación visual: adivinar vs medir */}
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Adivinar */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative h-72 overflow-hidden rounded-3xl sm:h-80"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${BP}/plato-adivinar.webp`}
                alt="Plato con una porción grande de pasta servida al ojo, sin medir las calorías"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: "center 45%", filter: "saturate(0.85) brightness(0.8)" }}
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(3,8,15,0.92) 0%, rgba(3,8,15,0.2) 55%, rgba(3,8,15,0.35) 100%)" }}
              />
              <span
                className="absolute left-5 top-5 inline-flex items-center rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em]"
                style={{ backgroundColor: "rgba(3,8,15,0.55)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(6px)" }}
              >
                Adivinar
              </span>
              <span className="absolute right-5 top-4 text-4xl font-black" style={{ color: "rgba(255,255,255,0.32)" }}>
                ≈
              </span>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="text-xl font-bold text-white">Al ojo</h3>
                <p className="mt-1 max-w-xs text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
                  Porciones y calorías estimadas con una fórmula general. Un
                  promedio de población, no eres tú.
                </p>
              </div>
            </motion.div>

            {/* Medir */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative h-72 overflow-hidden rounded-3xl sm:h-80"
              style={{ border: "1px solid rgba(0,174,239,0.4)", boxShadow: "0 20px 50px rgba(0,0,0,0.4)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${BP}/plato-medida.webp`}
                alt="Plato equilibrado y porcionado según el gasto energético real medido con calorimetría"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: "center 50%" }}
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(3,8,15,0.9) 0%, rgba(0,174,239,0.08) 45%, transparent 72%)" }}
              />
              <span
                className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white"
                style={{ backgroundColor: "rgba(0,174,239,0.9)", border: "1px solid rgba(255,255,255,0.25)" }}
              >
                A tu medida ✓
              </span>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="text-xl font-bold text-white">A tu medida</h3>
                <p className="mt-1 max-w-xs text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.82)" }}>
                  Porciones y calorías ajustadas a tu gasto energético real,
                  medido con calorimetría.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Flecha + resultado */}
          <div className="mt-5 flex flex-col items-center">
            <span className="mb-3 text-2xl" style={{ color: ACCENT_LIGHT }}>↓</span>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex w-full flex-col items-center gap-6 rounded-3xl p-7 text-center md:flex-row md:justify-between md:text-left"
              style={{ background: "linear-gradient(120deg, rgba(0,174,239,0.16) 0%, rgba(0,174,239,0.03) 70%)", border: "1px solid rgba(0,174,239,0.35)" }}
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT_LIGHT }}>
                  El punto de partida
                </span>
                <h3 className="mt-1 text-2xl font-bold text-white sm:text-3xl" style={{ fontFamily: "var(--font-display)" }}>
                  Todo empieza por medir tu metabolismo
                </h3>
              </div>
              <a
                href={DATA.agendaUrl}
                className="inline-flex shrink-0 items-center gap-2 rounded-2xl px-7 py-4 text-sm font-bold text-white transition-all"
                style={{ backgroundColor: ACCENT, boxShadow: "0 0 30px rgba(0,174,239,0.4)" }}
              >
                Agendar mi evaluación →
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── QUÉ ES ────────────────────────────────────────────────────── */}
      <section id="que-es" className="border-t" style={{ borderColor: "rgba(255,255,255,0.07)", backgroundColor: "#03080F" }}>
        <div className="mx-auto max-w-[1400px] px-6 py-20 sm:px-10 md:px-16 md:py-28">
          <SectionHead
            eyebrow="Qué es"
            title="¿Qué es la calorimetría indirecta?"
            sub="Un método no invasivo que utiliza el intercambio respiratorio de oxígeno (O₂) y dióxido de carbono (CO₂) para estimar tu gasto energético. El equipo analiza tu respiración mientras permaneces en condiciones controladas."
          />

          {/* Storyboard visual de 3 pasos */}
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              {
                img: "calorimetria",
                pos: "64% 38%",
                graphic: false,
                icon: false,
                t: "Respiras",
                d: "Te recuestas y respiras con normalidad a través del sistema.",
                badge: null as string | null,
              },
              {
                img: "",
                pos: "center",
                graphic: true,
                icon: false,
                t: "Te entregamos tu metabolismo",
                d: "Tu gasto energético y el uso de grasas y carbohidratos en reposo.",
                badge: "Ejemplo",
              },
            ].map((s, i) => (
              <motion.div
                key={s.t}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                viewport={{ once: true }}
                className="relative h-72 overflow-hidden rounded-3xl sm:h-80"
                style={{ border: "1px solid rgba(0,174,239,0.22)" }}
              >
                {s.graphic ? (
                  /* Tarjeta con gráfico: metabolismo + uso de grasas en reposo */
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(160deg, #0B1628 0%, #03080F 100%)" }}
                  >
                    <div className="absolute inset-x-0 top-0 flex items-center gap-4 px-6 pb-4 pt-16">
                      <Donut size={104} />
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>
                          Metabolismo en reposo
                        </p>
                        <p className="text-3xl font-black leading-none text-white" style={{ fontFamily: "var(--font-display)" }}>
                          1.680
                          <span className="ml-1 text-sm font-semibold" style={{ color: ACCENT_LIGHT }}>
                            kcal/día
                          </span>
                        </p>
                        <div className="mt-3 space-y-1.5">
                          {SUSTRATOS.map((d) => (
                            <div key={d.label} className="flex items-center gap-2 text-xs">
                              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: d.color }} />
                              <span className="text-white/75">{d.label}</span>
                              <span className="ml-auto font-bold text-white">{d.value}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${BP}/${s.img}.webp`}
                      alt={s.t}
                      className="absolute inset-0 h-full w-full object-cover"
                      style={{ objectPosition: s.pos }}
                    />
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{ background: "linear-gradient(to top, rgba(3,8,15,0.95) 0%, rgba(3,8,15,0.35) 46%, rgba(3,8,15,0.12) 100%)" }}
                    />
                  </>
                )}
                {/* Número de paso */}
                <span
                  className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white"
                  style={{ backgroundColor: "rgba(0,174,239,0.92)", boxShadow: "0 6px 18px rgba(0,0,0,0.45)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {/* Etiqueta opcional */}
                {s.badge && (
                  <span
                    className="absolute right-5 top-5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider"
                    style={{ backgroundColor: "rgba(3,8,15,0.55)", color: ACCENT_LIGHT, border: "1px solid rgba(0,174,239,0.4)", backdropFilter: "blur(6px)" }}
                  >
                    {s.badge}
                  </span>
                )}
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="text-lg font-bold text-white">{s.t}</h3>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.78)" }}>
                    {s.d}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Línea de flujo textual */}
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>
            <span className="text-white">Respiración</span>
            <span style={{ color: ACCENT_LIGHT }}>→</span>
            <span className="text-white">O₂ / CO₂</span>
            <span style={{ color: ACCENT_LIGHT }}>→</span>
            <span className="text-white">Análisis</span>
            <span style={{ color: ACCENT_LIGHT }}>→</span>
            <span style={{ color: ACCENT_LIGHT }}>Gasto energético</span>
          </div>
        </div>
      </section>

      {/* ── QUÉ MIDE ──────────────────────────────────────────────────── */}
      <section id="que-mide" className="border-t" style={{ borderColor: "rgba(255,255,255,0.07)", backgroundColor: "#060E1A" }}>
        <div className="mx-auto max-w-[1400px] px-6 py-20 sm:px-10 md:px-16 md:py-28">
          <SectionHead
            eyebrow="Qué mide"
            title="Tus datos metabólicos"
            sub="Las variables que puede entregar el informe. La disponibilidad de cada una depende del equipo y del protocolo utilizado."
          />
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VARIABLES.map((v, i) => (
              <motion.div
                key={v.t}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                viewport={{ once: true }}
                className="flex flex-col rounded-2xl p-6"
                style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <span
                  className="mb-4 text-2xl font-bold"
                  style={{ fontFamily: "var(--font-mono)", color: ACCENT_LIGHT }}
                >
                  {v.k}
                </span>
                <h3 className="mb-1.5 font-bold text-white">{v.t}</h3>
                <p className="flex-1 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                  {v.d}
                </p>
                {v.confirmar && (
                  <span className="mt-4">
                    <Pending>Según equipo y protocolo</Pending>
                  </span>
                )}
              </motion.div>
            ))}
            {/* Nota editable */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center rounded-2xl p-6"
              style={{ border: "1px dashed rgba(0,174,239,0.35)", backgroundColor: "rgba(0,174,239,0.04)" }}
            >
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                <strong className="text-white">Módulo configurable.</strong> Añade
                o retira variables según lo que realmente entregue el equipamiento
                utilizado. No deben mostrarse variables que el equipo no mida.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── RESULTADOS ────────────────────────────────────────────────── */}
      <section id="resultados" className="border-t" style={{ borderColor: "rgba(255,255,255,0.07)", backgroundColor: "#03080F" }}>
        <div className="mx-auto max-w-[1400px] px-6 py-20 sm:px-10 md:px-16 md:py-28">
          <SectionHead
            eyebrow="Resultados"
            title="Así se ve tu información"
            sub="Un ejemplo de cómo se presentan los datos. Las cifras siguientes no corresponden a ningún paciente real."
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mt-12 overflow-hidden rounded-3xl"
            style={{ border: "1px solid rgba(0,174,239,0.2)", backgroundColor: "#0B1628" }}
          >
            {/* Barra superior del dashboard */}
            <div
              className="flex items-center justify-between px-6 py-4"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", backgroundColor: "rgba(0,174,239,0.06)" }}
            >
              <span className="text-sm font-semibold text-white">Informe metabólico</span>
              <span
                className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]"
                style={{ backgroundColor: "rgba(0,174,239,0.16)", color: ACCENT_LIGHT, border: "1px solid rgba(0,174,239,0.35)" }}
              >
                Ejemplo ilustrativo
              </span>
            </div>

            <div className="grid grid-cols-1 gap-px md:grid-cols-3" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
              {/* REE */}
              <div className="p-7" style={{ backgroundColor: "#0B1628" }}>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Gasto energético en reposo
                </p>
                <p className="leading-none">
                  <span className="text-5xl font-black text-white" style={{ letterSpacing: "-0.03em" }}>
                    1.680
                  </span>
                </p>
                <p className="mt-2 text-sm font-medium" style={{ color: ACCENT_LIGHT }}>
                  kcal / día
                </p>
              </div>

              {/* RER */}
              <div className="p-7" style={{ backgroundColor: "#0B1628" }}>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Cociente respiratorio (RER)
                </p>
                <p className="leading-none">
                  <span className="text-5xl font-black text-white" style={{ letterSpacing: "-0.03em" }}>
                    0,82
                  </span>
                </p>
                <p className="mt-2 text-sm font-medium" style={{ color: ACCENT_LIGHT }}>
                  VCO₂ / VO₂
                </p>
              </div>

              {/* Sustratos */}
              <div className="p-7" style={{ backgroundColor: "#0B1628" }}>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Uso relativo de sustratos
                </p>
                {[
                  { l: "Grasas", v: 60 },
                  { l: "Carbohidratos", v: 40 },
                ].map((s) => (
                  <div key={s.l} className="mb-3 last:mb-0">
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span style={{ color: "rgba(255,255,255,0.7)" }}>{s.l}</span>
                      <span className="font-semibold text-white">{s.v}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${s.v}%`, background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT_LIGHT})` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          <p className="mt-4 text-center text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            Valores de ejemplo. No representan resultados reales de un paciente.
          </p>
        </div>
      </section>

      {/* ── BENEFICIO: BAJAR DE PESO Y GRASA ──────────────────────────── */}
      <section id="objetivo" className="border-t" style={{ borderColor: "rgba(255,255,255,0.07)", backgroundColor: "#060E1A" }}>
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-6 py-20 sm:px-10 md:px-16 md:py-28 lg:grid-cols-2">
          {/* Texto */}
          <div>
            <SectionHead
              eyebrow="Un aliado para tu objetivo"
              title="Un apoyo real para bajar de peso y grasa corporal"
              sub="Conocer tu gasto energético medido —y no una estimación— te permite ajustar tus calorías con precisión. Esa precisión es la base para bajar de peso y grasa corporal de forma sostenible, en lugar de trabajar a ciegas con fórmulas generales."
            />
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                { t: "Tu punto de partida real", d: "Sabes cuánta energía usa tu cuerpo antes de definir tu plan." },
                { t: "Calorías con precisión", d: "Ajustas tu alimentación sobre tu dato, no sobre un promedio." },
                { t: "Seguimiento objetivo", d: "Puedes volver a medir y comparar tu evolución." },
                { t: "Decisiones informadas", d: "Menos ensayo y error en el camino hacia tu meta." },
              ].map((b) => (
                <motion.div
                  key={b.t}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  viewport={{ once: true }}
                  className="rounded-2xl p-5"
                  style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,174,239,0.14)" }}
                >
                  <h3 className="mb-1 text-sm font-bold text-white">{b.t}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {b.d}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Reseña */}
          <motion.figure
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl p-8 sm:p-10"
            style={{
              background: "linear-gradient(160deg, rgba(0,174,239,0.14) 0%, rgba(0,174,239,0.03) 60%)",
              border: "1px solid rgba(0,174,239,0.3)",
            }}
          >
            {/* Estrellas */}
            <div className="mb-5 flex items-center gap-1" aria-label="5 de 5 estrellas">
              {[0, 1, 2, 3, 4].map((i) => (
                <svg key={i} width="20" height="20" viewBox="0 0 20 20" fill={ACCENT_LIGHT} aria-hidden="true">
                  <path d="M10 1.6l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.2l-4.95 2.6.94-5.5-4-3.9 5.53-.8L10 1.6z" />
                </svg>
              ))}
            </div>
            <blockquote className="text-xl font-medium leading-snug text-white sm:text-2xl" style={{ fontFamily: "var(--font-display)" }}>
              “Con mi gasto energético medido pude ajustar mi alimentación con
              precisión y avanzar hacia mi objetivo de bajar de peso y grasa
              corporal, sin adivinar.”
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span
                className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white"
                style={{ backgroundColor: "rgba(0,174,239,0.25)", border: "1px solid rgba(0,174,239,0.4)" }}
              >
                CM
              </span>
              <span>
                <span className="block text-sm font-semibold text-white">Paciente de Centro Metabólico</span>
                <span className="block text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Reseña editable — reemplazar por testimonio real
                </span>
              </span>
            </figcaption>
          </motion.figure>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ─────────────────────────────────────────────── */}
      <section id="como-funciona" className="border-t" style={{ borderColor: "rgba(255,255,255,0.07)", backgroundColor: "#060E1A" }}>
        <div className="mx-auto max-w-[1400px] px-6 py-20 sm:px-10 md:px-16 md:py-28">
          <SectionHead eyebrow="Cómo funciona" title="Así funciona tu evaluación" />
          <div className="mt-12 grid grid-cols-1 border-t sm:grid-cols-2 lg:grid-cols-4" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
            {PROCESO.map(({ n, t, d }, i) => (
              <motion.div
                key={n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className={[
                  "py-8 lg:py-10",
                  i === 0 ? "lg:pr-8" : "lg:px-8",
                  i < 3 ? "lg:border-r" : "",
                  i < 3 ? "border-b lg:border-b-0" : "",
                ].join(" ")}
                style={{ borderColor: "rgba(255,255,255,0.1)" }}
              >
                <span
                  className="block leading-none"
                  style={{ fontFamily: "var(--font-reto)", fontSize: "clamp(3rem,8vw,5rem)", color: ACCENT, letterSpacing: "-0.02em" }}
                >
                  {n}
                </span>
                <div className="my-4 h-0.5 w-7" style={{ backgroundColor: ACCENT }} />
                <h3 className="mb-2 text-lg font-bold text-white">{t}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                  {d}
                </p>
              </motion.div>
            ))}
          </div>
          <p className="mt-6 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            Duración estimada de la evaluación: {withPending(DATA.duracion)}.
          </p>
        </div>
      </section>

      {/* ── PREPARACIÓN ───────────────────────────────────────────────── */}
      <section id="preparacion" className="border-t" style={{ borderColor: "rgba(255,255,255,0.07)", backgroundColor: "#03080F" }}>
        <div className="mx-auto max-w-[1400px] px-6 py-20 sm:px-10 md:px-16 md:py-28">
          <SectionHead
            eyebrow="Preparación"
            title="Cómo prepararte para una medición confiable"
            sub="Recibirás las instrucciones exactas al agendar. Las condiciones específicas de cada punto las define y valida el profesional responsable del servicio."
          />
          <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {PREPARACION.map((p, i) => (
              <motion.div
                key={p.t}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 rounded-2xl p-5"
                style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs"
                  style={{ backgroundColor: "rgba(0,174,239,0.14)", color: ACCENT_LIGHT }}
                >
                  ✓
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-white">{p.t}</h3>
                    <Pending>por confirmar</Pending>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {p.d}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARA QUIÉN ────────────────────────────────────────────────── */}
      <section id="para-quien" className="border-t" style={{ borderColor: "rgba(255,255,255,0.07)", backgroundColor: "#060E1A" }}>
        <div className="mx-auto max-w-[1400px] px-6 py-20 sm:px-10 md:px-16 md:py-28">
          <SectionHead eyebrow="Para quién" title="¿Para quién puede ser útil?" />
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {PERFILES.map((p, i) => (
              <motion.div
                key={p.t}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="rounded-2xl p-7"
                style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <h3 className="mb-2 text-lg font-bold text-white">{p.t}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                  {p.d}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIFERENCIADOR ─────────────────────────────────────────────── */}
      <section className="border-t" style={{ borderColor: "rgba(255,255,255,0.07)", backgroundColor: "#03080F" }}>
        <div className="mx-auto max-w-[1000px] px-6 py-24 text-center sm:px-10 md:py-32">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl leading-[1.1] text-white sm:text-4xl md:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            No queremos que adivines tu metabolismo.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="mt-8 inline-flex items-center gap-4 rounded-2xl px-8 py-5 text-lg font-semibold sm:text-2xl"
            style={{ border: "1px solid rgba(0,174,239,0.28)", backgroundColor: "rgba(0,174,239,0.05)" }}
          >
            <span style={{ color: "rgba(255,255,255,0.55)" }}>Estimación</span>
            <span style={{ color: ACCENT_LIGHT }}>≠</span>
            <span className="text-white">Medición</span>
          </motion.div>
        </div>
      </section>

      {/* ── EXPERIENCIA ───────────────────────────────────────────────── */}
      <section id="experiencia" className="border-t" style={{ borderColor: "rgba(255,255,255,0.07)", backgroundColor: "#060E1A" }}>
        <div className="mx-auto max-w-[1400px] px-6 py-20 sm:px-10 md:px-16 md:py-28">
          <SectionHead
            eyebrow="La experiencia"
            title="Más que ponerse una mascarilla"
            sub="Una evaluación acompañada, de principio a fin."
          />
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {EXPERIENCIA.map((e, i) => (
              <motion.div
                key={e.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 rounded-2xl p-6"
                style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold"
                  style={{ backgroundColor: "rgba(0,174,239,0.12)", color: ACCENT_LIGHT }}
                >
                  {e.n}
                </span>
                <div>
                  <h3 className="mb-1 font-bold text-white">{e.t}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {e.d}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section id="faq" className="border-t" style={{ borderColor: "rgba(255,255,255,0.07)", backgroundColor: "#03080F" }}>
        <div className="mx-auto max-w-[820px] px-6 py-20 sm:px-10 md:py-28">
          <SectionHead eyebrow="Preguntas frecuentes" title="Sobre la calorimetría indirecta" />
          <div className="mt-10">
            {FAQ.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ─────────────────────────────────────────────────── */}
      <section id="agendar" className="bg-white px-6 py-24 sm:px-10 md:px-16">
        <div className="mx-auto max-w-[1100px]">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-3 text-xs font-bold uppercase tracking-[0.25em]"
            style={{ color: ACCENT }}
          >
            Agenda tu evaluación
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            viewport={{ once: true }}
            className="max-w-2xl text-4xl leading-[1.05] md:text-5xl"
            style={{ fontFamily: "var(--font-display)", color: "#0A0A0A" }}
          >
            Deja de estimar. Empieza a medir.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.14 }}
            viewport={{ once: true }}
            className="mt-4 max-w-xl text-base leading-relaxed"
            style={{ color: "#4A5568" }}
          >
            Realiza una evaluación individualizada de tu gasto energético en reposo
            mediante calorimetría indirecta.
          </motion.p>

          {/* Datos del servicio */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { l: "Duración", v: DATA.duracion },
              { l: "Precio", v: DATA.precio },
              { l: "Modalidad", v: DATA.modalidad },
              { l: "Lugar", v: DATA.lugar },
            ].map((d) => (
              <div
                key={d.l}
                className="rounded-2xl p-4"
                style={{ backgroundColor: "#F4F8FB", border: "1px solid rgba(0,174,239,0.14)" }}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: "#8A98A8" }}>
                  {d.l}
                </p>
                <p className="mt-1 text-sm font-semibold" style={{ color: "#0A1628" }}>
                  {d.v.includes("[DATO POR CONFIRMAR]") ? <Pending>Por confirmar</Pending> : d.v}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <a
              href={DATA.agendaUrl}
              className="inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-sm font-bold text-white transition-all"
              style={{ backgroundColor: ACCENT, boxShadow: "0 10px 34px rgba(0,174,239,0.35)" }}
            >
              Agendar mi evaluación →
            </a>
            <p className="mt-3 text-xs" style={{ color: "#8A98A8" }}>
              Recibirás las instrucciones de preparación al confirmar tu hora.
            </p>
          </div>

          {/* Agenda embebida */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-10 overflow-hidden rounded-2xl"
            style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.1)" }}
          >
            <iframe
              src="https://centro-metabolico-agendamiento.vercel.app/reservar?servicio=Calorimetr%C3%ADa%20Indirecta"
              title="Reservar evaluación de calorimetría indirecta — Centro Metabólico"
              style={{ width: "100%", minHeight: "620px", border: "none", display: "block" }}
              scrolling="yes"
            />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Gráfico donut — distribución de sustratos (grasas / carbohidratos).
   Ligero, sin dependencias. Los valores son EJEMPLO ILUSTRATIVO.
   ────────────────────────────────────────────────────────────────────────── */
const SUSTRATOS = [
  { label: "Grasas", value: 60, color: ACCENT_LIGHT },
  { label: "Carbohidratos", value: 40, color: "#1C6E93" },
];

function Donut({ size = 128 }: { size?: number }) {
  const stroke = Math.round(size * 0.17);
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const total = SUSTRATOS.reduce((s, d) => s + d.value, 0);
  let acc = 0;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="shrink-0"
      role="img"
      aria-label="Distribución de sustratos: grasas 60%, carbohidratos 40% (ejemplo)"
    >
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} />
        {SUSTRATOS.map((d) => {
          const frac = d.value / total;
          const dash = frac * c;
          const seg = (
            <circle
              key={d.label}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={d.color}
              strokeWidth={stroke}
              strokeDasharray={`${dash} ${c - dash}`}
              strokeDashoffset={-acc * c}
            />
          );
          acc += frac;
          return seg;
        })}
      </g>
      <text x="50%" y="47%" textAnchor="middle" fill="#ffffff" fontSize={size * 0.2} fontWeight="800" style={{ fontFamily: "var(--font-display)" }}>
        60%
      </text>
      <text x="50%" y="63%" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize={size * 0.09} letterSpacing="1.5">
        GRASAS
      </text>
    </svg>
  );
}

