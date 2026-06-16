// LensVerse — Root Layout
// Wraps every page with Header, Footer, and global CSS imports

import type { Metadata } from "next";
import "./styles/globals.css";
import "./styles/animations.css";
import "./styles/three.css";
import "./styles/mediaQueries.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// ─── Root metadata ────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: "LensVerse — Luxury Photography Portfolio",
    template: "%s | LensVerse",
  },
  description:
    "Luxury wedding, portrait, travel, and commercial photography. Book your session with LensVerse.",
  keywords: [
    "photography",
    "luxury photographer",
    "wedding photography",
    "portrait photography",
    "commercial photography",
    "travel photography",
    "book photographer",
  ],
  authors: [{ name: "LensVerse" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lensverse.com",
    siteName: "LensVerse",
    title: "LensVerse — Luxury Photography Portfolio",
    description:
      "Capturing stories beyond the lens. Luxury wedding, portrait, travel, and commercial photography.",
  },
  twitter: {
    card: "summary_large_image",
    title: "LensVerse — Luxury Photography Portfolio",
    description:
      "Capturing stories beyond the lens. Luxury wedding, portrait, travel, and commercial photography.",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL(
    process.env.NEXTAUTH_URL ?? "https://lensverse.com"
  ),
};

// ─── RootLayout ──────────────────────────────────────────────────────────────
// Renders the HTML shell, global styles, and page slot between Header and Footer
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "LensVerse",
              description:
                "Luxury wedding, portrait, travel, and commercial photography studio.",
              url: "https://lensverse.com",
              image: "https://lensverse.com/og-image.jpg",
              priceRange: "$$$",
              serviceType: "Photography",
              areaServed: "Worldwide",
            }),
          }}
        />
      </head>
      <body>
        <Header />
        <main id="mainContent">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
