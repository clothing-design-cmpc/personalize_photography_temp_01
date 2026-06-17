// LensVerse — Homepage
// Full scrollytelling sequence: video hero, then 7 story sections,
// each with video backgrounds, breathing images, and up/down text reveals

import type { Metadata } from "next";
import VideoHero from "@/components/home/VideoHero";
import AboutMeSection from "@/components/home/AboutMeSection";
import HowIWorkSection from "@/components/home/HowIWorkSection";
import CoreBeliefSection from "@/components/home/CoreBeliefSection";
import WhyPhotographerSection from "@/components/home/WhyPhotographerSection";
import TechniquesSection from "@/components/home/TechniquesSection";
import GadgetsSection from "@/components/home/GadgetsSection";
import ContactMeSection from "@/components/home/ContactMeSection";

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

// ─── Home ────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <VideoHero />
      <AboutMeSection />
      <HowIWorkSection />
      <CoreBeliefSection />
      <WhyPhotographerSection />
      <TechniquesSection />
      <GadgetsSection />
      <ContactMeSection />
    </>
  );
}
