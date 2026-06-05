"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function CTASection() {
  return (
    <section id="contacto" className="px-6 py-28 md:px-8 md:py-36 relative overflow-hidden" style={{ backgroundColor: "var(--bg)" }}>
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,174,239,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Animated rings */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="h-[500px] w-[500px] rounded-full"
          style={{ border: "1px solid rgba(0,174,239,0.07)" }}
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-[60px] rounded-full"
          style={{ border: "1px solid rgba(0,174,239,0.1)" }}
          animate={{ scale: [1.05, 1, 1.05], opacity: [0.6, 0.3, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-[120px] rounded-full"
          style={{ border: "1px solid rgba(0,174,239,0.07)" }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.2, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="relative mx-auto max-w-[900px] text-center">
        <AnimatedSection>
          {/* Eyebrow */}
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
            style={{ border: "1px solid rgba(0,174,239,0.25)", backgroundColor: "rgba(0,174,239,0.08)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full animate-pulse-dot" style={{ backgroundColor: "var(--brand)" }} />
            <span className="text-[11px] font-medium tracking-widest uppercase" style={{ color: "var(--brand-light)" }}>
              Primera consulta gratuita
            </span>
          </div>

          <h2 className="mb-6 text-4xl font-semibold leading-[1.05] tracking-tighter text-sky-50 md:text-6xl lg:text-7xl">
            Empieza con datos,<br />
            <span className="gradient-text-animated">no con suposiciones.</span>
          </h2>

          <p className="mb-10 mx-auto max-w-[48ch] text-lg leading-relaxed text-sky-100/45">
            Agenda tu evaluación metabólica inicial y descubre exactamente qué necesita tu cuerpo para rendir y verse mejor.
          </p>

          <div className="flex flex-col gap-3 items-center sm:flex-row sm:justify-center">
            <motion.a
              href="/agendar"
              className="group inline-flex items-center gap-2.5 rounded-2xl px-8 py-4 text-sm font-semibold text-white"
              style={{ backgroundColor: "var(--brand)" }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 40px rgba(0,174,239,0.5), 0 0 80px rgba(0,174,239,0.2)",
                backgroundColor: "var(--brand-light)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              Agenda tu evaluación gratuita
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </motion.a>

            <a
              href="tel:+56912345678"
              className="inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-sm font-semibold text-sky-300 backdrop-blur-sm transition-all"
              style={{ border: "1px solid rgba(0,174,239,0.18)", backgroundColor: "rgba(0,174,239,0.06)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,174,239,0.38)";
                e.currentTarget.style.backgroundColor = "rgba(0,174,239,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,174,239,0.18)";
                e.currentTarget.style.backgroundColor = "rgba(0,174,239,0.06)";
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Llámanos
            </a>
          </div>

          {/* Trust signals */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-sky-200/28">
            {["Sin compromiso de permanencia", "Atención personalizada", "Equipo certificado"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" style={{ color: "rgba(0,174,239,0.45)" }}>
                  <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {item}
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
