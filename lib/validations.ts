// LensVerse — Zod Validation Schemas
// Shared validation schemas for booking and contact form submissions

import { z } from "zod";

// ─── Booking form schema (Step 4 — client information) ────────────────────────
// Validates all fields submitted in the booking wizard
export const bookingFormSchema = z.object({
  // Step 1 fields
  serviceType: z.string().min(1, "Service type is required"),
  packageTier: z.string().min(1, "Package tier is required"),
  totalPrice:  z.number().min(0),

  // Step 2 + 3 fields
  eventDate: z.string().min(1, "Event date is required"),
  eventTime: z.string().min(1, "Event time is required"),

  // Step 4 fields
  name: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be under 100 characters"),

  email: z
    .string()
    .email("Please enter a valid email address"),

  phone: z
    .string()
    .min(7, "Phone number must be at least 7 digits")
    .max(20, "Phone number must be under 20 digits"),

  address: z.string().max(200).optional(),

  eventType: z
    .string()
    .min(1, "Event type is required")
    .max(100),

  eventLocation: z
    .string()
    .min(2, "Event location is required")
    .max(200),

  guestCount: z
    .number()
    .int()
    .min(1)
    .max(10000)
    .optional(),

  budget: z.string().max(50).optional(),

  message: z.string().max(1000).optional(),
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;

// ─── Contact form schema ──────────────────────────────────────────────────────
// Validates visitor messages sent through the contact page
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters"),

  email: z
    .string()
    .email("Please enter a valid email address"),

  phone: z
    .string()
    .max(20)
    .optional(),

  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters")
    .max(200, "Subject must be under 200 characters"),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be under 2000 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// ─── Portfolio query params schema ────────────────────────────────────────────
// Validates query strings on GET /api/portfolio
export const portfolioQuerySchema = z.object({
  category: z.string().optional(),
  featured: z
    .string()
    .transform((val) => val === "true")
    .optional(),
  page: z
    .string()
    .transform((val) => parseInt(val, 10))
    .optional(),
  limit: z
    .string()
    .transform((val) => parseInt(val, 10))
    .optional(),
});

// ─── Blog query params schema ─────────────────────────────────────────────────
// Validates query strings on GET /api/blog
export const blogQuerySchema = z.object({
  category: z.string().optional(),
  tag:      z.string().optional(),
  page:     z
    .string()
    .transform((val) => parseInt(val, 10))
    .optional(),
  limit:    z
    .string()
    .transform((val) => parseInt(val, 10))
    .optional(),
});
