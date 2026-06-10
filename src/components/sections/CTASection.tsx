"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const BP = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

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
          <h2 className="mb-6 text-4xl font-semibold leading-[1.05] tracking-tighter text-sky-50 md:text-6xl lg:text-7xl">
            Empieza con datos,<br />
            <span className="gradient-text-animated">no con suposiciones.</span>
          </h2>

          <p className="mb-10 mx-auto max-w-[48ch] text-lg leading-relaxed text-sky-100/45">
            Agenda tu evaluación metabólica inicial y descubre exactamente qué necesita tu cuerpo para rendir y verse mejor.
          </p>

          <div className="flex flex-col gap-3 items-center sm:flex-row sm:justify-center">
            <motion.a
              href={`${BP}/agendar`}
              className="group inline-flex items-center gap-2.5 rounded-2xl px-8 py-4 text-sm font-semibold text-white"
              style={{ backgroundColor: "var(--brand)" }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 40px rgba(0,174,239,0.5), 0 0 80px rgba(0,174,239,0.2)",
                backgroundColor: "var(--brand-light)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              Agenda tu evaluación
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </motion.a>

            <motion.a
              href="https://wa.me/56991377915"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-2xl px-8 py-4 text-sm font-semibold text-white"
              style={{ backgroundColor: "#25D366" }}
              whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(37,211,102,0.5)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </motion.a>
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
