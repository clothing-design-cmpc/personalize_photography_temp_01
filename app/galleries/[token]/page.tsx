"use client";

// LensVerse — Client Gallery Viewer
// Fetches a ClientGallery by its access token via /api/galleries/[token].
// Prompts for a password if the gallery owner protected it, then renders
// the delivered photos in a responsive grid with a lightbox preview.

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { useParams } from "next/navigation";

interface GalleryData {
  clientName: string;
  shootDate:  string;
  images:     string[];
}

export default function ClientGalleryPage() {
  const params = useParams<{ token: string }>();
  const token  = params.token;

  const [gallery, setGallery]                 = useState<GalleryData | null>(null);
  const [requiresPassword, setRequiresPassword] = useState(false);
  const [password, setPassword]               = useState("");
  const [error, setError]                      = useState<string | null>(null);
  const [isLoading, setIsLoading]              = useState(true);
  const [activeImage, setActiveImage]          = useState<string | null>(null);

  // ─── fetchGallery ────────────────────────────────────────────────────────
  // Calls the API with an optional password. Used both on initial load and
  // when the visitor submits the password form.
  const fetchGallery = useCallback(async (pwd?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/galleries/${encodeURIComponent(token)}`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ password: pwd }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.requiresPassword) {
          setRequiresPassword(true);
        }
        setError(data.error ?? "Something went wrong loading this gallery.");
        return;
      }

      setGallery(data);
      setRequiresPassword(false);
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  function handlePasswordSubmit(e: FormEvent) {
    e.preventDefault();
    fetchGallery(password);
  }

  // ─── Loading state ───────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <section className="sectionPadding" style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "var(--color-text-muted)" }}>Loading gallery…</p>
      </section>
    );
  }

  // ─── Password prompt ─────────────────────────────────────────────────────
  if (requiresPassword && !gallery) {
    return (
      <section className="sectionPadding" style={{ minHeight: "60vh", display: "flex", alignItems: "center" }}>
        <div className="containerNarrow" style={{ textAlign: "center", width: "100%" }}>
          <p className="eyebrow" style={{ marginBottom: "var(--space-md)" }}>Protected Gallery</p>
          <h1
            style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight:    800,
              marginBottom:  "var(--space-lg)",
            }}
          >
            Enter the Password
          </h1>
          <form
            onSubmit={handlePasswordSubmit}
            className="glassCard"
            style={{
              padding:       "var(--space-xl)",
              maxWidth:      380,
              margin:        "0 auto",
              display:       "flex",
              flexDirection: "column",
              gap:           "var(--space-md)",
            }}
          >
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Gallery password"
              style={{
                padding:      "0.75rem 1rem",
                borderRadius: "var(--border-radius-btn, 8px)",
                border:       "1px solid var(--color-border)",
                background:   "var(--color-surface)",
                color:        "var(--color-text)",
                fontSize:     "1rem",
              }}
            />
            {error && <p style={{ color: "var(--color-error)", fontSize: "0.875rem" }}>{error}</p>}
            <button type="submit" className="buttonPrimary" style={{ width: "100%" }}>
              Unlock Gallery
            </button>
          </form>
        </div>
      </section>
    );
  }

  // ─── Error state (not found / expired / server error) ───────────────────
  if (error && !gallery) {
    return (
      <section className="sectionPadding" style={{ minHeight: "60vh", display: "flex", alignItems: "center" }}>
        <div className="containerNarrow" style={{ textAlign: "center", width: "100%" }}>
          <p className="eyebrow" style={{ marginBottom: "var(--space-md)" }}>Gallery Unavailable</p>
          <p style={{ maxWidth: "48ch", margin: "0 auto" }}>{error}</p>
          <div style={{ marginTop: "var(--space-xl)" }}>
            <a href="/galleries" className="buttonSecondary">Try a Different Code</a>
          </div>
        </div>
      </section>
    );
  }

  // ─── Loaded gallery ───────────────────────────────────────────────────────
  if (!gallery) return null;

  const shootDateLabel = new Date(gallery.shootDate).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <>
      <section className="sectionPadding" style={{ textAlign: "center" }}>
        <div className="containerNarrow">
          <p className="eyebrow" style={{ marginBottom: "var(--space-md)" }}>Private Gallery</p>
          <h1
            style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "clamp(2rem, 4.5vw, 3rem)",
              fontWeight:    800,
              letterSpacing: "-0.02em",
              marginBottom:  "var(--space-sm)",
            }}
          >
            {gallery.clientName}
          </h1>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.875rem", letterSpacing: "0.05em" }}>
            {shootDateLabel} · {gallery.images.length} photo{gallery.images.length === 1 ? "" : "s"}
          </p>
        </div>
      </section>

      <section className="sectionPadding" style={{ paddingTop: 0 }}>
        <div className="containerContent">
          <div
            style={{
              display:             "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap:                 "var(--space-md)",
            }}
          >
            {gallery.images.map((src, index) => (
              <button
                key={src}
                onClick={() => setActiveImage(src)}
                style={{
                  border:       "none",
                  padding:      0,
                  borderRadius: "var(--border-radius-card, 12px)",
                  overflow:     "hidden",
                  cursor:       "pointer",
                  background:   "var(--color-surface)",
                  aspectRatio:  "4 / 3",
                }}
                aria-label={`Open photo ${index + 1} of ${gallery.images.length}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- Cloudinary URLs, plain <img> avoids next/image remotePatterns coupling for client-only galleries */}
                <img
                  src={src}
                  alt={`${gallery.clientName} — photo ${index + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Lightbox overlay ──────────────────────────────────────────── */}
      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          style={{
            position:       "fixed",
            inset:          0,
            background:     "rgba(0,0,0,0.9)",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            zIndex:         100,
            padding:        "var(--space-xl)",
            cursor:         "zoom-out",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={activeImage}
            alt="Expanded gallery photo"
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: 8 }}
          />
        </div>
      )}
    </>
  );
}
