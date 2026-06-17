// ============================================================
// Gallery Page — Full image gallery with lightbox
// Larger grid than homepage section — shows all resort images
// ============================================================

import Header from '../../components/Header';
import GalleryGrid from '../../components/GalleryGrid';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Gallery — Isla Serena Private Resort',
  description: 'Browse the lagoon, villas, spa, dining, and natural surroundings of Isla Serena Private Resort.',
};

export default function GalleryPage() {
  return (
    <>
      <Header />

      <main>
        {/* Page hero */}
        <section style={{
          paddingTop: '140px',
          paddingBottom: '60px',
          backgroundColor: 'var(--color-primary-navy)',
          textAlign: 'center',
        }}>
          <div className="container">
            <p className="sectionEyebrow" style={{ color: 'var(--color-accent-gold)' }}>
              Gallery
            </p>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
              fontWeight: 600,
              color: 'var(--color-neutral-cream)',
              lineHeight: 1.2,
              marginTop: '12px',
            }}>
              See it to believe it
            </h1>
            <p style={{
              marginTop: '20px',
              fontSize: '1.0625rem',
              color: 'rgba(255,255,255,0.65)',
              maxWidth: '520px',
              margin: '20px auto 0',
              lineHeight: 1.7,
            }}>
              Every image is taken on-property — no staging, no filters. What you see is what you arrive to.
            </p>
          </div>
        </section>

        {/* Full gallery grid — reuses homepage component */}
        <GalleryGrid />

        {/* CTA strip */}
        <section style={{
          padding: '80px 0',
          backgroundColor: 'var(--color-neutral-cream)',
          textAlign: 'center',
        }}>
          <div className="container">
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.375rem',
              color: 'var(--color-primary-navy)',
              marginBottom: '28px',
            }}>
              Ready to experience this in person?
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="/rooms"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 32px',
                  backgroundColor: 'var(--color-primary-navy)',
                  color: 'var(--color-white)',
                  fontWeight: 600,
                  fontSize: '0.9375rem',
                  borderRadius: 'var(--border-radius-btn)',
                  textDecoration: 'none',
                }}
              >
                View Rooms →
              </a>
              <a
                href="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 32px',
                  backgroundColor: 'transparent',
                  color: 'var(--color-primary-navy)',
                  fontWeight: 600,
                  fontSize: '0.9375rem',
                  borderRadius: 'var(--border-radius-btn)',
                  border: '2px solid var(--color-primary-navy)',
                  textDecoration: 'none',
                }}
              >
                Make an Enquiry
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
