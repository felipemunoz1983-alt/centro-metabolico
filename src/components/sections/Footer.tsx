import { BrandLogo } from "@/components/ui/BrandLogo";

export function Footer() {
  return (
    <footer
      className="px-6 py-10 md:px-8"
      style={{ borderTop: "1px solid rgba(0,174,239,0.07)", backgroundColor: "var(--bg)" }}
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <BrandLogo size="sm" variant="full" />

        <nav className="flex flex-wrap gap-5 text-xs text-sky-200/30">
          {["Servicios", "Metodología", "Equipo", "Testimonios", "Contacto"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="transition-colors hover:text-sky-300"
            >
              {link}
            </a>
          ))}
        </nav>

        <p className="text-xs text-sky-200/22">
          © {new Date().getFullYear()} Centro Metabólico. Chile.
        </p>
      </div>
    </footer>
  );
}
