// LensVerse — About Page
// Studio story told through a scroll-pinned video background with chapter reveals

import type { Metadata } from "next";
import StoryReveal, { type StoryChapter } from "@/components/about/StoryReveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about LensVerse — our mission, vision, and the techniques behind every frame we capture.",
};

// ─── Story chapters config ────────────────────────────────────────────────
const storyChapters: StoryChapter[] = [
  {
    eyebrow: "The Photographer",
    heading: "Behind Every Frame",
    body:
      "LensVerse was founded on a simple belief: every moment deserves to be remembered with intention. What started as a single camera and a passion for light has grown into a full studio practice across weddings, portraits, travel, and commercial work.",
  },
  {
    eyebrow: "Our Mission",
    heading: "Stories Worth Keeping",
    body:
      "We exist to turn fleeting moments into lasting artifacts — images that hold up not just as photographs, but as honest records of how something felt. No two sessions are treated the same, because no two stories are.",
  },
  {
    eyebrow: "Our Vision",
    heading: "Beyond The Lens",
    body:
      "We see photography as more than documentation — it's interpretation. Our vision is to keep pushing past the expected angle, the obvious pose, the safe shot, in search of the frame that actually means something.",
  },
  {
    eyebrow: "Our Technique",
    heading: "Light, Patience, Precision",
    body:
      "Every session begins with observation before a single shutter click. We work with natural light whenever possible, shoot in long, unhurried blocks of time, and edit with restraint — letting the moment speak rather than overproducing it.",
  },
];

// ─── About ────────────────────────────────────────────────────────────────
export default function About() {
  return (
    <>
      <StoryReveal
        videoSrcWebm="/camera-assembly.webm"
        chapters={storyChapters}
      />

      {/* Closing section after the scroll story ends */}
      <section
        className="sectionPadding"
        style={{ background: "var(--color-bg)", textAlign: "center" }}
      >
        <div className="containerNarrow">
          <p className="eyebrow" style={{ marginBottom: "var(--space-md)" }}>
            Let's Work Together
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "var(--color-text)",
              marginBottom: "var(--space-lg)",
            }}
          >
            Ready To Tell Your Story?
          </h2>
          <p style={{ color: "var(--color-text-muted)", marginBottom: "var(--space-2xl)" }}>
            Reach out and let's talk about what you have in mind.
          </p>
        </div>
      </section>
    </>
  );
}
