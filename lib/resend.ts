// LensVerse — Resend Email Client
// Configured Resend instance for transactional emails

import { Resend } from "resend";

// ─── Resend client ────────────────────────────────────────────────────────────
export const resend = new Resend(process.env.RESEND_API_KEY);

// ─── Sender address from environment ─────────────────────────────────────────
export const fromEmail =
  process.env.RESEND_FROM_EMAIL ?? "hello@lensverse.com";

// ─── Admin recipient address ──────────────────────────────────────────────────
export const adminEmail =
  process.env.ADMIN_EMAIL ?? "admin@lensverse.com";
