// LensVerse — GadgetsSection
import StorySection from "./StorySection";

const gearList = [
  "Canon EOS R5 Mark II",
  "RF 24-70mm f/2.8L",
  "RF 50mm f/1.2L",
  "RF 85mm f/1.2L",
  "Profoto B10 Plus",
  "DJI RS 3 Pro Gimbal",
];

export default function GadgetsSection() {
  return (
    <StorySection
      eyebrow="Gadgets I Use"
      heading="The Tools Behind The Frame"
      body="Gear doesn't make the photographer, but the right tools let you stop thinking about the camera and start thinking about the moment. Here's what's usually in my bag."
      imagePosition="left"
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--space-sm)",
          marginTop: "var(--space-xl)",
        }}
      >
        {gearList.map((item) => (
          <span
            key={item}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: 9999,
              border: "1px solid var(--color-border-mid)",
              background: "var(--color-surface)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.8125rem",
              color: "var(--color-text)",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </StorySection>
  );
}
