"use client";

// LensVerse — Galleries Landing Page
// Entry point for clients who received a private gallery link/code after their
// session. Submitting the code routes to the actual gallery at /galleries/[token],
// where the API checks the token (and password, if the gallery is protected).

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function GalleriesPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = code.trim();
    if (!trimmed) {
      setError("Enter the gallery code from your email or text message.");
      return;
    }
    router.push(`/galleries/${encodeURIComponent(trimmed)}`);
  }

  return (
    <section className="sectionPadding" style={{ minHeight: "70vh", display: "flex", alignItems: "center" }}>
      <div className="containerNarrow" style={{ textAlign: "center", width: "100%" }}>
        <p className="eyebrow" style={{ marginBottom: "var(--space-md)" }}>Client Galleries</p>
        <h1
          style={{
            fontFamily:    "var(--font-display)",
            fontSize:      "clamp(2.25rem, 5vw, 3.5rem)",
            fontWeight:    800,
            letterSpacing: "-0.02em",
            marginBottom:  "var(--space-lg)",
          }}
        >
          View Your Private Gallery
        </h1>
        <p style={{ maxWidth: "52ch", margin: "0 auto var(--space-2xl)" }}>
          After your session, you'll get a private link with a gallery code.
          Enter it below to view and download your delivered photos.
        </p>

        <form
          onSubmit={handleSubmit}
          className="glassCard"
          style={{
            padding:       "var(--space-xl)",
            maxWidth:      420,
            margin:        "0 auto",
            display:       "flex",
            flexDirection: "column",
            gap:           "var(--space-md)",
            textAlign:     "left",
          }}
        >
          <label htmlFor="galleryCode" style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
            Gallery Code
          </label>
          <input
            id="galleryCode"
            type="text"
            value={code}
            onChange={(e) => { setCode(e.target.value); setError(null); }}
            placeholder="e.g. smith-wedding-2026"
            style={{
              padding:      "0.75rem 1rem",
              borderRadius: "var(--border-radius-btn, 8px)",
              border:       "1px solid var(--color-border)",
              background:   "var(--color-surface)",
              color:        "var(--color-text)",
              fontSize:     "1rem",
            }}
          />
          {error && (
            <p style={{ color: "var(--color-error)", fontSize: "0.875rem" }}>{error}</p>
          )}
          <button type="submit" className="buttonPrimary" style={{ width: "100%" }}>
            View Gallery
          </button>
        </form>

        <p style={{ marginTop: "var(--space-xl)", fontSize: "0.9375rem" }}>
          Can't find your code? <a href="/contact" style={{ textDecoration: "underline" }}>Contact me</a> and I'll resend it.
        </p>
      </div>
    </section>
  );
}
