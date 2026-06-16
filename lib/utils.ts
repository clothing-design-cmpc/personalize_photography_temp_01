// LensVerse — Shared Utilities
// General-purpose helpers used across the codebase

// ─── classNames ───────────────────────────────────────────────────────────────
// Merges class name strings, filtering out falsy values
// Usage: classNames("base", isActive && "active", undefined)
export function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

// ─── formatDate ───────────────────────────────────────────────────────────────
// Formats a Date or ISO string into a human-readable display string
// Output: "June 16, 2026"
export function formatDate(dateInput: Date | string): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  return date.toLocaleDateString("en-US", {
    year:  "numeric",
    month: "long",
    day:   "numeric",
  });
}

// ─── slugify ─────────────────────────────────────────────────────────────────
// Converts a string to a URL-safe slug
// "My Great Photo" → "my-great-photo"
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// ─── truncateText ─────────────────────────────────────────────────────────────
// Truncates a string to maxLength characters and appends ellipsis if cut
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}

// ─── estimateReadTime ─────────────────────────────────────────────────────────
// Estimates read time in minutes based on average 200 words per minute
// Returns: number of minutes (minimum 1)
export function estimateReadTime(content: string): number {
  const wordCount = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(wordCount / 200));
}

// ─── formatPrice ─────────────────────────────────────────────────────────────
// Formats a number as a USD price string
// 1500 → "$1,500"
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style:    "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

// ─── generateBookingReference ─────────────────────────────────────────────────
// Generates a short human-readable booking reference code
// Returns: "LV-A3F9K2"
export function generateBookingReference(): string {
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const code = Array.from({ length: 6 }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length))
  ).join("");
  return `LV-${code}`;
}

// ─── isValidToken ─────────────────────────────────────────────────────────────
// Basic client gallery token format check (alphanumeric, 8–64 chars)
export function isValidToken(token: string): boolean {
  return /^[a-zA-Z0-9_-]{8,64}$/.test(token);
}

// ─── getTimeSlots ─────────────────────────────────────────────────────────────
// Returns array of time slot strings for a given range (1-hour increments)
// getTimeSlots(9, 18) → ["9:00 AM", "10:00 AM", ..., "5:00 PM"]
export function getTimeSlots(startHour: number, endHour: number): string[] {
  const slots: string[] = [];
  for (let hour = startHour; hour < endHour; hour++) {
    const period = hour < 12 ? "AM" : "PM";
    const displayHour = hour <= 12 ? hour : hour - 12;
    slots.push(`${displayHour}:00 ${period}`);
  }
  return slots;
}
