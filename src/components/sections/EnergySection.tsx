"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";

const BP = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

interface Particle {
  x: number; y: number; targetX: number; targetY: number;
  vx: number; vy: number; radius: number; opacity: number;
  phase: number; speed: number;
}

const PARTICLE_COUNT_DESKTOP = 90;
const PARTICLE_COUNT_MOBILE  = 30;

function buildHexGrid(width: number, height: number, count: number) {
  const cols = Math.round(Math.sqrt(count * (width / height)) * 1.1);
  const rows = Math.ceil(count / cols) + 1;
  const spacingX = width / (cols - 0.5);
  const spacingY = height / (rows - 0.5);
  const positions: { x: number; y: number }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      positions.push({ x: c * spacingX + (r % 2 === 0 ? 0 : spacingX / 2), y: r * spacingY });
    }
  }
  return positions.slice(0, count);
}

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

export function EnergySection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const rafRef      = useRef(0);
  const spRef       = useRef(0);
  const particlesRef = useRef<Particle[]>([]);

  // DOM refs for direct style manipulation
  const bgImgRef = useRef<HTMLDivElement>(null);
  const darkRef  = useRef<HTMLDivElement>(null);
  const vigRef   = useRef<HTMLDivElement>(null);
  const p1Ref    = useRef<HTMLDivElement>(null);
  const p2Ref    = useRef<HTMLDivElement>(null);
  const p3Ref    = useRef<HTMLDivElement>(null);
  const hintRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas  = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      canvas.width  = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.scale(dpr, dpr);
      const count = w < 768 ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;
      const grid = buildHexGrid(w, h, count);
      particlesRef.current = grid.map((pos) => ({
        x: Math.random() * w, y: Math.random() * h,
        targetX: pos.x, targetY: pos.y,
        vx: (Math.random() - 0.5) * 0.6, vy: (Math.random() - 0.5) * 0.6,
        radius: 1.5 + Math.random() * 2.5,
        opacity: 0.25 + Math.random() * 0.55,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 0.8,
      }));
    };

    const drawFrame = (time: number, progress: number) => {
      const w = window.innerWidth, h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      const radial = ctx.createRadialGradient(w/2, h*0.5, 0, w/2, h*0.5, w*0.65);
      radial.addColorStop(0, `rgba(0,174,239,${0.04 + progress * 0.05})`);
      radial.addColorStop(1, "rgba(0,174,239,0)");
      ctx.fillStyle = radial; ctx.fillRect(0, 0, w, h);

      const maxDist = 70 + progress * 80;
      const maxConn = 3 + Math.floor(progress * 4);
      const pts = particlesRef.current;
      for (let i = 0; i < pts.length; i++) {
        let conn = 0;
        for (let j = i + 1; j < pts.length; j++) {
          if (conn >= maxConn) break;
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < maxDist) {
            const alpha = (1 - dist/maxDist) * progress * 0.3;
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(0,174,239,${alpha})`; ctx.lineWidth = 0.6; ctx.stroke();
            conn++;
          }
        }
      }
      for (const p of pts) {
        if (progress >= 0.08) {
          const lerp = 0.012 + progress * 0.028;
          p.x += (p.targetX - p.x) * lerp; p.y += (p.targetY - p.y) * lerp;
        } else {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        }
        const pulse = Math.sin(time * 0.0008 * p.speed + p.phase) * 0.3 + 0.7;
        const alpha = p.opacity * pulse;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 5);
        g.addColorStop(0, `rgba(0,174,239,${alpha * 0.5})`);
        g.addColorStop(1, "rgba(0,174,239,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.radius*5, 0, Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.arc(p.x, p.y, p.radius*0.45, 0, Math.PI*2);
        ctx.fillStyle = `rgba(125,217,249,${alpha})`; ctx.fill();
      }
    };

    const animate = (time: number) => {
      // Read scroll position every frame
      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(1, section.offsetHeight - window.innerHeight);
      const sp = Math.max(0, Math.min(1, -rect.top / scrollable));
      spRef.current = sp;

      drawFrame(time, sp);

      // Update JSX elements directly
      if (bgImgRef.current) bgImgRef.current.style.transform = `scale(${interp(sp, [0,1], [1.0,1.55])})`;
      if (darkRef.current)  darkRef.current.style.opacity   = String(interp(sp, [0,0.45,0.55,1], [0.35,0.05,0.05,0.45]));
      if (vigRef.current)   vigRef.current.style.opacity    = String(interp(sp, [0,0.3,0.5,0.7,1], [0.65,0.2,0.0,0.2,0.8]));

      if (p1Ref.current) {
        const op = interp(sp, [0,0.28,0.40], [1,1,0]);
        p1Ref.current.style.opacity   = String(op);
        p1Ref.current.style.transform = `translateY(${interp(sp, [0,0.40], [0,-50])}px)`;
      }
      if (p2Ref.current) {
        const op = interp(sp, [0.40,0.52,0.68,0.78], [0,1,1,0]);
        p2Ref.current.style.opacity   = String(op);
        p2Ref.current.style.transform = `translateY(${interp(sp, [0.40,0.78], [50,-50])}px)`;
      }
      if (p3Ref.current) {
        const op = interp(sp, [0.78,0.88,1], [0,1,1]);
        p3Ref.current.style.opacity   = String(op);
        p3Ref.current.style.transform = `translateY(${interp(sp, [0.78,0.88], [50,0])}px)`;
      }
      if (hintRef.current) hintRef.current.style.opacity = String(interp(sp, [0,0.10], [0.6,0]));

      rafRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section ref={sectionRef} style={{ height: "300vh" }} className="relative">
      <div className="sticky top-0 h-screen min-h-[100svh] overflow-hidden bg-[#03080F]" style={{ transform: "translateZ(0)" }}>

        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse 25% 45% at 50% 52%, rgba(0,220,255,0.22) 0%, transparent 60%),
            radial-gradient(ellipse 55% 35% at 25% 62%, rgba(0,120,220,0.16) 0%, transparent 65%),
            radial-gradient(ellipse 55% 35% at 75% 42%, rgba(0,174,239,0.16) 0%, transparent 65%),
            radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,40,100,0.7) 0%, rgba(3,8,15,1) 80%)
          `,
        }} />

        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

        <div ref={bgImgRef} className="absolute inset-0" style={{ transformOrigin: "center center", willChange: "transform" }}>
          <Image src={`${BP}/energy.webp`} alt="Ondas de energía metabólica" fill priority className="object-cover object-center" sizes="100vw" />
        </div>

        <div ref={darkRef} className="absolute inset-0 pointer-events-none bg-black" style={{ opacity: 0.35 }} />
        <div ref={vigRef}  className="absolute inset-0 pointer-events-none" style={{ opacity: 0.65, background: "radial-gradient(ellipse 65% 65% at 50% 50%, transparent 0%, rgba(3,8,15,0.97) 100%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(3,8,15,0.5) 0%, transparent 15%, transparent 85%, rgba(3,8,15,0.7) 100%)" }} />

        <div ref={p1Ref} className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none" style={{ opacity: 1, willChange: "opacity, transform" }}>
          <div className="flex flex-col items-center rounded-3xl px-6 py-7 md:px-10 md:py-8 backdrop-blur-md" style={{ backgroundColor: "rgba(3,8,15,0.92)" }}>
            <h1 className="mb-5 text-3xl leading-[1.05] text-white sm:text-4xl md:text-6xl lg:text-7xl"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em", textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}>
              Tu metabolismo<br />TIENE EL PODER.
            </h1>
            <p className="max-w-[48ch] text-base leading-relaxed md:text-lg" style={{ color: "rgba(220,240,255,0.85)" }}>
              Todo lo que necesitas para transformar tu cuerpo está dentro de ti.<br />Nosotros ponemos la ciencia.
            </p>
          </div>
        </div>

        <div ref={p2Ref} className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none" style={{ opacity: 0, transform: "translateY(50px)", willChange: "opacity, transform" }}>
          <div className="flex flex-col items-center rounded-3xl px-6 py-7 md:px-10 md:py-8 backdrop-blur-md" style={{ backgroundColor: "rgba(3,8,15,0.92)" }}>
            <h2 className="mb-5 text-3xl leading-[1.05] text-white sm:text-4xl md:text-6xl lg:text-7xl"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em", textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}>
              Medimos lo que<br />OTROS ADIVINAN.
            </h2>
            <p className="max-w-[48ch] text-base leading-relaxed md:text-lg" style={{ color: "rgba(220,240,255,0.85)" }}>
              VO₂ max · Metabolismo basal · Umbral anaeróbico<br />Datos reales para decisiones reales.
            </p>
          </div>
        </div>

        <div ref={p3Ref} className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center" style={{ opacity: 0, transform: "translateY(50px)", willChange: "opacity, transform" }}>
          <div className="flex flex-col items-center rounded-3xl px-6 py-7 md:px-10 md:py-8 backdrop-blur-md" style={{ backgroundColor: "rgba(3,8,15,0.92)" }}>
            <h2 className="mb-5 text-3xl leading-[1.05] text-white sm:text-4xl md:text-6xl lg:text-7xl"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em", textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}>
              SALUD, ENTRENAMIENTO,<br />NUTRICIÓN Y MEDICINA.
            </h2>
          </div>
        </div>

        <div ref={hintRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none" style={{ opacity: 0.6 }}>
          <span className="text-[9px] tracking-[0.25em] uppercase" style={{ color: "var(--brand)" }}>Scroll</span>
          <div className="h-7 w-px" style={{ background: "linear-gradient(to bottom, var(--brand), transparent)" }} />
        </div>
      </div>
    </section>
  );
}
