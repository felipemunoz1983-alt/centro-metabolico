"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  phase: number;
  speed: number;
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
      const x = c * spacingX + (r % 2 === 0 ? 0 : spacingX / 2);
      const y = r * spacingY;
      positions.push({ x, y });
    }
  }
  return positions.slice(0, count);
}

function drawConnections(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  progress: number
) {
  const maxDist = 70 + progress * 80;
  const maxConn = 3 + Math.floor(progress * 4);
  for (let i = 0; i < particles.length; i++) {
    let connections = 0;
    for (let j = i + 1; j < particles.length; j++) {
      if (connections >= maxConn) break;
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDist) {
        const alpha = (1 - dist / maxDist) * progress * 0.3;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0,174,239,${alpha})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
        connections++;
      }
    }
  }
}

function drawFrame(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  progress: number,
  time: number,
  w: number,
  h: number
) {
  ctx.clearRect(0, 0, w, h);

  // Radial ambient glow — brand blue
  const radial = ctx.createRadialGradient(w / 2, h * 0.5, 0, w / 2, h * 0.5, w * 0.65);
  radial.addColorStop(0, `rgba(0,174,239,${0.04 + progress * 0.05})`);
  radial.addColorStop(1, "rgba(0,174,239,0)");
  ctx.fillStyle = radial;
  ctx.fillRect(0, 0, w, h);

  drawConnections(ctx, particles, progress);

  for (const p of particles) {
    const pulse = Math.sin(time * 0.0008 * p.speed + p.phase) * 0.3 + 0.7;
    const alpha = p.opacity * pulse;

    // Glow
    const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 5);
    g.addColorStop(0, `rgba(0,174,239,${alpha * 0.5})`);
    g.addColorStop(1, "rgba(0,174,239,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius * 5, 0, Math.PI * 2);
    ctx.fill();

    // Core
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius * 0.45, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(125,217,249,${alpha})`;
    ctx.fill();
  }
}

function updateParticles(particles: Particle[], progress: number, w: number, h: number) {
  for (const p of particles) {
    if (progress < 0.08) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
    } else {
      const lerp = 0.012 + progress * 0.028;
      p.x += (p.targetX - p.x) * lerp;
      p.y += (p.targetY - p.y) * lerp;
    }
  }
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const tickingRef = useRef(false);
  const rafRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.scale(dpr, dpr);
      const grid = buildHexGrid(w, h, PARTICLE_COUNT);
      particlesRef.current = grid.map((pos) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        targetX: pos.x,
        targetY: pos.y,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: 1.5 + Math.random() * 2.5,
        opacity: 0.25 + Math.random() * 0.55,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 0.8,
      }));
    };

    const draw = (time: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      updateParticles(particlesRef.current, progressRef.current, w, h);
      drawFrame(ctx, particlesRef.current, progressRef.current, time, w, h);
      rafRef.current = requestAnimationFrame(draw);
    };

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const scrollable = section.offsetHeight - window.innerHeight;
        progressRef.current = Math.max(0, Math.min(1, -rect.top / scrollable));
        tickingRef.current = false;
      });
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} style={{ height: "400vh" }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden" style={{ backgroundColor: "var(--bg)" }}>
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Eyebrow */}
            <div
              className="mb-7 inline-flex items-center gap-2 rounded-full px-4 py-1.5 backdrop-blur-sm"
              style={{ border: "1px solid rgba(0,174,239,0.25)", backgroundColor: "rgba(0,174,239,0.08)" }}
            >
              <span className="h-1.5 w-1.5 rounded-full animate-pulse-dot" style={{ backgroundColor: "var(--brand)" }} />
              <span className="text-[11px] font-medium tracking-widest uppercase" style={{ color: "var(--brand-light)" }}>
                Centro Metabólico — Chile
              </span>
            </div>

            {/* Headline */}
            <h1 className="mb-6 max-w-[15ch] text-5xl font-semibold leading-[1.04] tracking-tighter text-sky-50 md:text-6xl lg:text-7xl xl:text-8xl">
              Tu metabolismo.{" "}
              <span className="gradient-text-animated">Optimizado.</span>
            </h1>

            {/* Subheadline */}
            <p className="mb-10 max-w-[52ch] text-lg leading-relaxed text-sky-100/50 md:text-xl">
              Evaluaciones metabólicas de precisión, nutrición basada en datos y entrenamiento
              personalizado para transformar tu rendimiento desde adentro.
            </p>

            {/* CTAs */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#contacto"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-semibold text-white transition-all"
                style={{ backgroundColor: "var(--brand)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--brand-light)";
                  e.currentTarget.style.boxShadow = "0 0 32px rgba(0,174,239,0.45)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--brand)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Agenda tu evaluación
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
              <a
                href="#servicios"
                className="inline-flex items-center justify-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-semibold text-sky-300 backdrop-blur-sm transition-all"
                style={{ border: "1px solid rgba(0,174,239,0.22)", backgroundColor: "rgba(0,174,239,0.07)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0,174,239,0.45)";
                  e.currentTarget.style.backgroundColor = "rgba(0,174,239,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0,174,239,0.22)";
                  e.currentTarget.style.backgroundColor = "rgba(0,174,239,0.07)";
                }}
              >
                Ver servicios
              </a>
            </div>

            {/* Metrics */}
            <motion.div
              className="mt-14 flex items-center gap-10 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.9 }}
            >
              {[
                { value: "+500", label: "Pacientes" },
                { value: "15+", label: "Años exp." },
                { value: "95%", label: "Satisfacción" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center">
                  <span className="text-2xl font-semibold md:text-3xl" style={{ color: "var(--brand-light)" }}>
                    {stat.value}
                  </span>
                  <span className="text-xs text-sky-200/30 tracking-wide">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 flex flex-col items-center gap-2"
            style={{ opacity: 0.4 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1.8, duration: 1 }}
          >
            <span className="text-[9px] tracking-[0.2em] uppercase" style={{ color: "var(--brand)" }}>Scroll</span>
            <div className="h-7 w-px" style={{ background: "linear-gradient(to bottom, var(--brand), transparent)" }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
