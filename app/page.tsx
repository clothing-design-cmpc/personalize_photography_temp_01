// LensVerse — Homepage
// Frame-sequence scroll-scrubbing: 192 WebP frames on canvas, Hero → 8 chapters.

import type { Metadata } from "next";
import ScrollScrubStory, { type ScrubChapter } from "@/components/home/ScrollScrubStory";

export const metadata: Metadata = {
  title: "LensVerse — Luxury Photography Portfolio",
  description: "Capturing stories beyond the lens. Luxury wedding, portrait, travel, and commercial photography.",
  openGraph: {
    title:       "LensVerse — Luxury Photography Portfolio",
    description: "Capturing stories beyond the lens.",
    type:        "website",
  },
};

const storyChapters: ScrubChapter[] = [
  {
    layout:  "hero",
    eyebrow: "LensVerse",
    heading: "Capturing Stories Beyond The Lens",
    body:    "Luxury wedding, portrait, travel, and commercial photography.",
  },
  {
    layout:   "splitRight",
    eyebrow:  "About Me",
    heading:  "The Person Behind The Camera",
    body:     "I'm a photographer who believes the best images come from genuine connection, not posed perfection. Over the years I've shot weddings, portraits, travel stories, and brand campaigns — but the throughline has always been the same: showing up fully present, camera or not.",
    imageSrc: "/images/story/photographer.png",
  },
  {
    layout:   "splitLeft",
    eyebrow:  "How I Work",
    heading:  "People First, Camera Second",
    body:     "Every session starts with a real conversation, not a shot list. I want to know what makes you nervous, what you're proud of, what you want this moment to mean later. The best photos happen when people forget the camera is even there.",
    imageSrc: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
  },
  {
    layout:  "quote",
    eyebrow: "Core Belief",
    heading: "A Photo Is A Promise To Remember",
    body:    "I believe a photograph isn't just light hitting a sensor — it's a promise that this moment mattered enough to keep.",
  },
  {
    layout:   "splitRight",
    eyebrow:  "Why I Became A Photographer",
    heading:  "It Started With Wanting To Hold Onto Things",
    body:     "I picked up a camera the first time because I was afraid of forgetting things — faces, places, the way light hit a room at a certain hour. Photography became my way of holding on.",
    imageSrc: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80",
  },
  {
    layout:  "techniques",
    eyebrow: "My Techniques",
    heading: "Light, Patience, And Knowing When Not To Direct",
    body:    "I shoot almost entirely with natural and available light — harder to control, but honest. I work in long, unhurried blocks of time rather than rushed shot lists.",
  },
  {
    layout:  "gadgets",
    eyebrow: "Gadgets I Use",
    heading: "The Tools Behind The Frame",
    body:    "Gear doesn't make the photographer, but the right tools let you stop thinking about the camera and start thinking about the moment.",
  },
  {
    layout:  "contact",
    eyebrow: "Contact Me",
    heading: "Let's Talk About Your Story",
    body:    "Whether it's a wedding, a portrait session, or a brand shoot — reach out and tell me what you have in mind.",
  },
];

export default function Home() {
  return <ScrollScrubStory chapters={storyChapters} />;
}
