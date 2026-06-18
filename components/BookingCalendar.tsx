"use client";

// BookingCalendar
// Dynamic month calendar that lets a visitor pick an available date.
// Unavailable dates (Sundays + a configurable blocklist) are greyed out.
// Selected date triggers an onSelect callback passed from the parent.
// All state is local — no external booking library required.

import { useState, useMemo } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────────
interface BookingCalendarProps {
  /** Called with an ISO date string (YYYY-MM-DD) when the user picks a date. */
  onSelect?: (isoDate: string) => void;
  /** ISO date strings that are manually blocked (e.g. already booked). */
  blockedDates?: string[];
}

// ─── Helpers ───────────────────────────────────────────────────────────────────
const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAY_LABELS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

/** Returns ISO string YYYY-MM-DD for a given Date object. */
function toIsoDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

/** True if the date is before today (local time). */
function isPast(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

// ─── BookingCalendar ───────────────────────────────────────────────────────────
export default function BookingCalendar({
  onSelect,
  blockedDates = [],
}: BookingCalendarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Cursor for which month is displayed — start at current month
  const [cursorYear,  setCursorYear]  = useState(today.getFullYear());
  const [cursorMonth, setCursorMonth] = useState(today.getMonth());
  const [selectedIso, setSelectedIso] = useState<string | null>(null);

  // ── Build calendar grid for the displayed month ──────────────────────────────
  const calendarDays = useMemo(() => {
    const firstDay = new Date(cursorYear, cursorMonth, 1);
    const lastDay  = new Date(cursorYear, cursorMonth + 1, 0);
    const days: (Date | null)[] = [];

    // Leading empty slots so day 1 lines up with its weekday column
    for (let emptySlot = 0; emptySlot < firstDay.getDay(); emptySlot++) {
      days.push(null);
    }
    // Actual days of the month
    for (let dayNum = 1; dayNum <= lastDay.getDate(); dayNum++) {
      days.push(new Date(cursorYear, cursorMonth, dayNum));
    }
    return days;
  }, [cursorYear, cursorMonth]);

  // ── Navigation helpers ────────────────────────────────────────────────────────
  function goToPrevMonth() {
    if (cursorMonth === 0) {
      setCursorMonth(11);
      setCursorYear((y) => y - 1);
    } else {
      setCursorMonth((m) => m - 1);
    }
  }

  function goToNextMonth() {
    if (cursorMonth === 11) {
      setCursorMonth(0);
      setCursorYear((y) => y + 1);
    } else {
      setCursorMonth((m) => m + 1);
    }
  }

  // Disallow navigating to months before the current one
  const isPrevMonthDisabled =
    cursorYear < today.getFullYear() ||
    (cursorYear === today.getFullYear() && cursorMonth <= today.getMonth());

  // ── Date state helpers ────────────────────────────────────────────────────────
  function isBlocked(date: Date): boolean {
    if (date.getDay() === 0) return true; // Sundays always blocked
    if (isPast(date)) return true;
    return blockedDates.includes(toIsoDate(date));
  }

  function handleDayClick(date: Date) {
    if (isBlocked(date)) return;
    const iso = toIsoDate(date);
    setSelectedIso(iso);
    onSelect?.(iso);
  }

  // ── Formatted display of selected date ────────────────────────────────────────
  const selectedDisplay = selectedIso
    ? new Date(selectedIso + "T00:00:00").toLocaleDateString("en-PH", {
        weekday: "long",
        year:    "numeric",
        month:   "long",
        day:     "numeric",
      })
    : null;

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <section
      id="book-now"
      className="sectionPadding"
      style={{ background: "var(--color-bg)", borderTop: "1px solid var(--color-border)" }}
    >
      <div className="containerNarrow">

        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "var(--space-2xl)" }}>
          <p
            className="eyebrow"
            style={{ marginBottom: "var(--space-md)" }}
          >
            Availability
          </p>
          <h2
            style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight:    800,
              letterSpacing: "-0.02em",
              marginBottom:  "var(--space-md)",
            }}
          >
            Pick a Date
          </h2>
          <p style={{ color: "var(--color-text-muted)", maxWidth: "48ch", margin: "0 auto" }}>
            Choose an available date below and we&apos;ll reach out to confirm the session details.
            Sundays are rest days — all other dates are open unless marked unavailable.
          </p>
        </div>

        {/* Calendar card */}
        <div
          className="glassCard"
          style={{
            padding:   "var(--space-xl)",
            maxWidth:  480,
            margin:    "0 auto",
          }}
        >

          {/* Month navigation header */}
          <div
            style={{
              display:        "flex",
              alignItems:     "center",
              justifyContent: "space-between",
              marginBottom:   "var(--space-lg)",
            }}
          >
            <button
              onClick={goToPrevMonth}
              disabled={isPrevMonthDisabled}
              aria-label="Previous month"
              style={{
                width:        44,
                height:       44,
                borderRadius: "50%",
                border:       "1px solid var(--color-border)",
                background:   "transparent",
                color:        isPrevMonthDisabled ? "var(--color-text-muted)" : "var(--color-text)",
                cursor:       isPrevMonthDisabled ? "not-allowed" : "pointer",
                display:      "flex",
                alignItems:   "center",
                justifyContent: "center",
                opacity:      isPrevMonthDisabled ? 0.35 : 1,
                transition:   "background 0.18s ease, border-color 0.18s ease",
              }}
            >
              {/* Left chevron */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>

            <span
              style={{
                fontFamily:  "var(--font-display)",
                fontWeight:  700,
                fontSize:    "1.125rem",
                letterSpacing: "-0.01em",
              }}
            >
              {MONTH_NAMES[cursorMonth]} {cursorYear}
            </span>

            <button
              onClick={goToNextMonth}
              aria-label="Next month"
              style={{
                width:        44,
                height:       44,
                borderRadius: "50%",
                border:       "1px solid var(--color-border)",
                background:   "transparent",
                color:        "var(--color-text)",
                cursor:       "pointer",
                display:      "flex",
                alignItems:   "center",
                justifyContent: "center",
                transition:   "background 0.18s ease, border-color 0.18s ease",
              }}
            >
              {/* Right chevron */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>

          {/* Day-of-week labels row */}
          <div
            style={{
              display:             "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap:                 "var(--space-xs)",
              marginBottom:        "var(--space-sm)",
            }}
          >
            {DAY_LABELS.map((label) => (
              <div
                key={label}
                style={{
                  textAlign:     "center",
                  fontFamily:    "var(--font-mono)",
                  fontSize:      "0.6875rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color:         "var(--color-text-muted)",
                  paddingBottom: "var(--space-xs)",
                }}
              >
                {label}
              </div>
            ))}
          </div>

          {/* Date grid */}
          <div
            style={{
              display:             "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap:                 "var(--space-xs)",
            }}
          >
            {calendarDays.map((date, slotIndex) => {
              if (!date) {
                // Empty leading slot
                return <div key={`empty-${slotIndex}`} />;
              }

              const isoDate        = toIsoDate(date);
              const isDateBlocked  = isBlocked(date);
              const isDateSelected = selectedIso === isoDate;
              const isToday        = toIsoDate(date) === toIsoDate(today);

              return (
                <button
                  key={isoDate}
                  onClick={() => handleDayClick(date)}
                  disabled={isDateBlocked}
                  aria-label={`${isDateBlocked ? "Unavailable" : "Select"} ${isoDate}`}
                  aria-pressed={isDateSelected}
                  style={{
                    width:        "100%",
                    aspectRatio:  "1",
                    borderRadius: "50%",
                    border:       isDateSelected
                      ? "1px solid var(--color-accent)"
                      : isToday
                      ? "1px solid rgba(212,165,116,0.4)"
                      : "1px solid transparent",
                    background: isDateSelected
                      ? "var(--color-accent)"
                      : "transparent",
                    color: isDateSelected
                      ? "#09090b"
                      : isDateBlocked
                      ? "rgba(255,255,255,0.2)"
                      : "var(--color-text)",
                    fontSize:   "0.875rem",
                    fontWeight: isToday || isDateSelected ? 700 : 400,
                    cursor:     isDateBlocked ? "not-allowed" : "pointer",
                    transition: "background 0.18s ease, color 0.18s ease, border-color 0.18s ease",
                    display:    "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight:  44,
                  }}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div
            style={{
              display:       "flex",
              gap:           "var(--space-lg)",
              marginTop:     "var(--space-lg)",
              justifyContent: "center",
              flexWrap:      "wrap",
            }}
          >
            {[
              { color: "var(--color-accent)",             label: "Selected" },
              { color: "rgba(255,255,255,0.2)",           label: "Unavailable" },
              { color: "rgba(212,165,116,0.4)",           label: "Today",      border: true },
            ].map(({ color, label, border }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "var(--space-xs)" }}>
                <div
                  style={{
                    width:        12,
                    height:       12,
                    borderRadius: "50%",
                    background:   border ? "transparent" : color,
                    border:       border ? `2px solid ${color}` : "none",
                    flexShrink:   0,
                  }}
                />
                <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Selected date confirmation strip */}
        {selectedDisplay && (
          <div
            style={{
              marginTop:      "var(--space-xl)",
              textAlign:      "center",
              padding:        "var(--space-lg) var(--space-xl)",
              background:     "rgba(212,165,116,0.08)",
              border:         "1px solid rgba(212,165,116,0.25)",
              borderRadius:   "12px",
              maxWidth:       480,
              margin:         "var(--space-xl) auto 0",
              animation:      "calendarConfirmFadeIn 0.3s var(--ease-smooth) forwards",
            }}
          >
            <p
              style={{
                fontFamily:    "var(--font-mono)",
                fontSize:      "0.75rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color:         "var(--color-accent)",
                marginBottom:  "var(--space-xs)",
              }}
            >
              Selected Date
            </p>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize:   "1.0625rem",
              }}
            >
              {selectedDisplay}
            </p>
            <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem", marginTop: "var(--space-xs)" }}>
              We&apos;ll confirm availability and session details via email.
            </p>
            <a
              href={`/contact?date=${selectedIso}`}
              className="buttonPrimary"
              style={{
                display:   "inline-block",
                marginTop: "var(--space-lg)",
              }}
            >
              Confirm This Date
            </a>
          </div>
        )}

      </div>

      {/* Fade-in keyframe for the confirmation strip */}
      <style>{`
        @keyframes calendarConfirmFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}