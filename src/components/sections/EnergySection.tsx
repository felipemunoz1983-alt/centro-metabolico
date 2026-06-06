"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";

const BP = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

interface Particle {
  x: number; y: number; targetX: number; targetY: number;
  vx: number; vy: number; radius: number; opacity: number;
  phase: number; speed: number;
}

const PARTICLE_COUNT = 90;

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

export function EnergySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const rafRef     = useRef(0);
  const tickingRef = useRef(false);
  const particlesRef = useRef<Particle[]>([]);

  // Single source of truth: native scroll progress → MotionValue
  const scrollMV = useMotionValue(0);

  const scale       = useTransform(scrollMV, [0, 1],                     [1.0, 1.55]);
  const darkOverlay = useTransform(scrollMV, [0, 0.45, 0.55, 1],         [0.35, 0.05, 0.05, 0.45]);
  const vigOpacity  = useTransform(scrollMV, [0, 0.3, 0.5, 0.7, 1],      [0.65, 0.2, 0.0, 0.2, 0.8]);

  const p1Opacity   = useTransform(scrollMV, [0, 0.28, 0.40],             [1, 1, 0]);
  const p1Y         = useTransform(scrollMV, [0, 0.40],                   [0, -50]);
  const p2Opacity   = useTransform(scrollMV, [0.40, 0.52, 0.68, 0.78],   [0, 1, 1, 0]);
  const p2Y         = useTransform(scrollMV, [0.40, 0.78],                [50, -50]);
  const p3Opacity   = useTransform(scrollMV, [0.78, 0.88, 1, 1],         [0, 1, 1, 1]);
  const p3Y         = useTransform(scrollMV, [0.78, 0.88],                [50, 0]);
  const hintOpacity = useTransform(scrollMV, [0, 0.10],                   [0.6, 0]);

  useEffect(() => {
    const canvas  = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      canvas.width  = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.scale(dpr, dpr);
      const grid = buildHexGrid(w, h, PARTICLE_COUNT);
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

    let animTime = 0;
    const animate = (time: number) => {
      animTime = time;
      drawFrame(time, scrollMV.get());
      rafRef.current = requestAnimationFrame(animate);
    };

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const scrollable = section.offsetHeight - window.innerHeight;
        const p = Math.max(0, Math.min(1, -rect.top / scrollable));
        scrollMV.set(p);   // drives both canvas and all motion transforms
        tickingRef.current = false;
      });
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={sectionRef} style={{ height: "300vh" }} className="relative">
      <div className="sticky top-0 h-screen min-h-[100svh] overflow-hidden bg-[#03080F]" style={{ transform: "translateZ(0)" }}>

        {/* CSS gradient base */}
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse 25% 45% at 50% 52%, rgba(0,220,255,0.22) 0%, transparent 60%),
            radial-gradient(ellipse 55% 35% at 25% 62%, rgba(0,120,220,0.16) 0%, transparent 65%),
            radial-gradient(ellipse 55% 35% at 75% 42%, rgba(0,174,239,0.16) 0%, transparent 65%),
            radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,40,100,0.7) 0%, rgba(3,8,15,1) 80%)
          `,
        }} />

        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

        {/* Background image with scale parallax */}
        <motion.div className="absolute inset-0" style={{ scale, transformOrigin: "center center", willChange: "transform" }}>
          <Image src={`${BP}/energy.png`} alt="Ondas de energía metabólica" fill priority className="object-cover object-center" sizes="100vw" />
        </motion.div>

        <motion.div className="absolute inset-0 pointer-events-none bg-black" style={{ opacity: darkOverlay }} />
        <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: vigOpacity, background: "radial-gradient(ellipse 65% 65% at 50% 50%, transparent 0%, rgba(3,8,15,0.97) 100%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(3,8,15,0.5) 0%, transparent 15%, transparent 85%, rgba(3,8,15,0.7) 100%)" }} />

        {/* Phase 1 */}
        <motion.div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none" style={{ opacity: p1Opacity, y: p1Y }}>
          <div className="flex flex-col items-center rounded-3xl px-6 py-7 md:px-10 md:py-8 backdrop-blur-md" style={{ backgroundColor: "rgba(3,8,15,0.92)" }}>
            <h2 className="mb-5 text-3xl leading-[1.05] text-white sm:text-4xl md:text-6xl lg:text-7xl"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em", textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}>
              Tu metabolismo<br />TIENE EL PODER.
            </h2>
            <p className="max-w-[48ch] text-base leading-relaxed md:text-lg" style={{ color: "rgba(220,240,255,0.85)" }}>
              Todo lo que necesitas para transformar tu cuerpo está dentro de ti.<br />Nosotros ponemos la ciencia.
            </p>
          </div>
        </motion.div>

        {/* Phase 2 */}
        <motion.div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none" style={{ opacity: p2Opacity, y: p2Y }}>
          <div className="flex flex-col items-center rounded-3xl px-6 py-7 md:px-10 md:py-8 backdrop-blur-md" style={{ backgroundColor: "rgba(3,8,15,0.92)" }}>
            <h2 className="mb-5 text-3xl leading-[1.05] text-white sm:text-4xl md:text-6xl lg:text-7xl"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em", textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}>
              Medimos lo que<br />OTROS ADIVINAN.
            </h2>
            <p className="max-w-[48ch] text-base leading-relaxed md:text-lg" style={{ color: "rgba(220,240,255,0.85)" }}>
              VO₂ max · Metabolismo basal · Umbral anaeróbico<br />Datos reales para decisiones reales.
            </p>
          </div>
        </motion.div>

        {/* Phase 3 */}
        <motion.div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center" style={{ opacity: p3Opacity, y: p3Y }}>
          <div className="flex flex-col items-center rounded-3xl px-6 py-7 md:px-10 md:py-8 backdrop-blur-md" style={{ backgroundColor: "rgba(3,8,15,0.92)" }}>
            <h2 className="mb-5 text-3xl leading-[1.05] text-white sm:text-4xl md:text-6xl lg:text-7xl"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em", textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}>
              SALUD, ENTRENAMIENTO,<br />NUTRICIÓN Y MEDICINA.
            </h2>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none" style={{ opacity: hintOpacity }}>
          <span className="text-[9px] tracking-[0.25em] uppercase" style={{ color: "var(--brand)" }}>Scroll</span>
          <div className="h-7 w-px" style={{ background: "linear-gradient(to bottom, var(--brand), transparent)" }} />
        </motion.div>
      </div>
    </section>
  );
}
