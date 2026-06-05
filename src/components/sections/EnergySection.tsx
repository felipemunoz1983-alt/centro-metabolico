"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import Image from "next/image";

export function EnergySection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Image zoom toward the bright center
  const scale = useTransform(scrollYProgress, [0, 1], [1.0, 1.65]);

  // Brightness: dim → bright at center → dim again
  const brightness = useTransform(
    scrollYProgress,
    [0, 0.45, 0.55, 1],
    [0.7, 1.4, 1.4, 0.85]
  );
  const filterValue = useMotionTemplate`brightness(${brightness})`;

  // Vignette that opens up at the middle and closes again
  const vigOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    [0.75, 0.25, 0.0, 0.25, 0.85]
  );

  // ── Phase 1 ──────────────────────────────────────────────────────
  const p1Opacity = useTransform(
    scrollYProgress,
    [0.04, 0.18, 0.34, 0.46],
    [0, 1, 1, 0]
  );
  const p1Y = useTransform(scrollYProgress, [0.04, 0.46], [40, -40]);

  // ── Phase 2 ──────────────────────────────────────────────────────
  const p2Opacity = useTransform(
    scrollYProgress,
    [0.50, 0.62, 0.73, 0.83],
    [0, 1, 1, 0]
  );
  const p2Y = useTransform(scrollYProgress, [0.50, 0.83], [40, -40]);

  // ── Phase 3 ──────────────────────────────────────────────────────
  const p3Opacity = useTransform(
    scrollYProgress,
    [0.86, 0.93, 1, 1],
    [0, 1, 1, 1]
  );
  const p3Y = useTransform(scrollYProgress, [0.86, 1], [30, 0]);

  // Scroll hint
  const hintOpacity = useTransform(scrollYProgress, [0, 0.1], [0.5, 0]);

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

        {/* Real image on top — when energy.jpg is placed in /public */}
        <motion.div
          className="absolute inset-0"
          style={{ scale, transformOrigin: "center center" }}
        >
          <motion.div className="absolute inset-0" style={{ filter: filterValue }}>
            <Image
              src="/energy.png"
              alt="Ondas de energía metabólica"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          </motion.div>
        </motion.div>

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
              Agenda tu<br />
              EVALUACIÓN HOY.
            </h2>

            <motion.a
              href="https://centrometabolico.site.agendapro.com/cl"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-sm font-semibold text-white"
              style={{ backgroundColor: "var(--brand)" }}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 0 48px rgba(0,174,239,0.6)",
                backgroundColor: "var(--brand-light)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              Agenda tu evaluación gratuita →
            </motion.a>
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
