"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const BP = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const AGENDA_URL = "https://agendapro.com/overview/51643841-fc06-42db-bcb5-78232dc5802a";
const BRAND = "#6366F1";

function interp(p: number, ins: number[], outs: number[]): number {
  const n = ins.length;
  if (p <= ins[0]) return outs[0];
  if (p >= ins[n - 1]) return outs[n - 1];
  for (let i = 0; i < n - 1; i++) {
    if (p >= ins[i] && p <= ins[i + 1]) {
      const t = (p - ins[i]) / (ins[i + 1] - ins[i]);
      return outs[i] + t * (outs[i + 1] - outs[i]);
    }
  }
  return outs[n - 1];
}

export function StretchingClient() {
  const heroRef  = useRef<HTMLElement>(null);
  const descRef  = useRef<HTMLElement>(null);
  const bgImgRef = useRef<HTMLDivElement>(null);
  const darkRef  = useRef<HTMLDivElement>(null);
  const vigRef   = useRef<HTMLDivElement>(null);
  const p1Ref    = useRef<HTMLDivElement>(null);
  const p2Ref    = useRef<HTMLDivElement>(null);
  const p3Ref    = useRef<HTMLDivElement>(null);
  const hintRef  = useRef<HTMLDivElement>(null);
  const blk1Ref  = useRef<HTMLDivElement>(null);
  const blk2Ref  = useRef<HTMLDivElement>(null);
  const imgYRef  = useRef<HTMLDivElement>(null);
  const rafRef   = useRef(0);

  useEffect(() => {
    const tick = () => {
      const hero = heroRef.current;
      if (hero) {
        const rect = hero.getBoundingClientRect();
        const scrollable = Math.max(1, hero.offsetHeight - window.innerHeight);
        const sp = Math.max(0, Math.min(1, -rect.top / scrollable));

        if (bgImgRef.current) bgImgRef.current.style.transform = `scale(${interp(sp, [0,1], [1.0,1.45])}) translateZ(0)`;
        if (darkRef.current)  darkRef.current.style.opacity  = String(interp(sp, [0,0.15,0.55,1], [0.50,0.40,0.40,0.65]));
        if (vigRef.current)   vigRef.current.style.opacity   = String(interp(sp, [0,0.3,0.6,1], [0.40,0.15,0.25,0.85]));
        if (p1Ref.current) {
          p1Ref.current.style.opacity   = String(interp(sp, [0,0.25,0.38], [1,1,0]));
          p1Ref.current.style.transform = `translateY(${interp(sp, [0,0.38], [0,-60])}px)`;
        }
        if (p2Ref.current) {
          p2Ref.current.style.opacity   = String(interp(sp, [0.38,0.50,0.65,0.74], [0,1,1,0]));
          p2Ref.current.style.transform = `translateY(${interp(sp, [0.38,0.74], [60,-60])}px)`;
        }
        if (p3Ref.current) {
          p3Ref.current.style.opacity   = String(interp(sp, [0.74,0.85,1], [0,1,1]));
          p3Ref.current.style.transform = `translateY(${interp(sp, [0.74,0.85], [60,0])}px)`;
        }
        if (hintRef.current) hintRef.current.style.opacity = String(interp(sp, [0,0.10], [0.8,0]));
      }

      const desc = descRef.current;
      if (desc) {
        const rect = desc.getBoundingClientRect();
        const scrollable = Math.max(1, desc.offsetHeight - window.innerHeight);
        const dp = Math.max(0, Math.min(1, -rect.top / scrollable));
        if (blk1Ref.current) {
          blk1Ref.current.style.opacity   = String(interp(dp, [0,0.15,0.35,0.50], [0,1,1,0]));
          blk1Ref.current.style.transform = `translateY(${interp(dp, [0,0.15,0.50], [40,0,-30])}px)`;
        }
        if (blk2Ref.current) {
          blk2Ref.current.style.opacity   = String(interp(dp, [0.50,0.65,1], [0,1,1]));
          blk2Ref.current.style.transform = `translateY(${interp(dp, [0.50,0.65,1], [40,0,0])}px)`;
        }
        if (imgYRef.current) imgYRef.current.style.transform = `translateY(${interp(dp, [0,1], [80,-80])}px) scale(1.15)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div>
      <section ref={heroRef} style={{ height: "320vh" }} className="relative">
        <div className="sticky top-0 h-screen min-h-[100svh] overflow-hidden bg-[#0A0A0A]" style={{ transform: "translateZ(0)" }}>
          <div ref={bgImgRef} className="absolute inset-0" style={{ transformOrigin: "50% 50%", willChange: "transform" }}>
            <Image src={`${BP}/movilidad1.webp`} alt="Stretching FNP" fill priority className="object-cover" sizes="100vw" />
          </div>
          <div ref={darkRef} className="absolute inset-0 pointer-events-none bg-black" style={{ opacity: 0.50 }} />
          <div ref={vigRef}  className="absolute inset-0 pointer-events-none" style={{ opacity: 0.40, background: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 0%, rgba(0,0,0,0.95) 100%)" }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 18%, transparent 82%, rgba(0,0,0,0.8) 100%)" }} />

          <div ref={p1Ref} className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none" style={{ opacity: 1, willChange: "opacity, transform" }}>
            <span className="mb-5 rounded-full px-5 py-2 text-xs font-bold tracking-widest uppercase" style={{ backgroundColor: "rgba(99,102,241,0.2)", color: BRAND, border: "1px solid rgba(99,102,241,0.4)" }}>Stretching FNP</span>
            <h2 className="text-4xl sm:text-5xl leading-[1.0] text-white md:text-7xl lg:text-8xl" style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em", textShadow: "0 2px 20px rgba(0,0,0,0.95), 0 4px 40px rgba(0,0,0,0.9)" }}>
              Flexibilidad<br /><span style={{ color: BRAND }}>real.</span>
            </h2>
            <p className="mt-6 max-w-[44ch] text-base leading-relaxed md:text-lg" style={{ color: "rgba(255,255,255,0.65)" }}>
              Técnicas FNP para una flexibilidad duradera.<br />Reduce la tensión y mejora tu rango de movimiento.
            </p>
          </div>

          <div ref={p2Ref} className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none" style={{ opacity: 0, transform: "translateY(60px)", willChange: "opacity, transform" }}>
            <span className="mb-5 rounded-full px-5 py-2 text-xs font-bold tracking-widest uppercase" style={{ backgroundColor: "rgba(99,102,241,0.2)", color: BRAND, border: "1px solid rgba(99,102,241,0.4)" }}>Método FNP</span>
            <h2 className="text-4xl sm:text-5xl leading-[1.0] text-white md:text-7xl lg:text-8xl" style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em", textShadow: "0 2px 20px rgba(0,0,0,0.95), 0 4px 40px rgba(0,0,0,0.9)" }}>
              Recupera tu<br /><span style={{ color: BRAND }}>bienestar.</span>
            </h2>
            <p className="mt-6 max-w-[44ch] text-base leading-relaxed md:text-lg" style={{ color: "rgba(255,255,255,0.65)" }}>
              Flexibilidad · Recuperación activa · Bienestar corporal.<br />Cada sesión diseñada para liberar tu cuerpo.
            </p>
          </div>

          <div ref={p3Ref} className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center" style={{ opacity: 0, transform: "translateY(60px)", willChange: "opacity, transform" }}>
            <span className="mb-5 rounded-full px-5 py-2 text-xs font-bold tracking-widest uppercase" style={{ backgroundColor: "rgba(99,102,241,0.2)", color: BRAND, border: "1px solid rgba(99,102,241,0.4)" }}>4 sesiones / mes · $50.000</span>
            <h2 className="text-4xl sm:text-5xl leading-[1.0] text-white md:text-7xl lg:text-8xl" style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em", textShadow: "0 2px 20px rgba(0,0,0,0.95), 0 4px 40px rgba(0,0,0,0.9)" }}>
              Tu cuerpo merece<br /><span style={{ color: BRAND }}>descansar bien.</span>
            </h2>
            <p className="mt-6 mb-8 max-w-[44ch] text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              Grupos reducidos · Profesor en cada sesión · Resultados medibles desde el primer día.
            </p>
            <motion.a href={AGENDA_URL} className="inline-flex items-center gap-2 rounded-2xl px-10 py-4 text-base font-bold text-white" style={{ backgroundColor: BRAND }} whileHover={{ scale: 1.05, boxShadow: "0 0 48px rgba(99,102,241,0.6)" }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
              Agendar Stretching →
            </motion.a>
          </div>

          <div ref={hintRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none" style={{ opacity: 0.8 }}>
            <span className="text-[9px] tracking-[0.25em] uppercase text-white/50">Scroll</span>
            <div className="h-7 w-px" style={{ background: `linear-gradient(to bottom, ${BRAND}99, transparent)` }} />
          </div>
        </div>
      </section>

      <section ref={descRef} className="relative bg-[#0A0A0A]" style={{ height: "200vh" }}>
        <div className="sticky top-0 h-screen min-h-[100svh] flex items-center overflow-hidden bg-[#0A0A0A]" style={{ transform: "translateZ(0)" }}>
          <div className="relative z-10 flex h-full w-full lg:w-1/2 flex-col justify-center px-6 sm:px-10 md:px-16">
            <div ref={blk1Ref} className="absolute inset-x-6 sm:inset-x-10 md:inset-x-16" style={{ opacity: 0, willChange: "opacity, transform" }}>
              <p className="mb-4 text-lg font-bold uppercase tracking-widest" style={{ color: BRAND }}>El método</p>
              <h3 className="mb-6 text-4xl text-white md:text-5xl" style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em", lineHeight: "1.1" }}>Flexibilidad que<br />transforma.</h3>
              <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>Sesiones en grupos reducidos con técnicas FNP (Facilitación Neuromuscular Propioceptiva) para lograr una flexibilidad real y duradera. Ideal para complementar cualquier programa de entrenamiento y mejorar tu calidad de vida.</p>
            </div>
            <div ref={blk2Ref} className="absolute inset-x-6 sm:inset-x-10 md:inset-x-16" style={{ opacity: 0, willChange: "opacity, transform" }}>
              <p className="mb-4 text-lg font-bold uppercase tracking-widest" style={{ color: BRAND }}>4 sesiones / mes · $50.000</p>
              <h3 className="mb-6 text-4xl text-white md:text-5xl" style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em", lineHeight: "1.1" }}>Tu cuerpo merece<br />descansar bien.</h3>
              <ul className="mb-8 space-y-3">
                {[
                  "Técnicas FNP para flexibilidad real y duradera.",
                  "Reduce tensión muscular y mejora el rango de movimiento.",
                  "Ideal para complementar cualquier programa de entrenamiento.",
                  "Sesiones enfocadas en recuperación y bienestar corporal.",
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-base" style={{ color: "rgba(255,255,255,0.75)" }}>
                    <span className="shrink-0" style={{ color: BRAND }}>✓</span>{item}
                  </li>
                ))}
              </ul>
              <a href={AGENDA_URL} className="inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-base font-bold text-white" style={{ backgroundColor: BRAND, boxShadow: "0 0 32px rgba(99,102,241,0.35)" }}>Agendar Stretching →</a>
            </div>
          </div>
          <div className="hidden lg:block relative h-full flex-1 overflow-hidden">
            <div ref={imgYRef} className="absolute inset-0" style={{ willChange: "transform" }}>
              <Image src={`${BP}/movilidad1.webp`} alt="Stretching FNP" fill className="object-cover" sizes="50vw" />
            </div>
            <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(10,10,10,1) 0%, rgba(10,10,10,0.3) 30%, transparent 60%)" }} />
          </div>
        </div>
      </section>
    </div>
  );
}
