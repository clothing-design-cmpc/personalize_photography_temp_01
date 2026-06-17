// ============================================================
// Root Layout — Applied to all pages
// Loads global CSS, sets metadata, and wraps page content
// ============================================================

import './styles/globals.css';
import './styles/animations.css';
import './styles/parallax.css';
import './styles/mediaQueries.css';

export const metadata = {
  title: 'Isla Serena | Private Island Resort · Philippines',
  description:
    'An intimate private island sanctuary in Palawan, Philippines. Maximum 40 guests. Untouched nature, world-class service, and a table that changes with the seasons.',
  keywords: [
    'private resort Philippines',
    'Palawan luxury resort',
    'exclusive island hotel',
    'private villa Philippines',
    'boutique resort Palawan',
  ],
  openGraph: {
    title: 'Isla Serena | Private Island Resort · Philippines',
    description:
      'An intimate private island sanctuary in Palawan. Maximum 40 guests. Untouched nature, invisible service.',
    url: 'https://www.islaserena.com.ph',
    siteName: 'Isla Serena Private Resort',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=85',
        width: 1200,
        height: 630,
        alt: 'Isla Serena Resort — Infinity Pool at Sunset',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Isla Serena | Private Island Resort · Philippines',
    description: 'An intimate island sanctuary. 40 guests maximum. Untouched Palawan.',
    images: ['https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=85'],
  },
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏝️</text></svg>',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
