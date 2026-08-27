"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/ui/BrandLogo";

const evaluacionesItems = [
  { label: "Evaluación Metabólica", href: "/calorimetria-indirecta" },
  { label: "InBody", href: "https://felipemunoz1983-alt.github.io/centro-metabolico/inbody/" },
  { label: "VO2max", href: "/evaluaciones/vo2max" },
];

const medicinaItems: { label: string; href: string; children?: typeof evaluacionesItems }[] = [
  { label: "Consulta Médica", href: "/asesoria#medica" },
  { label: "Consulta Nutricional", href: "/asesoria#nutricional" },
  { label: "Evaluaciones", href: "/evaluaciones", children: evaluacionesItems },
  { label: "Recovery", href: "/recovery/presoterapia" },
];

const navLinks = [
  { label: "Reto 21 días", href: "/reto-21-dias" },
  { label: "Entrenamiento", href: "/entrenamiento" },
  { label: "Taller Nutricional", href: "https://felipemunoz1983-alt.github.io/tallernutricional/", external: true },
];

const PROGRAMA_HREF = "/programa-metabolico";
const PORTAL_URL = "https://centro-metabolico-agendamiento.vercel.app/portal";

export function Navbar() {
  const pathname = usePathname();
  const isHome   = pathname === "/" || pathname === "";
  const isVo2maxLanding =
    pathname === "/evaluaciones/vo2max" || pathname === "/evaluaciones/vo2max/";
  const useScrollFade = isHome || isVo2maxLanding;

  const [menuOpen, setMenuOpen]                   = useState(false);
  const [medicinaOpen, setMedicinaOpen]           = useState(false);
  const [evaluacionesOpen, setEvaluacionesOpen]   = useState(false);
  const [medicinaMobileOpen, setMedicinaMobileOpen]       = useState(false);
  const [evaluacionesMobileOpen, setEvaluacionesMobileOpen] = useState(false);
  const [scrolledPast, setScrolledPast] = useState(false);
  const bgRef     = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);

  // On VO2max landing the navbar fades from transparent to WHITE; everywhere
  // else it stays the original dark navy. `lightMode` flips link/icon colors
  // to dark once the fill is mostly opaque.
  const lightMode = isVo2maxLanding && scrolledPast;

  useEffect(() => {
    if (!useScrollFade) {
      if (bgRef.current)     bgRef.current.style.transform = "scaleX(1)";
      if (borderRef.current) borderRef.current.style.transform = "scaleX(1)";
      return;
    }
    const FILL_PX = isVo2maxLanding ? 360 : 260;
    const onScroll = () => {
      const p = Math.min(1, window.scrollY / FILL_PX);
      if (bgRef.current)     bgRef.current.style.transform     = `scaleX(${p})`;
      if (borderRef.current) borderRef.current.style.transform = `scaleX(${p})`;
      setScrolledPast(p >= 0.5);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [useScrollFade, isVo2maxLanding]);

  const linkClass = `rounded-xl px-4 py-2 text-sm transition-all ${
    lightMode
      ? "text-[#0A1628]/75 hover:text-[#0A1628]"
      : "text-sky-100/70 hover:text-sky-100"
  }`;
  const linkStyle = (label: string) => ({
    ...(label === "Reto 21 días" ? { fontFamily: "var(--font-reto)", fontSize: "1.05rem", letterSpacing: "0.06em" } : {}),
  });

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Background — fills left → right on scroll */}
        <div
          ref={bgRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundColor: isVo2maxLanding ? "rgba(255,255,255,0.97)" : "rgba(3,8,15,0.96)",
            backdropFilter: "blur(20px)",
            transformOrigin: "left center",
            transform: "scaleX(0)",
            willChange: "transform",
          }}
        />
        {/* Border bottom — fills left → right in sync */}
        <div
          ref={borderRef}
          className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
          style={{
            backgroundColor: isVo2maxLanding ? "rgba(10,22,40,0.08)" : "rgba(0,174,239,0.18)",
            transformOrigin: "left center",
            transform: "scaleX(0)",
            willChange: "transform",
          }}
        />

        <div className="relative mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-8">
          {/* Logo */}
          <Link href="/" className="transition-opacity hover:opacity-80">
            <BrandLogo size="sm" variant="full" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Medicina dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setMedicinaOpen(true)}
              onMouseLeave={() => { setMedicinaOpen(false); setEvaluacionesOpen(false); }}
            >
              <button
                className={linkClass + " flex items-center gap-1.5"}
                style={{ backgroundColor: medicinaOpen ? "rgba(0,174,239,0.08)" : "transparent" }}
              >
                Medicina
                <svg
                  className="w-3 h-3 transition-transform"
                  style={{
                    transform: medicinaOpen ? "rotate(180deg)" : "rotate(0deg)",
                    color: lightMode ? "rgba(10,22,40,0.55)" : "rgba(125,217,249,0.6)",
                  }}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {medicinaOpen && (
                  <motion.div
                    className="absolute top-full left-0 mt-1 min-w-[210px] rounded-2xl py-1"
                    style={{
                      backgroundColor: "rgba(6,14,26,0.97)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(0,174,239,0.18)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                    }}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                  >
                    {medicinaItems.map((item) =>
                      item.children ? (
                        /* Evaluaciones row with flyout */
                        <div
                          key={item.href}
                          className="relative"
                          onMouseEnter={() => setEvaluacionesOpen(true)}
                          onMouseLeave={() => setEvaluacionesOpen(false)}
                        >
                          <div
                            className="flex items-center justify-between px-5 py-3 text-sm text-sky-100/70 hover:text-sky-100 cursor-default transition-colors"
                            style={{}}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,174,239,0.1)")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                          >
                            {item.label}
                            <svg className="w-3 h-3 ml-3 flex-shrink-0" style={{ color: "rgba(125,217,249,0.5)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </div>

                          <AnimatePresence>
                            {evaluacionesOpen && (
                              <motion.div
                                className="absolute top-0 left-full ml-1 min-w-[210px] rounded-2xl py-1"
                                style={{
                                  backgroundColor: "rgba(6,14,26,0.97)",
                                  backdropFilter: "blur(20px)",
                                  border: "1px solid rgba(0,174,239,0.18)",
                                  boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                                }}
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -6 }}
                                transition={{ duration: 0.12 }}
                              >
                                {item.children.map((sub) => (
                                  <Link
                                    key={sub.href}
                                    href={sub.href}
                                    className="block px-5 py-3 text-sm text-sky-100/70 hover:text-sky-100 transition-colors"
                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,174,239,0.1)")}
                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                                    onClick={() => { setMedicinaOpen(false); setEvaluacionesOpen(false); }}
                                  >
                                    {sub.label}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-5 py-3 text-sm text-sky-100/70 hover:text-sky-100 transition-colors"
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,174,239,0.1)")}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                          onClick={() => setMedicinaOpen(false)}
                        >
                          {item.label}
                        </Link>
                      )
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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
            <a
              href={PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass + " font-medium"}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,174,239,0.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              Portal clientes
            </a>
            <a
              href={"https://centro-metabolico-agendamiento.vercel.app/reservar"}
              target="_blank"
              rel="noopener noreferrer"
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
            className="lg:hidden flex items-center justify-center rounded-xl px-3 py-2 text-xs font-medium border transition-all"
            style={{
              borderColor: lightMode ? "rgba(10,22,40,0.18)" : "rgba(0,174,239,0.2)",
              backgroundColor: lightMode ? "rgba(10,22,40,0.04)" : "rgba(0,174,239,0.08)",
              color: lightMode ? "#0A1628" : "#7DD9F9",
              minWidth: 56,
            }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <span className="text-base leading-none" style={{ color: "var(--brand)" }}>✕</span>
            ) : (
              "Menú"
            )}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 overflow-y-auto py-20"
            style={{ backgroundColor: "rgba(3,8,15,0.97)", backdropFilter: "blur(20px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Medicina accordion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
              className="flex flex-col items-center gap-2 w-full px-8"
            >
              <button
                className="flex items-center gap-2 text-2xl font-semibold text-sky-50"
                onClick={() => setMedicinaMobileOpen(!medicinaMobileOpen)}
              >
                Medicina
                <svg
                  className="w-5 h-5 transition-transform"
                  style={{ transform: medicinaMobileOpen ? "rotate(180deg)" : "rotate(0deg)", color: "var(--brand)" }}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {medicinaMobileOpen && (
                  <motion.div
                    className="flex flex-col items-center gap-1 w-full"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {medicinaItems.map((item) =>
                      item.children ? (
                        <div key={item.href} className="flex flex-col items-center gap-1 w-full">
                          <button
                            className="flex items-center gap-2 text-lg text-sky-300/80 hover:text-sky-100 transition-colors"
                            onClick={() => setEvaluacionesMobileOpen(!evaluacionesMobileOpen)}
                          >
                            {item.label}
                            <svg
                              className="w-4 h-4 transition-transform"
                              style={{ transform: evaluacionesMobileOpen ? "rotate(180deg)" : "rotate(0deg)", color: "var(--brand)" }}
                              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          <AnimatePresence>
                            {evaluacionesMobileOpen && (
                              <motion.div
                                className="flex flex-col items-center gap-1"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.18 }}
                              >
                                {item.children.map((sub) => (
                                  <Link
                                    key={sub.href}
                                    href={sub.href}
                                    className="text-base text-sky-200/60 hover:text-sky-100 transition-colors py-1"
                                    onClick={() => setMenuOpen(false)}
                                  >
                                    {sub.label}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="text-lg text-sky-300/80 hover:text-sky-100 transition-colors py-1"
                          onClick={() => setMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      )
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

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
                  transition={{ delay: (i + 1) * 0.06 }}
                >
                  {link.label}
                </motion.a>
              ) : (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (i + 1) * 0.06 }}
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

            {/* Portal clientes */}
            <motion.a
              href={PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl font-semibold text-sky-50 transition-colors"
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--brand)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "")}
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (navLinks.length + 1) * 0.06 }}
            >
              Portal clientes
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
