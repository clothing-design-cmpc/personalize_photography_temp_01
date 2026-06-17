// LensVerse — Portfolio Page
// Category filter + responsive photo grid using Unsplash CDN.
// Filter tabs: All, Weddings, Portraits, Travel, Commercial.

import type { Metadata } from "next";
import PortfolioGrid from "./PortfolioGrid";

export const metadata: Metadata = {
  title: "Portfolio — LensVerse",
  description: "Browse weddings, portraits, travel, and commercial photography by LensVerse.",
};

export default function PortfolioPage() {
  return <PortfolioGrid />;
}
