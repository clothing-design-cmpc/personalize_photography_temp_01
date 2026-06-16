// LensVerse — Stripe Config
// Server-side Stripe instance and client-side publishable key export

import Stripe from "stripe";

// ─── Server-side Stripe instance ──────────────────────────────────────────────
// Used in API routes for payment intent creation and webhook verification
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
  typescript: true,
});

// ─── Publishable key for client-side Stripe Elements ─────────────────────────
// Exposed via NEXT_PUBLIC_ prefix — safe to use in browser code
export const stripePublishableKey =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;
