// LensVerse — AboutMeSection
import StorySection from "./StorySection";

export default function AboutMeSection() {
  return (
    <StorySection
      eyebrow="About Me"
      heading="The Person Behind The Camera"
      body="I'm a photographer who believes the best images come from genuine connection, not posed perfection. Over the years I've shot weddings, portraits, travel stories, and brand campaigns — but the throughline has always been the same: showing up fully present, camera or not."
      imageSrc="/about-me.jpg"
      imageAlt="Portrait of the photographer at work"
      imagePosition="right"
    />
  );
}
