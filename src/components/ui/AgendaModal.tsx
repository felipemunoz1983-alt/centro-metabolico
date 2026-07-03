"use client";

import { useState, useEffect } from "react";

const DEFAULT_URL = "https://centro-metabolico-agendamiento.vercel.app/reservar";

export function AgendaModal() {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState(DEFAULT_URL);

  useEffect(() => {
    // Intercepta clics a la agenda → abre el modal con el enlace específico
    // (permite deep-links por profesional/servicio: /reservar?servicio=..&pro=..)
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (anchor?.href?.includes("centro-metabolico-agendamiento.vercel.app")) {
        e.preventDefault();
        setUrl(anchor.href);
        setOpen(true);
      }
    };
    // Apertura programática (usa el enlace por defecto)
    const handleEvent = () => {
      setUrl(DEFAULT_URL);
      setOpen(true);
    };

    document.addEventListener("click", handleClick, true);
    window.addEventListener("open-agenda-modal", handleEvent);
    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("open-agenda-modal", handleEvent);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[500] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
      onClick={() => setOpen(false)}
    >
      <div
        className="relative w-full overflow-hidden rounded-2xl bg-white"
        style={{ maxWidth: "860px", maxHeight: "90vh", boxShadow: "0 32px 80px rgba(0,0,0,0.6)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 z-10 flex items-center justify-center rounded-full text-sm font-bold"
          style={{ width: 36, height: 36, backgroundColor: "rgba(0,0,0,0.12)", color: "#333", cursor: "pointer", border: "none" }}
        >
          ✕
        </button>
        <iframe
          src={url}
          key={url}
          width="810"
          frameBorder={0}
          scrolling="yes"
          title="Reservar hora — Centro Metabólico"
          style={{ border: "none", display: "block", width: "100%", minHeight: "680px" }}
        />
      </div>
    </div>
  );
}
