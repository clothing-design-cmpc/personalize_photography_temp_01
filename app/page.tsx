// LensVerse — Homepage
// Apple-style scroll-scrubbed video story: one pinned video plays frame-by-frame
// as the user scrolls through all 7 chapters (About Me, How I Work, Core Belief,
// Why Photographer, Techniques, Gadgets, Contact)

import type { Metadata } from "next";
import Link from "next/link";
import VideoHero from "@/components/home/VideoHero";
import ScrollScrubStory, { type ScrubChapter } from "@/components/home/ScrollScrubStory";

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

const gearList = [
  "Canon EOS R5 Mark II",
  "RF 24-70mm f/2.8L",
  "RF 50mm f/1.2L",
  "RF 85mm f/1.2L",
  "Profoto B10 Plus",
  "DJI RS 3 Pro Gimbal",
];

// ─── Story chapters config ────────────────────────────────────────────────
const storyChapters: ScrubChapter[] = [
  {
    eyebrow: "About Me",
    heading: "The Person Behind The Camera",
    body:
      "I'm a photographer who believes the best images come from genuine connection, not posed perfection. Over the years I've shot weddings, portraits, travel stories, and brand campaigns — but the throughline has always been the same: showing up fully present, camera or not.",
  },
  {
    eyebrow: "How I Work",
    heading: "People First, Camera Second",
    body:
      "Every session starts with a real conversation, not a shot list. I want to know what makes you nervous, what you're proud of, what you want this moment to mean later. The best photos happen when people forget the camera is even there.",
  },
  {
    eyebrow: "Core Belief",
    heading: "A Photo Is A Promise To Remember",
    body:
      "I believe a photograph isn't just light hitting a sensor — it's a promise that this moment mattered enough to keep. That belief shapes how I shoot, how I edit, and which shots I choose to show you.",
  },
  {
    eyebrow: "Why I Became A Photographer",
    heading: "It Started With Wanting To Hold Onto Things",
    body:
      "I picked up a camera the first time because I was afraid of forgetting things — faces, places, the way light hit a room at a certain hour. Photography became my way of holding on.",
  },
  {
    eyebrow: "My Techniques",
    heading: "Light, Patience, And Knowing When Not To Direct",
    body:
      "I shoot almost entirely with natural and available light — harder to control, but honest. I work in long, unhurried blocks of time rather than rushed shot lists, because the moments worth keeping rarely happen on command.",
  },
  {
    eyebrow: "Gadgets I Use",
    heading: "The Tools Behind The Frame",
    body:
      "Gear doesn't make the photographer, but the right tools let you stop thinking about the camera and start thinking about the moment. Here's what's usually in my bag.",
    extra: (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--space-sm)",
          marginTop: "var(--space-xl)",
          justifyContent: "center",
        }}
      >
        {gearList.map((item) => (
          <span
            key={item}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: 9999,
              border: "1px solid var(--color-border-mid)",
              background: "rgba(255,255,255,0.06)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.8125rem",
              color: "var(--color-text)",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    ),
  },
  {
    eyebrow: "Contact Me",
    heading: "Let's Talk About Your Story",
    body:
      "Whether it's a wedding, a portrait session, or a brand shoot — reach out and tell me what you have in mind.",
    extra: (
      <div
        style={{
          display: "flex",
          gap: "var(--space-md)",
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: "var(--space-xl)",
        }}
      >
        <Link href="/contact" className="buttonPrimary">
          Get in Touch
        </Link>
        <Link href="/booking" className="buttonSecondary">
          Book a Session
        </Link>
      </div>
    ),
  },
];

// ─── Home ────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <VideoHero />
      <ScrollScrubStory
        videoSrcWebm="/photographer-story.webm"
        chapters={storyChapters}
      />
    </>
  );
}
