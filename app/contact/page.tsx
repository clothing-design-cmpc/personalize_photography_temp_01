"use client";

// LensVerse — Contact Page
// A real contact form (name, email, phone, subject, message) that submits to
// POST /api/contact, which saves it as a Message and emails a notification.

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";

export default function ContactPage() {
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  async function onSubmit(data: ContactFormData) {
    setSubmitState("idle");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setErrorMessage(body.error ?? "Couldn't send your message. Please try again.");
        setSubmitState("error");
        return;
      }

      reset();
      setSubmitState("success");
    } catch {
      setErrorMessage("Couldn't reach the server. Check your connection and try again.");
      setSubmitState("error");
    }
  }

  const inputStyle: React.CSSProperties = {
    padding:      "0.75rem 1rem",
    borderRadius: "var(--border-radius-btn, 8px)",
    border:       "1px solid var(--color-border)",
    background:   "var(--color-surface)",
    color:        "var(--color-text)",
    fontSize:     "1rem",
    width:        "100%",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "0.875rem",
    color:    "var(--color-text-muted)",
    marginBottom: "var(--space-xs)",
    display: "block",
  };

  const fieldErrorStyle: React.CSSProperties = {
    color: "var(--color-error)",
    fontSize: "0.8125rem",
    marginTop: "var(--space-xs)",
  };

  return (
    <section className="sectionPadding">
      <div className="containerNarrow">
        <div style={{ textAlign: "center", marginBottom: "var(--space-2xl)" }}>
          <p className="eyebrow" style={{ marginBottom: "var(--space-md)" }}>Get In Touch</p>
          <h1
            style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "clamp(2.25rem, 5vw, 3.5rem)",
              fontWeight:    800,
              letterSpacing: "-0.02em",
              marginBottom:  "var(--space-lg)",
            }}
          >
            Let&apos;s Talk
          </h1>
          <p style={{ maxWidth: "52ch", margin: "0 auto" }}>
            Questions about a session, a quote, or just want to say hi —
            send a message and I&apos;ll get back to you within a day or two.
          </p>
        </div>

        {submitState === "success" ? (
          <div className="glassCard" style={{ padding: "var(--space-2xl)", textAlign: "center" }}>
            <p style={{ fontSize: "1.0625rem", marginBottom: "var(--space-md)" }}>
              Got it — thanks for reaching out!
            </p>
            <p style={{ color: "var(--color-text-muted)" }}>
              I&apos;ll reply to your email as soon as I can.
            </p>
            <button
              type="button"
              className="buttonSecondary"
              style={{ marginTop: "var(--space-xl)" }}
              onClick={() => setSubmitState("idle")}
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="glassCard"
            style={{
              padding:       "var(--space-2xl)",
              display:       "flex",
              flexDirection: "column",
              gap:           "var(--space-lg)",
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-lg)" }}>
              <div>
                <label htmlFor="name" style={labelStyle}>Name</label>
                <input id="name" type="text" style={inputStyle} {...register("name")} />
                {errors.name && <p style={fieldErrorStyle}>{errors.name.message}</p>}
              </div>
              <div>
                <label htmlFor="email" style={labelStyle}>Email</label>
                <input id="email" type="email" style={inputStyle} {...register("email")} />
                {errors.email && <p style={fieldErrorStyle}>{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="phone" style={labelStyle}>Phone (optional)</label>
              <input id="phone" type="tel" style={inputStyle} {...register("phone")} />
              {errors.phone && <p style={fieldErrorStyle}>{errors.phone.message}</p>}
            </div>

            <div>
              <label htmlFor="subject" style={labelStyle}>Subject</label>
              <input id="subject" type="text" style={inputStyle} {...register("subject")} />
              {errors.subject && <p style={fieldErrorStyle}>{errors.subject.message}</p>}
            </div>

            <div>
              <label htmlFor="message" style={labelStyle}>Message</label>
              <textarea id="message" rows={6} style={{ ...inputStyle, resize: "vertical" }} {...register("message")} />
              {errors.message && <p style={fieldErrorStyle}>{errors.message.message}</p>}
            </div>

            {submitState === "error" && (
              <p style={fieldErrorStyle}>{errorMessage}</p>
            )}

            <button type="submit" className="buttonPrimary" disabled={isSubmitting} style={{ width: "100%" }}>
              {isSubmitting ? "Sending…" : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
