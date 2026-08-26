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
        className="relative flex min-h-[100svh] items-center overflow-hidden"
        style={{ backgroundColor: "#03080F" }}
      >
        {/* Fondo: resplandor + rejilla + motivo respiratorio */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 78% 20%, rgba(0,174,239,0.16) 0%, rgba(0,174,239,0.05) 35%, transparent 62%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,174,239,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,174,239,0.05) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(80% 80% at 70% 30%, #000 0%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(80% 80% at 70% 30%, #000 0%, transparent 75%)",
          }}
        />

        <div className="relative mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-12 px-6 pb-16 pt-28 sm:px-10 md:px-16 lg:grid-cols-[1.1fr_0.9fr] lg:pt-20">
          {/* Texto */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.28em]"
              style={{
                backgroundColor: "rgba(0,174,239,0.1)",
                color: ACCENT_LIGHT,
                border: "1px solid rgba(0,174,239,0.32)",
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
              style={{ fontFamily: "var(--font-display)", letterSpacing: "0.01em" }}
            >
              Mide cuánta energía{" "}
              <span className="gradient-text">realmente</span> utiliza tu cuerpo.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-6 max-w-xl text-base leading-relaxed sm:text-lg"
              style={{ color: "rgba(255,255,255,0.66)" }}
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
                  color: "rgba(200,235,255,0.9)",
                  border: "1px solid rgba(0,174,239,0.3)",
                  backgroundColor: "rgba(0,174,239,0.06)",
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
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Deja de estimar. Mide tu metabolismo.
            </motion.p>
          </div>

          {/* Visual: intercambio de gases (SVG) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <GasExchangeVisual />
          </motion.div>
        </div>
      </section>

      {/* ── POR QUÉ MEDIR ─────────────────────────────────────────────── */}
      <section id="por-que" className="border-t" style={{ borderColor: "rgba(255,255,255,0.07)", backgroundColor: "#060E1A" }}>
        <div className="mx-auto max-w-[1400px] px-6 py-20 sm:px-10 md:px-16 md:py-28">
          <SectionHead
            eyebrow="Por qué medir"
            title="¿Por qué medir tu gasto energético?"
            sub="Una estimación puede ser útil. Una medición aporta información individualizada sobre tu propio cuerpo."
          />
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Estimar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="rounded-3xl p-8"
              style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.4)" }}>
                Estimar
              </span>
              <div
                className="my-6 rounded-xl px-5 py-4 font-mono text-sm"
                style={{ backgroundColor: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.55)", border: "1px dashed rgba(255,255,255,0.14)" }}
              >
                GE ≈ ƒ (edad, sexo, peso, talla…)
              </div>
              <h3 className="mb-2 text-lg font-bold text-white">Ecuaciones predictivas</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                Las fórmulas usan variables generales de población para estimar tu
                gasto energético. Son un punto de partida útil, pero no observan tu
                fisiología individual.
              </p>
            </motion.div>

            {/* Medir */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl p-8"
              style={{
                background: "linear-gradient(160deg, rgba(0,174,239,0.14) 0%, rgba(0,174,239,0.03) 60%)",
                border: "1px solid rgba(0,174,239,0.3)",
              }}
            >
              <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT_LIGHT }}>
                Medir
              </span>
              <div
                className="my-6 flex items-center gap-3 rounded-xl px-5 py-4 font-mono text-sm"
                style={{ backgroundColor: "rgba(0,174,239,0.1)", color: ACCENT_LIGHT, border: "1px solid rgba(0,174,239,0.3)" }}
              >
                O₂ · CO₂ → datos fisiológicos
              </div>
              <h3 className="mb-2 text-lg font-bold text-white">Calorimetría indirecta</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.62)" }}>
                Evalúa el intercambio de gases respiratorios para estimar tu gasto
                energético en condiciones de reposo, a partir de datos obtenidos de
                tu propio organismo.
              </p>
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

          {/* Flujo */}
          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "Respiración", d: "Respiras con normalidad a través del sistema." },
              { t: "O₂ / CO₂", d: "Se mide el oxígeno consumido y el CO₂ producido." },
              { t: "Análisis metabólico", d: "Se procesan los gases respiratorios." },
              { t: "Gasto energético", d: "Se estima la energía que utiliza tu cuerpo." },
            ].map((s, i) => (
              <motion.div
                key={s.t}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative rounded-2xl p-6"
                style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,174,239,0.14)" }}
              >
                <span
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold"
                  style={{ backgroundColor: "rgba(0,174,239,0.12)", color: ACCENT_LIGHT }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-1.5 font-bold text-white">{s.t}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {s.d}
                </p>
                {i < 3 && (
                  <span
                    className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-2xl lg:block"
                    style={{ color: "rgba(0,174,239,0.5)" }}
                  >
                    →
                  </span>
                )}
              </motion.div>
            ))}
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
   Visual SVG — intercambio de gases respiratorios (O₂ entra / CO₂ sale).
   Ligero, GPU-friendly, sin dependencias externas.
   ────────────────────────────────────────────────────────────────────────── */
function GasExchangeVisual() {
  return (
    <div
      className="relative aspect-square w-full rounded-[2rem] p-6"
      style={{
        background: "linear-gradient(160deg, rgba(11,22,40,0.9) 0%, rgba(3,8,15,0.9) 100%)",
        border: "1px solid rgba(0,174,239,0.2)",
        boxShadow: "0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(0,174,239,0.1)",
      }}
    >
      <svg viewBox="0 0 400 400" className="h-full w-full" role="img" aria-label="Diagrama del intercambio de gases: O₂ consumido y CO₂ producido">
        <defs>
          <radialGradient id="core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#33C3F5" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#00AEEF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#00AEEF" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="wave" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00AEEF" stopOpacity="0" />
            <stop offset="50%" stopColor="#33C3F5" stopOpacity="1" />
            <stop offset="100%" stopColor="#00AEEF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* anillos */}
        {[150, 110, 70].map((r, i) => (
          <circle
            key={r}
            cx="200"
            cy="200"
            r={r}
            fill="none"
            stroke="rgba(0,174,239,0.18)"
            strokeWidth="1"
            strokeDasharray={i === 0 ? "3 6" : undefined}
          >
            <animate attributeName="opacity" values="0.35;0.7;0.35" dur={`${4 + i}s`} repeatCount="indefinite" />
          </circle>
        ))}

        {/* núcleo */}
        <circle cx="200" cy="200" r="120" fill="url(#core)">
          <animate attributeName="r" values="118;128;118" dur="5s" repeatCount="indefinite" />
        </circle>

        {/* onda respiratoria */}
        <path
          d="M60 200 Q100 200 115 200 T150 170 T185 230 T220 160 T255 240 T285 200 T340 200"
          fill="none"
          stroke="url(#wave)"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
        </path>

        {/* O₂ entrante */}
        <g>
          <circle cx="90" cy="120" r="20" fill="rgba(0,174,239,0.12)" stroke="rgba(0,174,239,0.5)" strokeWidth="1" />
          <text x="90" y="125" textAnchor="middle" fill="#33C3F5" fontSize="15" fontWeight="700" fontFamily="monospace">
            O₂
          </text>
          <path d="M112 128 L150 160" stroke="rgba(51,195,245,0.5)" strokeWidth="1.5" strokeDasharray="2 4">
            <animate attributeName="stroke-dashoffset" values="12;0" dur="1s" repeatCount="indefinite" />
          </path>
        </g>

        {/* CO₂ saliente */}
        <g>
          <circle cx="315" cy="285" r="22" fill="rgba(0,174,239,0.08)" stroke="rgba(0,174,239,0.4)" strokeWidth="1" />
          <text x="315" y="290" textAnchor="middle" fill="rgba(200,235,255,0.85)" fontSize="14" fontWeight="700" fontFamily="monospace">
            CO₂
          </text>
          <path d="M250 240 L293 272" stroke="rgba(200,235,255,0.35)" strokeWidth="1.5" strokeDasharray="2 4">
            <animate attributeName="stroke-dashoffset" values="0;12" dur="1s" repeatCount="indefinite" />
          </path>
        </g>

        {/* etiqueta central */}
        <text x="200" y="196" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="600" letterSpacing="2" fontFamily="var(--font-display)">
          GASTO
        </text>
        <text x="200" y="216" textAnchor="middle" fill="#33C3F5" fontSize="13" fontWeight="700" letterSpacing="2" fontFamily="var(--font-display)">
          ENERGÉTICO
        </text>
      </svg>
    </div>
  );
}
