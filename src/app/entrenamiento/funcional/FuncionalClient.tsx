"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const BP = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const AGENDA_URL = "/agendar";
const BRAND = "#00AEEF";
const BRAND_DARK = "#0090C5";

export function FuncionalClient() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.0, 1.45]);
  const darkOverlay = useTransform(scrollYProgress, [0, 0.15, 0.55, 1], [0.55, 0.45, 0.4, 0.65]);
  const vigOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.35, 0.15, 0.25, 0.85]);

  const p1Opacity = useTransform(scrollYProgress, [0, 0.25, 0.38], [1, 1, 0]);
  const p1Y = useTransform(scrollYProgress, [0, 0.38], [0, -60]);

  const p2Opacity = useTransform(scrollYProgress, [0.38, 0.50, 0.65, 0.74], [0, 1, 1, 0]);
  const p2Y = useTransform(scrollYProgress, [0.38, 0.74], [60, -60]);

  const p3Opacity = useTransform(scrollYProgress, [0.74, 0.85, 1, 1], [0, 1, 1, 1]);
  const p3Y = useTransform(scrollYProgress, [0.74, 0.85], [60, 0]);

  const hintOpacity = useTransform(scrollYProgress, [0, 0.10], [0.8, 0]);

  const descSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: descProgress } = useScroll({
    target: descSectionRef,
    offset: ["start start", "end end"],
  });

  const imgY = useTransform(descProgress, [0, 1], [80, -80]);

  const block1Opacity = useTransform(descProgress, [0, 0.15, 0.35, 0.50], [0, 1, 1, 0]);
  const block1Y      = useTransform(descProgress, [0, 0.15, 0.50], [40, 0, -30]);

  const block2Opacity = useTransform(descProgress, [0.50, 0.65, 1, 1], [0, 1, 1, 1]);
  const block2Y      = useTransform(descProgress, [0.50, 0.65, 1], [40, 0, 0]);

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
          style={{ backgroundColor: BRAND }}
        >
          Agendar →
        </a>
      </header>

      {/* Scroll hero */}
      <section ref={sectionRef} style={{ height: "320vh" }} className="relative">
        <div className="sticky top-0 h-screen overflow-hidden bg-[#0A0A0A]">

          {/* Background image */}
          <motion.div
            className="absolute inset-0"
            style={{ scale, transformOrigin: "50% 50%", willChange: "transform" }}
          >
            <Image
              src={`${BP}/funcional.webp`}
              alt="Entrenamiento Funcional DINAFIT"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>

          <motion.div
            className="absolute inset-0 pointer-events-none bg-black"
            style={{ opacity: darkOverlay }}
          />

          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: vigOpacity,
              background: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 0%, rgba(0,0,0,0.95) 100%)",
            }}
          />

          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 18%, transparent 82%, rgba(0,0,0,0.8) 100%)" }}
          />

          {/* Phase 1 */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none"
            style={{ opacity: p1Opacity, y: p1Y }}
          >
            <span className="mb-5 rounded-full px-5 py-2 text-xs font-bold tracking-widest uppercase" style={{ backgroundColor: "rgba(0,174,239,0.2)", color: BRAND, border: "1px solid rgba(0,174,239,0.4)" }}>
              Funcional DINAFIT
            </span>
            <h2 className="text-5xl leading-[1.0] text-white md:text-7xl lg:text-8xl" style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em", textShadow: "0 2px 20px rgba(0,0,0,0.95), 0 4px 40px rgba(0,0,0,0.9)" }}>
              Despierta tu<br />
              <span style={{ color: BRAND }}>potencial.</span>
            </h2>
            <p className="mt-6 max-w-[44ch] text-base leading-relaxed md:text-lg" style={{ color: "rgba(255,255,255,0.65)" }}>
              Velocidad, coordinación y agilidad trabajadas con método.<br />Guía profesional en cada sesión para sacar lo mejor de ti.
            </p>
          </motion.div>

          {/* Phase 2 */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none"
            style={{ opacity: p2Opacity, y: p2Y }}
          >
            <span className="mb-5 rounded-full px-5 py-2 text-xs font-bold tracking-widest uppercase" style={{ backgroundColor: "rgba(0,174,239,0.2)", color: BRAND, border: "1px solid rgba(0,174,239,0.4)" }}>
              Quema grasa · Transforma tu cuerpo
            </span>
            <h2 className="text-5xl leading-[1.0] text-white md:text-7xl lg:text-8xl" style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em", textShadow: "0 2px 20px rgba(0,0,0,0.95), 0 4px 40px rgba(0,0,0,0.9)" }}>
              Clases que activan<br />
              <span style={{ color: BRAND }}>y bajan tu grasa corporal.</span>
            </h2>
            <p className="mt-6 max-w-[44ch] text-base leading-relaxed md:text-lg" style={{ color: "rgba(255,255,255,0.65)" }}>
              Entrena con energía, quema grasa corporal y disfruta cada sesión.<br />Resultados reales con clases que te van a motivar a volver.
            </p>
          </motion.div>

          {/* Phase 3 CTA */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
            style={{ opacity: p3Opacity, y: p3Y }}
          >
            <span className="mb-5 rounded-full px-5 py-2 text-xs font-bold tracking-widest uppercase" style={{ backgroundColor: "rgba(0,174,239,0.2)", color: BRAND, border: "1px solid rgba(0,174,239,0.4)" }}>
              4 clases / mes · $50.000
            </span>
            <h2 className="text-5xl leading-[1.0] text-white md:text-7xl lg:text-8xl" style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em", textShadow: "0 2px 20px rgba(0,0,0,0.95), 0 4px 40px rgba(0,0,0,0.9)" }}>
              El cambio<br />
              <span style={{ color: BRAND }}>empieza hoy.</span>
            </h2>
            <p className="mt-6 mb-8 max-w-[44ch] text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              Grupos de máximo 7 personas · Profesor en cada sesión · Progresión registrada desde el primer día.
            </p>
            <motion.a
              href={AGENDA_URL}
              className="inline-flex items-center gap-2 rounded-2xl px-10 py-4 text-base font-bold text-white"
              style={{ backgroundColor: BRAND }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 48px rgba(0,174,239,0.6)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              Agendar Funcional DINAFIT →
            </motion.a>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
            style={{ opacity: hintOpacity }}
          >
            <span className="text-[9px] tracking-[0.25em] uppercase text-white/50">Scroll</span>
            <div className="h-7 w-px" style={{ background: `linear-gradient(to bottom, ${BRAND}99, transparent)` }} />
          </motion.div>
        </div>
      </section>

      {/* Descripción — sticky scroll dos columnas */}
      <section ref={descSectionRef} className="relative bg-[#0A0A0A]" style={{ height: "200vh" }}>
        <div className="sticky top-0 h-screen flex items-center overflow-hidden bg-[#0A0A0A]">

          {/* Columna izquierda */}
          <div className="relative z-10 flex h-full w-1/2 flex-col justify-center px-10 md:px-16">

            {/* Bloque 1 */}
            <motion.div
              className="absolute inset-x-10 md:inset-x-16"
              style={{ opacity: block1Opacity, y: block1Y }}
            >
              <p className="mb-4 text-lg font-bold uppercase tracking-widest" style={{ color: BRAND }}>
                El método
              </p>
              <h3 className="mb-6 text-4xl text-white md:text-5xl" style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em", lineHeight: "1.1" }}>
                Funcional de<br />alta precisión.
              </h3>
              <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                Clases exclusivas de máximo 7 personas. Tecnología DINAFIT con luces de acción y reacción que miden tu velocidad y tiempo de respuesta en cada sesión.
              </p>
            </motion.div>

            {/* Bloque 2 — CTA */}
            <motion.div
              className="absolute inset-x-10 md:inset-x-16"
              style={{ opacity: block2Opacity, y: block2Y }}
            >
              <p className="mb-4 text-lg font-bold uppercase tracking-widest" style={{ color: BRAND }}>
                4 clases / mes · $50.000
              </p>
              <h3 className="mb-6 text-4xl text-white md:text-5xl" style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em", lineHeight: "1.1" }}>
                Tu mejor versión<br />empieza aquí.
              </h3>
              <ul className="mb-8 space-y-3">
                {[
                  "Grupos de máximo 7 personas.",
                  "Profesor en cada sesión.",
                  "Resultados medibles desde el primer día.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base" style={{ color: "rgba(255,255,255,0.75)" }}>
                    <span className="shrink-0" style={{ color: BRAND }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={AGENDA_URL}
                className="inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-base font-bold text-white"
                style={{ backgroundColor: BRAND, boxShadow: "0 0 32px rgba(0,174,239,0.35)" }}
              >
                Agendar Funcional DINAFIT →
              </a>
            </motion.div>
          </div>

          {/* Columna derecha — imagen con parallax */}
          <div className="relative h-full flex-1 overflow-hidden">
            <motion.div
              className="absolute inset-0"
              style={{ y: imgY, willChange: "transform", scale: 1.15 }}
            >
              <Image
                src={`${BP}/funcional2.webp`}
                alt="Entrenamiento Funcional DINAFIT"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </motion.div>
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(to right, rgba(10,10,10,1) 0%, rgba(10,10,10,0.3) 30%, transparent 60%)" }}
            />
          </div>

        </div>
      </section>
    </div>
  );
}
