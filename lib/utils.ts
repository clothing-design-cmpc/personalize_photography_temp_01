// ─── SLUG GENERATION ─────────────────────────────────────────────────────────

/**
 * Converts a title string into a URL-safe slug.
 * Example: "My First Wedding" → "my-first-wedding"
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

// ─── DATE FORMATTING ──────────────────────────────────────────────────────────

/**
 * Formats a Date or ISO string into human-readable format.
 * Example: "December 25, 2025"
 */
export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-PH", {
    year:  "month",
    month: "long",
    day:   "numeric",
  });
}

/**
 * Formats a time string (24hr) into 12-hour display.
 * Example: "09:00" → "9:00 AM"
 */
export function formatTime(time: string): string {
  const [hourStr, minute] = time.split(":");
  const hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minute} ${ampm}`;
}

// ─── BLOG READ TIME ───────────────────────────────────────────────────────────

/**
 * Estimates read time in minutes from a content string.
 * Assumes 200 words per minute reading speed.
 */
export function calculateReadTime(content: string): number {
  const wordCount = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

// ─── PRICE FORMATTING ─────────────────────────────────────────────────────────

/**
 * Formats a number as Philippine Peso currency.
 * Example: 50000 → "₱50,000.00"
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-PH", {
    style:    "currency",
    currency: "PHP",
  }).format(amount);
}

// ─── TOKEN GENERATION ─────────────────────────────────────────────────────────

/**
 * Generates a random alphanumeric token for client galleries.
 * Example: "a1b2c3d4e5f6"
 */
export function generateGalleryToken(): string {
  return Math.random().toString(36).substring(2, 14);
}

// ─── CLASS NAMES ─────────────────────────────────────────────────────────────

/**
 * Joins class name strings, filtering out falsy values.
 * Lightweight alternative to clsx for simple use cases.
 */
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
