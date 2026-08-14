import { BrandLogo } from "@/components/ui/BrandLogo";

const ADDRESS = "Suárez Mujica 950, Ñuñoa · Región Metropolitana";
const MAPS_URL = "https://maps.google.com/?q=Su%C3%A1rez%20Mujica%20950%2C%20%C3%91u%C3%B1oa%2C%20Santiago";
const WHATSAPP = "https://wa.me/56991377915";
const INSTAGRAM = "https://www.instagram.com/centrometabolicpro/";

const navLinks = ["Servicios", "Metodología", "Equipo", "Testimonios", "Contacto"];

export function Footer() {
  return (
    <footer
      className="px-6 py-12 md:px-8"
      style={{ borderTop: "1px solid rgba(0,174,239,0.12)", backgroundColor: "var(--bg)" }}
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          {/* Marca + contacto */}
          <div className="flex flex-col gap-4">
            <BrandLogo size="sm" variant="full" />
            <div className="flex flex-col gap-2.5 text-sm">
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-sky-200/70 transition-colors hover:text-sky-100">
                <svg className="h-4 w-4 flex-shrink-0" style={{ color: "var(--brand)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-6-5.686-6-10a6 6 0 1112 0c0 4.314-6 10-6 10z" />
                  <circle cx="12" cy="11" r="2.2" />
                </svg>
                {ADDRESS}
              </a>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-sky-200/70 transition-colors hover:text-sky-100">
                <svg className="h-4 w-4 flex-shrink-0" style={{ color: "var(--brand)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2.5l1.5 4.5-2 1.2a12 12 0 005.8 5.8l1.2-2 4.5 1.5V19a2 2 0 01-2 2A16 16 0 013 5z" />
                </svg>
                +56 9 9137 7915 · WhatsApp
              </a>
              <span className="inline-flex items-center gap-2.5 text-sky-200/55">
                <svg className="h-4 w-4 flex-shrink-0" style={{ color: "var(--brand)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <circle cx="12" cy="12" r="9" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5V12l3 2" />
                </svg>
                Lun a Dom · 08:00 – 21:00
              </span>
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-sky-200/70 transition-colors hover:text-sky-100">
                <svg className="h-4 w-4 flex-shrink-0" style={{ color: "var(--brand)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                  <circle cx="12" cy="12" r="3.6" />
                  <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
                </svg>
                @centrometabolicpro
              </a>
            </div>
          </div>

          {/* Navegación */}
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-sky-200/60 md:justify-end md:self-start">
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="transition-colors hover:text-sky-300">
                {link}
              </a>
            ))}
          </nav>
        </div>

        <p className="mt-8 text-xs text-sky-200/45">
          © {new Date().getFullYear()} Centro Metabólico · Ñuñoa, Santiago de Chile.
        </p>
      </div>
    </footer>
  );
}
