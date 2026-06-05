"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";

/* ─── Data ──────────────────────────────────────────────────────────── */

const team = [
  {
    id: "valeska",
    name: "Valeska Muñoz",
    role: "Nutricionista Clínica y Deportiva",
    registro: "Reg. 12.845",
    photo: "/valeska.jpg",
    photoSide: "right" as const,
    bio: "Especialista en evaluación metabólica avanzada y nutrición de precisión. Combina ciencia y práctica clínica para diseñar intervenciones que transforman la salud desde la biología de cada paciente.",
    statValue: "8+",
    statLabel: "años de\nexperiencia",
    badge: "Colegio de Nutricionistas",
    badgeSub: "Certificada y colegiada",
    credentials: [
      {
        label: "Formación",
        value: "Nutricionista Dietista — Universidad Mayor",
        icon: "degree",
      },
      {
        label: "Especialización",
        value: "Diplomado en Nutrición Deportiva y Rendimiento",
        icon: "shield",
      },
      {
        label: "Área clínica",
        value: "Nutrición Metabólica, Composición Corporal y Obesología",
        icon: "flask",
      },
      {
        label: "Rendimiento",
        value: "Protocolos de periodización nutricional para atletas amateur y élite",
        icon: "bolt",
      },
      {
        label: "Experiencia",
        value: "+8 años acompañando procesos de transformación metabólica",
        icon: "clock",
      },
    ],
    tags: ["Nutrición Clínica", "Nutrición Deportiva", "Composición Corporal", "Control de Peso", "Metabolismo Basal"],
    cta: "Agendar consulta con Valeska",
  },
  {
    id: "felipe",
    name: "Felipe Muñoz Zambrano",
    role: "Nutricionista Deportivo",
    registro: "Reg. U. Mayor 2011",
    photo: "/felipe.png",
    photoSide: "left" as const,
    bio: "Nutricionista deportivo titulado de la Universidad Mayor con más de 15 años de experiencia clínica. Especialista en estrategias nutricionales para el rendimiento atlético, pérdida de grasa y optimización metabólica. Docente universitario y profesional asociado a Clínica Alemana.",
    statValue: "15+",
    statLabel: "años de\nexperiencia",
    badge: "Clínica Alemana",
    badgeSub: "La Dehesa",
    credentials: [
      {
        label: "Formación",
        value: "Nutricionista — Universidad Mayor (titulado enero 2011)",
        icon: "degree",
      },
      {
        label: "Centro de práctica",
        value: "Clínica Alemana de Santiago — sede La Dehesa",
        icon: "shield",
      },
      {
        label: "Docencia",
        value: "Docente en Salud Deportiva (Sdeportiva) — nutrición aplicada al deporte",
        icon: "flask",
      },
      {
        label: "Especialidad",
        value: "Estrategias nutricionales para pérdida de grasa, hipertrofia y rendimiento deportivo",
        icon: "bolt",
      },
      {
        label: "Experiencia",
        value: "+15 años atendiendo atletas amateur, deportistas de élite y pacientes metabólicos",
        icon: "clock",
      },
    ],
    tags: ["Nutrición Deportiva", "Pérdida de Grasa", "Rendimiento Atlético", "Hipertrofia", "Metabolismo", "Telemedicina"],
    cta: "Agendar consulta con Felipe",
  },
  {
    id: "barbara",
    name: "Dra. Bárbara Plass Villanueva",
    role: "Médico Cirujano · Nutrición Clínica",
    registro: "UDD Distinción Máxima · EUNACOM",
    photo: "/barbara.png",
    photoSide: "right" as const,
    bio: "Médico Cirujano egresada con distinción máxima de la Universidad del Desarrollo, cursando Magíster en Nutrición Humana en INTA - U. de Chile. Combina la medicina clínica con nutrición deportiva y metabolismo, atendiendo desde el hospital hasta la consulta privada metabólica. Trilingüe: español, francés e inglés.",
    statValue: "Dist.",
    statLabel: "Máxima\nUDD 2024",
    badge: "Hospital Padre Hurtado",
    badgeSub: "Coord. Policlínico Nutrición",
    credentials: [
      {
        label: "Formación",
        value: "Médico Cirujano con Distinción Máxima — Universidad del Desarrollo (2024). EUNACOM aprobado.",
        icon: "degree",
      },
      {
        label: "Posgrado en curso",
        value: "Magíster en Nutrición Humana — INTA, Universidad de Chile. Combinando medicina y ciencia nutricional.",
        icon: "shield",
      },
      {
        label: "Experiencia clínica",
        value: "Coordinadora Policlínico Nutrición Clínica, Hospital Padre Hurtado — especialización en Obesidad, Cirugía Bariátrica y Soporte Nutricional Intensivo.",
        icon: "flask",
      },
      {
        label: "Nutrición Deportiva",
        value: "Diplomado en Nutrición Deportiva con Distinción Máxima (HIU, 2024) + Advanced Personal Training + Internado Medicina Deportiva, Clínica Alemana.",
        icon: "bolt",
      },
      {
        label: "Consulta metabólica",
        value: "Atención privada en Centro Metabolic Pro, Las Condes. Enfoque en metabolismo, composición corporal y hábitos de vida saludable.",
        icon: "clock",
      },
    ],
    tags: ["Medicina Metabólica", "Nutrición Clínica", "Nutrición Deportiva", "Obesidad", "Cirugía Bariátrica", "Personal Training"],
    cta: "Agendar consulta con Bárbara",
  },
];

/* ─── Icon helper ───────────────────────────────────────────────────── */

function Icon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    degree: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
        <path d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    shield: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    flask: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
        <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    bolt: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    clock: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    check: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  };
  return <>{icons[name] ?? icons.check}</>;
}

/* ─── Curriculum column ─────────────────────────────────────────────── */

function CurriculumColumn({ member }: { member: typeof team[0] }) {
  return (
    <AnimatedSection className="flex flex-col gap-7">
      {/* Eyebrow */}
      <div
        className="inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5"
        style={{ border: "1px solid rgba(0,174,239,0.3)", backgroundColor: "rgba(0,174,239,0.06)" }}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--brand)" }} />
        <span className="text-[11px] font-medium tracking-widest uppercase" style={{ color: "var(--brand)" }}>
          Nuestro equipo
        </span>
      </div>

      {/* Name */}
      <div>
        <h2 className="text-4xl font-semibold tracking-tighter text-gray-900 md:text-5xl">
          {member.name}
        </h2>
        <p className="mt-2 text-lg font-medium" style={{ color: "var(--brand)" }}>
          {member.role}
        </p>
        <p className="mt-4 text-base leading-relaxed text-gray-500 max-w-[50ch]">
          {member.bio}
        </p>
      </div>

      {/* Credentials */}
      <div className="flex flex-col gap-3">
        {member.credentials.map((item, i) => (
          <AnimatedItem key={item.label} index={i}>
            <div className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-gray-50/70 p-4 transition-all hover:border-blue-100 hover:bg-blue-50/40">
              <div
                className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl"
                style={{ backgroundColor: "rgba(0,174,239,0.1)", color: "var(--brand)" }}
              >
                <Icon name={item.icon} />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
                  {item.label}
                </p>
                <p className="mt-0.5 text-sm text-gray-700 leading-relaxed">{item.value}</p>
              </div>
            </div>
          </AnimatedItem>
        ))}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {member.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border px-3 py-1 text-xs font-medium text-gray-500 border-gray-200 bg-white hover:border-blue-200 hover:text-blue-600 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA */}
      <motion.a
        href="#contacto"
        className="inline-flex w-fit items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-white"
        style={{ backgroundColor: "var(--brand)" }}
        whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(0,174,239,0.35)" }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {member.cta}
        <span>→</span>
      </motion.a>
    </AnimatedSection>
  );
}

/* ─── Photo column ──────────────────────────────────────────────────── */

function PhotoColumn({ member }: { member: typeof team[0] }) {
  return (
    <AnimatedSection delay={0.15} className="relative flex justify-center lg:justify-center">
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Background glow */}
        <div
          className="absolute -inset-4 rounded-[32px] opacity-40"
          style={{ background: "radial-gradient(ellipse at center, rgba(0,174,239,0.12) 0%, transparent 70%)" }}
        />

        {/* Clinical frame */}
        <div
          className="relative overflow-hidden rounded-[28px] border-2 border-white shadow-[0_20px_60px_rgba(0,0,0,0.12),0_4px_16px_rgba(0,174,239,0.1)]"
          style={{ width: 400, maxWidth: "100%" }}
        >
          <div className="relative aspect-[3/4] w-full bg-gray-100">
            <Image
              src={member.photo}
              alt={`${member.name} — ${member.role}`}
              fill
              className="object-cover object-top"
              priority
            />
          </div>

          {/* Name overlay */}
          <div
            className="absolute bottom-0 left-0 right-0 px-6 py-5"
            style={{
              background: "linear-gradient(to top, rgba(3,8,15,0.88) 0%, rgba(3,8,15,0.5) 60%, transparent 100%)",
            }}
          >
            <p className="text-base font-semibold text-white">{member.name}</p>
            <p className="text-sm" style={{ color: "var(--brand-light)" }}>
              {member.role.split("·")[0].trim()} · {member.registro}
            </p>
          </div>
        </div>

        {/* Badge bottom */}
        <motion.div
          className="absolute -bottom-4 -left-4 flex items-center gap-2 rounded-2xl border border-white bg-white px-4 py-3 shadow-lg"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full"
            style={{ backgroundColor: "rgba(0,174,239,0.1)", color: "var(--brand)" }}
          >
            <Icon name="check" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-800">{member.badge}</p>
            <p className="text-[10px] text-gray-400">{member.badgeSub}</p>
          </div>
        </motion.div>

        {/* Stat badge */}
        <motion.div
          className="absolute -top-4 -right-4 flex flex-col items-center rounded-2xl border border-white bg-white px-4 py-3 shadow-lg"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <span className="text-2xl font-bold" style={{ color: "var(--brand)" }}>{member.statValue}</span>
          <span className="text-[10px] font-medium text-gray-400 text-center whitespace-pre-line">{member.statLabel}</span>
        </motion.div>
      </motion.div>
    </AnimatedSection>
  );
}

/* ─── Main section ──────────────────────────────────────────────────── */

export function TeamSection() {
  return (
    <section id="equipo" className="relative overflow-hidden" style={{ backgroundColor: "#ffffff" }}>
      {/* Top accent */}
      <div className="h-1 w-full" style={{ background: "linear-gradient(to right, transparent, var(--brand), transparent)" }} />

      <div className="mx-auto max-w-[1400px] px-6 md:px-8">
        {team.map((member, idx) => (
          <div key={member.id}>
            {/* Divider between members */}
            {idx > 0 && (
              <div className="mx-auto h-px max-w-[800px]" style={{ background: "linear-gradient(to right, transparent, rgba(0,174,239,0.15), transparent)" }} />
            )}

            <div className="py-24 md:py-32">
              <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-start lg:gap-24">
                {member.photoSide === "left" ? (
                  <>
                    <PhotoColumn member={member} />
                    <CurriculumColumn member={member} />
                  </>
                ) : (
                  <>
                    <CurriculumColumn member={member} />
                    <PhotoColumn member={member} />
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
