import { EnergySection } from "@/components/sections/EnergySection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { MethodologySection } from "@/components/sections/MethodologySection";
import { StatsSection } from "@/components/sections/StatsSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <main>
        <EnergySection />
        <ServicesSection />
        <MethodologySection />
        <StatsSection />
        <TeamSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
