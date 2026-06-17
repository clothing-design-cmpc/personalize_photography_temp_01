// ============================================================
// Contact Page — Standalone enquiry and contact page
// Reuses ContactSection and LocationMap components
// ============================================================

import Header from '../../components/Header';
import ContactSection from '../../components/ContactSection';
import LocationMap from '../../components/LocationMap';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Contact & Enquiries — Isla Serena Private Resort',
  description: 'Get in touch with Isla Serena for booking enquiries, special requests, or general information about the resort.',
};

export default function ContactPage() {
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
              Get in Touch
            </p>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
              fontWeight: 600,
              color: 'var(--color-neutral-cream)',
              lineHeight: 1.2,
              marginTop: '12px',
            }}>
              We respond within 4 hours
            </h1>
            <p style={{
              marginTop: '20px',
              fontSize: '1.0625rem',
              color: 'rgba(255,255,255,0.65)',
              maxWidth: '520px',
              margin: '20px auto 0',
              lineHeight: 1.7,
            }}>
              Whether it's a booking enquiry, a special occasion, or a question about the resort — we're here.
            </p>
          </div>
        </section>

        {/* Contact form section */}
        <ContactSection />

        {/* Location and map */}
        <LocationMap />
      </main>

      <Footer />
    </>
  );
}
