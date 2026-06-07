"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";

const navLinks = [
  { label: "Consulta Médica y Nutricional", href: "/asesoria" },
  { label: "Reto 21 días", href: "/#metodologia" },
  { label: "Entrenamiento", href: "/entrenamiento" },
  { label: "Recovery", href: "/recovery" },
  { label: "Taller Nutricional", href: "https://felipemunoz1983-alt.github.io/tallernutricional/", external: true },
];

const PROGRAMA_HREF = "/programa-metabolico";

const BG   = "rgba(3,8,15,0.96)";
const BORDER = "rgba(0,174,239,0.12)";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = "rounded-xl px-4 py-2 text-sm text-sky-100/60 hover:text-sky-100 transition-all";
  const linkStyle = (label: string) => ({
    ...(label === "Reto 21 días" ? { fontFamily: "var(--font-reto)", fontSize: "1.05rem", letterSpacing: "0.06em" } : {}),
  });

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{ backgroundColor: BG, backdropFilter: "blur(20px)", borderColor: BORDER }}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-8">
          {/* Logo */}
          <Link href="/" className="transition-opacity hover:opacity-80">
            <BrandLogo size="sm" variant="full" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              "external" in link && link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                  style={linkStyle(link.label)}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,174,239,0.08)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={linkClass}
                  style={linkStyle(link.label)}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,174,239,0.08)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href={PROGRAMA_HREF}
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
              Programa Metabólico
            </Link>
            <Link
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
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden flex items-center gap-1.5 rounded-xl px-3 py-2 text-sky-300 text-xs font-medium border"
            style={{ borderColor: "rgba(0,174,239,0.2)", backgroundColor: "rgba(0,174,239,0.08)" }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            Menú
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6"
            style={{ backgroundColor: "rgba(3,8,15,0.97)", backdropFilter: "blur(20px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              className="absolute top-6 right-6 text-sm"
              style={{ color: "var(--brand)" }}
              onClick={() => setMenuOpen(false)}
            >
              ✕ Cerrar
            </button>
            {navLinks.map((link, i) =>
              "external" in link && link.external ? (
                <motion.a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl font-semibold text-sky-50 transition-colors"
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--brand)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  {link.label}
                </motion.a>
              ) : (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    className="text-2xl font-semibold text-sky-50 transition-colors"
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--brand)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
