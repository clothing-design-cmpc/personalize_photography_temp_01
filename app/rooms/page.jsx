// ============================================================
// Rooms Page — Standalone accommodation listing
// Shows all rooms in a detailed grid with booking CTA
// ============================================================

import Header from '../../components/Header';
import RoomsShowcase from '../../components/RoomsShowcase';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Rooms & Villas — Isla Serena Private Resort',
  description: 'Choose from our Lagoon Suite, Forest Villa, and Garden Pavilion. Each accommodation at Isla Serena is a distinct private world.',
};

export default function RoomsPage() {
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
              Accommodation
            </p>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
              fontWeight: 600,
              color: 'var(--color-neutral-cream)',
              lineHeight: 1.2,
              marginTop: '12px',
            }}>
              Your private world within ours
            </h1>
            <p style={{
              marginTop: '20px',
              fontSize: '1.0625rem',
              color: 'rgba(255,255,255,0.65)',
              maxWidth: '560px',
              margin: '20px auto 0',
              lineHeight: 1.7,
            }}>
              Three distinct stays — each designed around its setting, not a brand standard.
              Minimum two nights. Maximum privacy.
            </p>
          </div>
        </section>

        {/* Rooms grid — reuses homepage component */}
        <RoomsShowcase />

        {/* Booking note */}
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
              marginBottom: '8px',
            }}>
              All rates are in Philippine Peso, inclusive of breakfast for two.
            </p>
            <p style={{
              fontSize: '0.9375rem',
              color: 'var(--color-text-muted)',
              marginBottom: '32px',
            }}>
              Special rates for stays of 5 nights or more. Contact us to arrange.
            </p>
            <a
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 36px',
                backgroundColor: 'var(--color-accent-gold)',
                color: 'var(--color-primary-navy)',
                fontWeight: 600,
                fontSize: '0.9375rem',
                borderRadius: 'var(--border-radius-btn)',
                textDecoration: 'none',
                transition: 'background-color 0.2s',
              }}
            >
              Enquire & Book →
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
