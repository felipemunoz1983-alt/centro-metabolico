"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export function EnergySection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.0, 1.55]);

  // Overlay oscuro en lugar de filter: brightness (GPU-composited)
  const darkOverlay = useTransform(
    scrollYProgress,
    [0, 0.45, 0.55, 1],
    [0.35, 0.05, 0.05, 0.45]
  );

  const vigOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    [0.65, 0.2, 0.0, 0.2, 0.8]
  );

  // Fase 1 visible desde el inicio
  const p1Opacity = useTransform(scrollYProgress, [0, 0.28, 0.40], [1, 1, 0]);
  const p1Y = useTransform(scrollYProgress, [0, 0.40], [0, -50]);

  const p2Opacity = useTransform(scrollYProgress, [0.40, 0.52, 0.68, 0.78], [0, 1, 1, 0]);
  const p2Y = useTransform(scrollYProgress, [0.40, 0.78], [50, -50]);

  const p3Opacity = useTransform(scrollYProgress, [0.78, 0.88, 1, 1], [0, 1, 1, 1]);
  const p3Y = useTransform(scrollYProgress, [0.78, 0.88], [50, 0]);

  const hintOpacity = useTransform(scrollYProgress, [0, 0.10], [0.6, 0]);

  return (
    <section ref={sectionRef} style={{ height: "300vh" }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#03080F]">

        {/* ── Background: CSS gradient fallback + real image ─────── */}
        {/* CSS energy gradient — always visible as base */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 25% 45% at 50% 52%, rgba(0,220,255,0.22) 0%, transparent 60%),
              radial-gradient(ellipse 55% 35% at 25% 62%, rgba(0,120,220,0.16) 0%, transparent 65%),
              radial-gradient(ellipse 55% 35% at 75% 42%, rgba(0,174,239,0.16) 0%, transparent 65%),
              radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,40,100,0.7) 0%, rgba(3,8,15,1) 80%)
            `,
          }}
        />

        <motion.div
          className="absolute inset-0"
          style={{ scale, transformOrigin: "center center", willChange: "transform" }}
        >
          <Image
            src="/energy.png"
            alt="Ondas de energía metabólica"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </motion.div>

        {/* Overlay de brillo (opacity en GPU, no filter) */}
        <motion.div
          className="absolute inset-0 pointer-events-none bg-black"
          style={{ opacity: darkOverlay }}
        />

        {/* Vignette */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: vigOpacity,
            background:
              "radial-gradient(ellipse 65% 65% at 50% 50%, transparent 0%, rgba(3,8,15,0.97) 100%)",
          }}
        />

        {/* Bottom + top edge fade */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(3,8,15,0.5) 0%, transparent 15%, transparent 85%, rgba(3,8,15,0.7) 100%)",
          }}
        />

        {/* ── Phase 1 ──────────────────────────────────────────────── */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none"
          style={{ opacity: p1Opacity, y: p1Y }}
        >
          <div
            className="flex flex-col items-center rounded-3xl px-10 py-8 backdrop-blur-md"
            style={{ backgroundColor: "rgba(3,8,15,0.55)" }}
          >
            <h2
              className="mb-5 text-4xl leading-[1.05] text-white md:text-6xl lg:text-7xl"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em", textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}
            >
              Tu metabolismo<br />
              TIENE EL PODER.
            </h2>

            <p
              className="max-w-[48ch] text-base leading-relaxed md:text-lg"
              style={{ color: "rgba(220,240,255,0.85)" }}
            >
              Todo lo que necesitas para transformar tu cuerpo está dentro de ti.<br />
              Nosotros ponemos la ciencia.
            </p>
          </div>
        </motion.div>

        {/* ── Phase 2 ──────────────────────────────────────────────── */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none"
          style={{ opacity: p2Opacity, y: p2Y }}
        >
          <div
            className="flex flex-col items-center rounded-3xl px-10 py-8 backdrop-blur-md"
            style={{ backgroundColor: "rgba(3,8,15,0.55)" }}
          >
            <h2
              className="mb-5 text-4xl leading-[1.05] text-white md:text-6xl lg:text-7xl"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em", textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}
            >
              Medimos lo que<br />
              OTROS ADIVINAN.
            </h2>

            <p
              className="max-w-[48ch] text-base leading-relaxed md:text-lg"
              style={{ color: "rgba(220,240,255,0.85)" }}
            >
              VO₂ max · Metabolismo basal · Umbral anaeróbico<br />
              Datos reales para decisiones reales.
            </p>
          </div>
        </motion.div>

        {/* ── Phase 3: CTA ─────────────────────────────────────────── */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          style={{ opacity: p3Opacity, y: p3Y }}
        >
          <div
            className="flex flex-col items-center rounded-3xl px-10 py-8 backdrop-blur-md"
            style={{ backgroundColor: "rgba(3,8,15,0.55)" }}
          >
            <h2
              className="mb-5 text-4xl leading-[1.05] text-white md:text-6xl lg:text-7xl"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em", textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}
            >
              SALUD, ENTRENAMIENTO,<br />
              NUTRICIÓN Y MEDICINA.
            </h2>

          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          style={{ opacity: hintOpacity }}
        >
          <span className="text-[9px] tracking-[0.25em] uppercase" style={{ color: "var(--brand)" }}>
            Scroll
          </span>
          <div
            className="h-7 w-px"
            style={{ background: "linear-gradient(to bottom, var(--brand), transparent)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
