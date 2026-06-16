import { z } from "zod";

// ─── BOOKING WIZARD SCHEMAS ───────────────────────────────────────────────────

export const selectServiceSchema = z.object({
  serviceType: z.enum(["Wedding", "Portrait", "Commercial", "Travel", "Events"]),
  packageTier: z.enum(["Basic", "Premium", "Luxury"]),
});

export const selectDateSchema = z.object({
  eventDate: z.string().min(1, "Please select a date"),
});

export const selectTimeSchema = z.object({
  eventTime: z.string().min(1, "Please select a time slot"),
});

export const clientInfoSchema = z.object({
  name:       z.string().min(2, "Name must be at least 2 characters"),
  email:      z.string().email("Invalid email address"),
  phone:      z.string().min(7, "Invalid phone number"),
  address:    z.string().optional(),
  eventType:  z.string().min(1, "Event type is required"),
  location:   z.string().min(2, "Event location is required"),
  guestCount: z.number().int().positive().optional(),
  budget:     z.string().optional(),
  message:    z.string().optional(),
});

export const bookingSubmitSchema = selectServiceSchema
  .merge(selectDateSchema)
  .merge(selectTimeSchema)
  .merge(clientInfoSchema)
  .extend({
    totalPrice: z.number().positive(),
  });

// ─── CONTACT FORM SCHEMA ──────────────────────────────────────────────────────

export const contactSchema = z.object({
  name:    z.string().min(2, "Name is required"),
  email:   z.string().email("Invalid email address"),
  phone:   z.string().optional(),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// ─── TYPES ────────────────────────────────────────────────────────────────────

export type SelectServiceData  = z.infer<typeof selectServiceSchema>;
export type SelectDateData     = z.infer<typeof selectDateSchema>;
export type SelectTimeData     = z.infer<typeof selectTimeSchema>;
export type ClientInfoData     = z.infer<typeof clientInfoSchema>;
export type BookingSubmitData  = z.infer<typeof bookingSubmitSchema>;
export type ContactFormData    = z.infer<typeof contactSchema>;
