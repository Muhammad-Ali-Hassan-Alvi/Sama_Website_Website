"use client";

import { HeroSection } from "@/components/sections/HeroSection";
import { ClientStrip } from "@/components/sections/ClientStrip";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { FeaturedCaseStudies } from "@/components/sections/FeaturedCaseStudies";
import { OpenSourceSection } from "@/components/sections/OpenSourceSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CtaBanner } from "@/components/sections/CtaBanner";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <ClientStrip />
      <ServicesSection />
      <WhyUsSection />
      <ProcessSection />
      <FeaturedCaseStudies />
      <OpenSourceSection />
      <TestimonialsSection />
      <CtaBanner />
    </>
  );
}
