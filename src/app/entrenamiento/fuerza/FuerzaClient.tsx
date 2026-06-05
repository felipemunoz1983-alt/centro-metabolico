"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const AGENDA_URL = "/agendar";
const BRAND = "#00AEEF";
const ORANGE = "#F97316";

export function FuerzaClient() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.0, 1.6]);
  const brightness = useTransform(scrollYProgress, [0, 0.4, 0.55, 1], [0.6, 1.2, 1.1, 0.5]);
  const filterValue = useMotionTemplate`brightness(${brightness})`;
  const vigOpacity = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0.8, 0.3, 0.1, 0.4, 0.9]);

  const p1Opacity = useTransform(scrollYProgress, [0.03, 0.15, 0.3, 0.42], [0, 1, 1, 0]);
  const p1Y = useTransform(scrollYProgress, [0.03, 0.42], [50, -50]);

  const p2Opacity = useTransform(scrollYProgress, [0.45, 0.57, 0.68, 0.78], [0, 1, 1, 0]);
  const p2Y = useTransform(scrollYProgress, [0.45, 0.78], [50, -50]);

  const p3Opacity = useTransform(scrollYProgress, [0.82, 0.90, 1, 1], [0, 1, 1, 1]);
  const p3Y = useTransform(scrollYProgress, [0.82, 1], [40, 0]);

  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [0.7, 0]);

  return (
    <div>
      {/* Navbar */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-10"
        style={{ backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(16px)" }}
      >
        <Link href="/entrenamiento" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm">
          ← Programas
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-base font-bold" style={{ color: BRAND, fontFamily: "var(--font-display)" }}>C</span>
          <div className="h-4 w-px" style={{ backgroundColor: BRAND, opacity: 0.4 }} />
          <span className="text-base font-bold" style={{ color: BRAND, fontFamily: "var(--font-display)" }}>M</span>
        </div>
        <a
          href={AGENDA_URL}
          className="rounded-xl px-4 py-2 text-xs font-bold text-white"
          style={{ backgroundColor: ORANGE }}
        >
          Agendar →
        </a>
      </header>

      {/* Scroll hero */}
      <section ref={sectionRef} style={{ height: "320vh" }} className="relative">
        <div className="sticky top-0 h-screen overflow-hidden bg-[#0A0A0A]">

          {/* Background image */}
          <motion.div className="absolute inset-0" style={{ scale, transformOrigin: "60% 62%" }}>
            <motion.div className="absolute inset-0" style={{ filter: filterValue }}>
              <Image
                src="/fuerza.webp"
                alt="Entrenamiento de Fuerza IRONFIT"
                fill
                priority
                className="object-cover"
                style={{ objectPosition: "60% 62%" }}
                sizes="100vw"
              />
            </motion.div>
          </motion.div>

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
            style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 18%, transparent 82%, rgba(0,0,0,0.8) 100%)" }}
          />

          {/* Phase 1 */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none"
            style={{ opacity: p1Opacity, y: p1Y }}
          >
            <span className="mb-5 rounded-full px-4 py-1.5 text-[11px] font-bold tracking-widest uppercase" style={{ backgroundColor: "rgba(249,115,22,0.2)", color: ORANGE, border: "1px solid rgba(249,115,22,0.4)" }}>
              Fuerza IRONFIT
            </span>
            <h2 className="text-5xl leading-[1.0] text-white md:text-7xl lg:text-8xl" style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em", textShadow: "0 4px 32px rgba(0,0,0,0.8)" }}>
              Entrena como<br />
              <span style={{ color: ORANGE }}>un atleta.</span>
            </h2>
            <p className="mt-6 max-w-[44ch] text-base leading-relaxed md:text-lg" style={{ color: "rgba(255,255,255,0.65)" }}>
              La misma tecnología que usan los deportistas de alto rendimiento,<br />ahora en grupos de máximo 7 personas.
            </p>
          </motion.div>

          {/* Phase 2 */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none"
            style={{ opacity: p2Opacity, y: p2Y }}
          >
            <span className="mb-5 rounded-full px-4 py-1.5 text-[11px] font-bold tracking-widest uppercase" style={{ backgroundColor: "rgba(249,115,22,0.2)", color: ORANGE, border: "1px solid rgba(249,115,22,0.4)" }}>
              Tecnología de precisión
            </span>
            <h2 className="text-5xl leading-[1.0] text-white md:text-7xl lg:text-8xl" style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em", textShadow: "0 4px 32px rgba(0,0,0,0.8)" }}>
              Medimos cada<br />
              <span style={{ color: ORANGE }}>repetición.</span>
            </h2>
            <p className="mt-6 max-w-[44ch] text-base leading-relaxed md:text-lg" style={{ color: "rgba(255,255,255,0.65)" }}>
              Encoder deportivo en tiempo real · Tu 1RM · Tu fatiga · Tu intensidad exacta.<br />
              Cada serie optimizada para ti.
            </p>
          </motion.div>

          {/* Phase 3 CTA */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
            style={{ opacity: p3Opacity, y: p3Y }}
          >
            <span className="mb-5 rounded-full px-4 py-1.5 text-[11px] font-bold tracking-widest uppercase" style={{ backgroundColor: "rgba(249,115,22,0.2)", color: ORANGE, border: "1px solid rgba(249,115,22,0.4)" }}>
              4 clases / mes · $50.000
            </span>
            <h2 className="text-5xl leading-[1.0] text-white md:text-7xl lg:text-8xl" style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em", textShadow: "0 4px 32px rgba(0,0,0,0.8)" }}>
              Tu fuerza está<br />
              <span style={{ color: ORANGE }}>más cerca.</span>
            </h2>
            <p className="mt-6 mb-8 max-w-[44ch] text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              Grupos de máximo 7 personas · Profesor en cada sesión · Resultados medibles desde el primer día.
            </p>
            <motion.a
              href={AGENDA_URL}
              className="inline-flex items-center gap-2 rounded-2xl px-10 py-4 text-base font-bold text-white"
              style={{ backgroundColor: ORANGE }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 48px rgba(249,115,22,0.6)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              Agendar Fuerza IRONFIT →
            </motion.a>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
            style={{ opacity: hintOpacity }}
          >
            <span className="text-[9px] tracking-[0.25em] uppercase text-white/50">Scroll</span>
            <div className="h-7 w-px" style={{ background: "linear-gradient(to bottom, rgba(249,115,22,0.6), transparent)" }} />
          </motion.div>
        </div>
      </section>

      {/* Descripción */}
      <section className="bg-[#0A0A0A] px-6 py-20 md:px-10">
        <div className="mx-auto max-w-[720px]">
          <h3 className="mb-8 text-3xl text-white md:text-4xl" style={{ fontFamily: "var(--font-display)", letterSpacing: "0.03em" }}>
            Entrenamiento de Fuerza en Grupo Reducido 🔥💪
          </h3>
          <p className="mb-6 text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
            ¿Quieres entrenar fuerza de verdad, con la misma tecnología que usan los atletas de alto rendimiento?
            En nuestras clases exclusivas de máximo 7 personas, entrenarás acompañado de un profesor que te guiará
            en cada movimiento para que alcances tus objetivos de manera segura y efectiva.
          </p>
          <div className="mb-8 rounded-2xl p-6" style={{ backgroundColor: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)" }}>
            <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
              Lo que nos diferencia es que <strong className="text-white">medimos tu rendimiento en tiempo real</strong>.
              Gracias a un encoder deportivo, sabrás exactamente cuál es tu nivel de fuerza (1RM), tu fatiga y la
              intensidad de cada ejercicio al instante. Así, cada serie y cada repetición están optimizadas para ti.
            </p>
          </div>
          <p className="mb-5 text-xs font-bold uppercase tracking-widest" style={{ color: ORANGE }}>
            ¿Por qué elegirnos?
          </p>
          <ul className="mb-10 space-y-3">
            {[
              "Atención personalizada en grupos pequeños.",
              "Tecnología de punta para medir tu progreso.",
              "Entrenamientos dinámicos, seguros y adaptados a tu nivel.",
              "Resultados reales: más fuerza, más músculo, menos grasa.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-base" style={{ color: "rgba(255,255,255,0.75)" }}>
                <span className="mt-0.5 shrink-0" style={{ color: ORANGE }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mb-10 rounded-2xl p-6" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <p className="text-base leading-relaxed italic" style={{ color: "rgba(255,255,255,0.55)" }}>
              Aquí no vienes solo a entrenar: vienes a superarte, a romper tus límites y a ver resultados reales.
              <br />
              <strong className="not-italic text-white">Tu fuerza está más cerca de lo que imaginas.</strong>
            </p>
          </div>
          <a
            href={AGENDA_URL}
            className="inline-flex items-center gap-2 rounded-2xl px-10 py-4 text-base font-bold text-white"
            style={{ backgroundColor: ORANGE }}
          >
            Agendar Fuerza IRONFIT →
          </a>
        </div>
      </section>
    </div>
  );
}
