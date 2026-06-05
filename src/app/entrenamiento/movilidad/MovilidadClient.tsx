"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const AGENDA_URL = "/agendar";
const BRAND = "#00AEEF";
const GREEN = "#10B981";

export function MovilidadClient() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.0, 1.45]);
  const darkOverlay = useTransform(scrollYProgress, [0, 0.15, 0.55, 1], [0.45, 0.35, 0.35, 0.60]);
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
          style={{ backgroundColor: GREEN }}
        >
          Agendar →
        </a>
      </header>

      {/* Scroll hero */}
      <section ref={sectionRef} style={{ height: "320vh" }} className="relative">
        <div className="sticky top-0 h-screen overflow-hidden bg-[#0A0A0A]">

          <motion.div
            className="absolute inset-0"
            style={{ scale, transformOrigin: "50% 50%", willChange: "transform" }}
          >
            <Image
              src="/movilidad2.webp"
              alt="Movilidad Articular"
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
            <span className="mb-5 rounded-full px-5 py-2 text-xs font-bold tracking-widest uppercase" style={{ backgroundColor: "rgba(16,185,129,0.2)", color: GREEN, border: "1px solid rgba(16,185,129,0.4)" }}>
              Movilidad Articular
            </span>
            <h2 className="text-5xl leading-[1.0] text-white md:text-7xl lg:text-8xl" style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em", textShadow: "0 2px 20px rgba(0,0,0,0.95), 0 4px 40px rgba(0,0,0,0.9)" }}>
              Muévete sin<br />
              <span style={{ color: GREEN }}>dolor.</span>
            </h2>
            <p className="mt-6 max-w-[44ch] text-base leading-relaxed md:text-lg" style={{ color: "rgba(255,255,255,0.65)" }}>
              Control motor, estabilidad funcional y rango de movimiento real.<br />Diseñado para quienes quieren moverse mejor.
            </p>
          </motion.div>

          {/* Phase 2 */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none"
            style={{ opacity: p2Opacity, y: p2Y }}
          >
            <span className="mb-5 rounded-full px-5 py-2 text-xs font-bold tracking-widest uppercase" style={{ backgroundColor: "rgba(16,185,129,0.2)", color: GREEN, border: "1px solid rgba(16,185,129,0.4)" }}>
              Método progresivo
            </span>
            <h2 className="text-5xl leading-[1.0] text-white md:text-7xl lg:text-8xl" style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em", textShadow: "0 2px 20px rgba(0,0,0,0.95), 0 4px 40px rgba(0,0,0,0.9)" }}>
              Recupera tu<br />
              <span style={{ color: GREEN }}>movimiento.</span>
            </h2>
            <p className="mt-6 max-w-[44ch] text-base leading-relaxed md:text-lg" style={{ color: "rgba(255,255,255,0.65)" }}>
              Movilidad articular · Control motor · Estabilidad funcional.<br />
              Cada sesión diseñada para tu cuerpo.
            </p>
          </motion.div>

          {/* Phase 3 CTA */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
            style={{ opacity: p3Opacity, y: p3Y }}
          >
            <span className="mb-5 rounded-full px-5 py-2 text-xs font-bold tracking-widest uppercase" style={{ backgroundColor: "rgba(16,185,129,0.2)", color: GREEN, border: "1px solid rgba(16,185,129,0.4)" }}>
              4 sesiones / mes · $50.000
            </span>
            <h2 className="text-5xl leading-[1.0] text-white md:text-7xl lg:text-8xl" style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em", textShadow: "0 2px 20px rgba(0,0,0,0.95), 0 4px 40px rgba(0,0,0,0.9)" }}>
              Tu cuerpo merece<br />
              <span style={{ color: GREEN }}>moverse bien.</span>
            </h2>
            <p className="mt-6 mb-8 max-w-[44ch] text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              Grupos reducidos · Profesor en cada sesión · Resultados medibles desde el primer día.
            </p>
            <motion.a
              href={AGENDA_URL}
              className="inline-flex items-center gap-2 rounded-2xl px-10 py-4 text-base font-bold text-white"
              style={{ backgroundColor: GREEN }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 48px rgba(16,185,129,0.6)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              Agendar Movilidad →
            </motion.a>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
            style={{ opacity: hintOpacity }}
          >
            <span className="text-[9px] tracking-[0.25em] uppercase text-white/50">Scroll</span>
            <div className="h-7 w-px" style={{ background: `linear-gradient(to bottom, ${GREEN}99, transparent)` }} />
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
              <p className="mb-4 text-lg font-bold uppercase tracking-widest" style={{ color: GREEN }}>
                El método
              </p>
              <h3 className="mb-6 text-4xl text-white md:text-5xl" style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em", lineHeight: "1.1" }}>
                El dolor no tiene<br />que ser tu nueva<br />normalidad.
              </h3>
              <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                Si sientes rigidez al levantarte, dolor en las rodillas o te cuesta hacer lo que antes hacías con facilidad — no es inevitable. Con el método correcto puedes recuperar tu movimiento y vivir sin miedo a lastimarte.
              </p>
            </motion.div>

            {/* Bloque 2 — CTA */}
            <motion.div
              className="absolute inset-x-10 md:inset-x-16"
              style={{ opacity: block2Opacity, y: block2Y }}
            >
              <p className="mb-4 text-lg font-bold uppercase tracking-widest" style={{ color: GREEN }}>
                4 sesiones / mes · $50.000
              </p>
              <h3 className="mb-6 text-4xl text-white md:text-5xl" style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em", lineHeight: "1.1" }}>
                Deja de evitar<br />el movimiento.<br />Empieza a controlarlo.
              </h3>
              <ul className="mb-8 space-y-3">
                {[
                  "Para personas +35 con rigidez, dolor articular o pérdida de movilidad.",
                  "Guía profesional en cada sesión para moverte con seguridad y confianza.",
                  "Más rango, menos dolor y más libertad — desde el primer mes.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base" style={{ color: "rgba(255,255,255,0.75)" }}>
                    <span className="shrink-0" style={{ color: GREEN }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={AGENDA_URL}
                className="inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-base font-bold text-white"
                style={{ backgroundColor: GREEN, boxShadow: "0 0 32px rgba(16,185,129,0.35)" }}
              >
                Agendar Movilidad →
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
                src="/movilidad3.webp"
                alt="Movilidad Articular"
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
