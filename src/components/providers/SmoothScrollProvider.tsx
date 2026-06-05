"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Pages that use Framer Motion useScroll — skip Lenis there
    if (pathname?.match(/^\/entrenamiento\/.+/) || pathname?.startsWith("/programa-metabolico")) return;

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [pathname]);

  return <>{children}</>;
}
