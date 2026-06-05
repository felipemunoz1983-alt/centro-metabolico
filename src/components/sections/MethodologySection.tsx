"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";

const steps = [
  {
    number: "01",
    title: "Mide",
    subtitle: "Diagnóstico completo",
    description:
      "Evaluación metabólica exhaustiva: VO₂ max, metabolismo basal en reposo, umbral anaeróbico y composición corporal. Datos, no suposiciones.",
    alpha: 1,
  },
  {
    number: "02",
    title: "Analiza",
    subtitle: "Interpretación experta",
    description:
      "Nuestros especialistas interpretan tu perfil metabólico único, identificando oportunidades de mejora y factores limitantes personalizados.",
    alpha: 0.85,
  },
  {
    number: "03",
    title: "Planifica",
    subtitle: "Estrategia a medida",
    description:
      "Diseñamos un plan integrado de nutrición y entrenamiento construido sobre tu biología real, con objetivos claros y medibles.",
    alpha: 0.7,
  },
  {
    number: "04",
    title: "Optimiza",
    subtitle: "Mejora continua",
    description:
      "Monitoreo periódico, ajustes basados en datos y seguimiento cercano. Tu plan evoluciona con tu progreso.",
    alpha: 0.55,
  },
];

export function MethodologySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section
      id="metodologia"
      ref={sectionRef}
      className="px-6 py-28 md:px-8 md:py-36"
      style={{ backgroundColor: "var(--surface)" }}
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <AnimatedSection className="mb-20 grid gap-8 md:grid-cols-2 md:items-end">
          <div>
            <EyebrowBadge>El método CM</EyebrowBadge>
            <h2 className="mt-5 text-4xl font-semibold tracking-tighter text-sky-50 md:text-5xl">
              Ciencia aplicada en{" "}
              <span className="gradient-text">4 pasos.</span>
            </h2>
          </div>
          <p className="text-base leading-relaxed text-sky-100/40 md:text-lg">
            Nuestro proceso no comienza con suposiciones. Empieza con mediciones precisas y termina con resultados verificables.
          </p>
        </AnimatedSection>

        {/* Steps */}
        <div className="relative">
          {/* Animated vertical line */}
          <div
            className="absolute left-[27px] top-0 bottom-0 w-px hidden md:block"
            style={{ backgroundColor: "rgba(0,174,239,0.08)" }}
          >
            <motion.div
              className="absolute top-0 left-0 w-full"
              style={{
                height: lineHeight,
                background: "linear-gradient(to bottom, var(--brand), rgba(0,174,239,0.1))",
              }}
            />
          </div>

          <div className="flex flex-col gap-8">
            {steps.map((step, i) => (
              <AnimatedItem key={step.number} index={i}>
                <div className="group flex gap-6 md:gap-10">
                  {/* Step indicator */}
                  <div className="relative flex-shrink-0 flex items-start">
                    <div
                      className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl text-sm font-mono font-semibold transition-all duration-300 group-hover:scale-105"
                      style={{
                        border: `1px solid rgba(0,174,239,${step.alpha * 0.25})`,
                        backgroundColor: `rgba(0,174,239,${step.alpha * 0.08})`,
                        color: `rgba(0,174,239,${step.alpha})`,
                      }}
                    >
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className="card-surface flex-1 p-7 transition-all duration-300"
                    style={{ borderColor: `rgba(0,174,239,${step.alpha * 0.1})` }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = `rgba(0,174,239,${step.alpha * 0.3})`)}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = `rgba(0,174,239,${step.alpha * 0.1})`)}
                  >
                    <div className="mb-2 flex items-center gap-3">
                      <h3
                        className="text-2xl font-semibold tracking-tight"
                        style={{ color: `rgba(0,174,239,${step.alpha})` }}
                      >
                        {step.title}
                      </h3>
                      <span className="text-sm text-sky-200/35">{step.subtitle}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-sky-100/45 max-w-[60ch]">
                      {step.description}
                    </p>
                  </div>
                </div>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
