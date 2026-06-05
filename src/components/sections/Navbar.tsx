"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrandLogo } from "@/components/ui/BrandLogo";

const navLinks = [
  { label: "Consulta Médica y Nutricional", href: "/asesoria" },
  { label: "Reto 21 días", href: "#metodologia" },
  { label: "Entrenamiento", href: "/entrenamiento" },
  { label: "Taller Nutricional", href: "https://felipemunoz1983-alt.github.io/tallernutricional/", external: true },
  { label: "Programa Metabólico", href: "#testimonios" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b"
            : "bg-transparent"
        }`}
        style={scrolled ? { backgroundColor: "rgba(3,8,15,0.85)", backdropFilter: "blur(20px)", borderColor: "rgba(0,174,239,0.1)" } : {}}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-8">
          {/* Logo */}
          <a href="#" className="transition-opacity hover:opacity-80">
            <BrandLogo size="sm" variant="full" />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                {...("external" in link && link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="rounded-xl px-4 py-2 text-sm text-sky-100/50 hover:text-sky-100 transition-all"
                style={{
                  ["--hover-bg" as string]: "rgba(0,174,239,0.08)",
                  ...(link.label === "Reto 21 días" ? { fontFamily: "var(--font-reto)", fontSize: "1.05rem", letterSpacing: "0.06em" } : {}),
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,174,239,0.08)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/agendar"
              className="rounded-xl px-5 py-2 text-sm font-semibold text-white transition-all"
              style={{ backgroundColor: "var(--brand)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--brand-light)";
                e.currentTarget.style.boxShadow = "0 0 20px rgba(0,174,239,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--brand)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Agendar consulta
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex items-center gap-1.5 rounded-xl px-3 py-2 text-sky-300 text-xs font-medium border"
            style={{ borderColor: "rgba(0,174,239,0.2)", backgroundColor: "rgba(0,174,239,0.08)" }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            Menú
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6"
            style={{ backgroundColor: "rgba(3,8,15,0.97)", backdropFilter: "blur(20px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="absolute top-6 right-6 text-sm"
              style={{ color: "var(--brand)" }}
              onClick={() => setMenuOpen(false)}
            >
              ✕ Cerrar
            </button>
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                {...("external" in link && link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-2xl font-semibold text-sky-50 transition-colors"
                style={{ ["--hover" as string]: "var(--brand)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--brand)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="/agendar"
              className="mt-4 rounded-2xl px-8 py-3.5 font-semibold text-white"
              style={{ backgroundColor: "var(--brand)" }}
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Agendar consulta
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
