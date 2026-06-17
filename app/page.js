// ============================================================
// Homepage — Composes all sections in order
// All components are client-side ('use client') for animations
// Section order follows the spec
// ============================================================

import Header from '../components/Header';
import Hero from '../components/Hero';
import BookingWidget from '../components/BookingWidget';
import WhyChooseUs from '../components/WhyChooseUs';
import RoomsShowcase from '../components/RoomsShowcase';
import ServicesShowcase from '../components/ServicesShowcase';
import AmenitiesDisplay from '../components/AmenitiesDisplay';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import GalleryGrid from '../components/GalleryGrid';
import FAQSection from '../components/FAQSection';
import LocationMap from '../components/LocationMap';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <>
      {/* Sticky navigation */}
      <Header />

      <main>
        {/* 1. Hero — full-viewport parallax */}
        <Hero />

        {/* 2. Booking widget — overlaps hero bottom */}
        <BookingWidget />

        {/* 3. Why Choose Us — USP cards */}
        <WhyChooseUs />

        {/* 4. Rooms Showcase — card grid */}
        <RoomsShowcase />

        {/* 5. Services — tabbed, dark parallax background */}
        <ServicesShowcase />

        {/* 6. Amenities — icon grid */}
        <AmenitiesDisplay />

        {/* 7. Testimonials — auto-advancing carousel */}
        <TestimonialsCarousel />

        {/* 8. Gallery — masonry grid with lightbox */}
        <GalleryGrid />

        {/* 9. FAQ — animated accordion */}
        <FAQSection />

        {/* 10. Location — embedded map */}
        <LocationMap />

        {/* 11. Contact — form with parallax background */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
