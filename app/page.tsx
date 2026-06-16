// LensVerse — Homepage
// Assembles all home sections in order per spec

import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import FeaturedWork from "@/components/home/FeaturedWork";
import StatsSection from "@/components/home/StatsSection";
import ServicesPreview from "@/components/home/ServicesPreview";
import TestimonialsSlider from "@/components/home/TestimonialsSlider";
import CtaBanner from "@/components/home/CtaBanner";

export const metadata: Metadata = {
  title: "LensVerse — Luxury Photography Portfolio",
  description:
    "Capturing stories beyond the lens. Luxury wedding, portrait, travel, and commercial photography.",
  openGraph: {
    title: "LensVerse — Luxury Photography Portfolio",
    description:
      "Capturing stories beyond the lens. Luxury wedding, portrait, travel, and commercial photography.",
    type: "website",
  },
};

// ─── Home ────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedWork />
      <StatsSection />
      <ServicesPreview />
      <TestimonialsSlider />
      <CtaBanner />
    </>
  );
}
