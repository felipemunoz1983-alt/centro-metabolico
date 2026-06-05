"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

interface StatProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description: string;
}

function CountUp({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const startTime = performance.now();

    function frame(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(ease * value));
      if (progress < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

const stats: StatProps[] = [
  {
    value: 500,
    prefix: "+",
    label: "Pacientes transformados",
    description: "Personas que han optimizado su metabolismo con nuestro método",
  },
  {
    value: 15,
    suffix: "+",
    label: "Años de experiencia",
    description: "Respaldados por más de una década de investigación aplicada",
  },
  {
    value: 95,
    suffix: "%",
    label: "Satisfacción",
    description: "De nuestros pacientes alcanzan sus objetivos en el tiempo estimado",
  },
  {
    value: 4,
    label: "Especialidades",
    description: "Nutrición, entrenamiento, medicina deportiva y psicología del rendimiento",
  },
];

export function StatsSection() {
  return (
    <section className="px-6 py-24 md:px-8 md:py-32" style={{ backgroundColor: "var(--bg)" }}>
      <div className="mx-auto max-w-[1400px]">
        <AnimatedSection>
          <div className="mb-20 h-px w-full" style={{ background: "linear-gradient(to right, transparent, rgba(0,174,239,0.18), transparent)" }} />
        </AnimatedSection>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
          {stats.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 0.1}>
              <div className="flex flex-col gap-2">
                <span
                  className="text-4xl font-semibold tracking-tighter md:text-5xl lg:text-6xl"
                  style={{ color: "var(--brand-light)" }}
                >
                  <CountUp value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                </span>
                <span className="text-sm font-semibold text-sky-50">{stat.label}</span>
                <span className="text-xs leading-relaxed text-sky-100/35">{stat.description}</span>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <div className="mt-20 h-px w-full" style={{ background: "linear-gradient(to right, transparent, rgba(0,174,239,0.18), transparent)" }} />
        </AnimatedSection>
      </div>
    </section>
  );
}
