"use client";

import { useState, useEffect } from "react";

/**
 * Botón flotante "Agendar" que aparece tras pasar el primer viewport.
 * Da acceso a la reserva en cualquier punto del scroll (las páginas de
 * programa son muy largas y el CTA de precio queda al fondo).
 */
export function StickyAgendar({ href, color }: { href: string; color: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={href}
      aria-label="Agendar"
      className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-white transition-all duration-300"
      style={{
        backgroundColor: color,
        boxShadow: `0 10px 34px ${color}66`,
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(20px)",
        pointerEvents: show ? "auto" : "none",
      }}
    >
      Agendar →
    </a>
  );
}
