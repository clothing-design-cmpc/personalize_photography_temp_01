"use client";

// LensVerse — Blog Post Detail Page
// Fetches a single post from GET /api/blog/[slug] and renders the full content.

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface BlogPost {
  slug:       string;
  title:      string;
  excerpt:    string;
  content:    string;
  coverImage: string;
  category:   string;
  tags:       string[];
  readTime:   number;
  createdAt:  string;
}

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const slug   = params.slug;

  const [post, setPost]       = useState<BlogPost | null>(null);
  const [error, setError]     = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadPost() {
      try {
        const res  = await fetch(`/api/blog/${encodeURIComponent(slug)}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Post not found");
        if (isMounted) setPost(data);
      } catch (err) {
        if (isMounted) setError(err instanceof Error ? err.message : "Couldn't load this post.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadPost();
    return () => { isMounted = false; };
  }, [slug]);

  if (isLoading) {
    return (
      <section className="sectionPadding" style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "var(--color-text-muted)" }}>Loading post…</p>
      </section>
    );
  }

  if (error || !post) {
    return (
      <section className="sectionPadding" style={{ minHeight: "60vh", display: "flex", alignItems: "center" }}>
        <div className="containerNarrow" style={{ textAlign: "center", width: "100%" }}>
          <p className="eyebrow" style={{ marginBottom: "var(--space-md)" }}>Post Not Found</p>
          <p style={{ marginBottom: "var(--space-xl)" }}>{error ?? "This post doesn't exist or isn't published."}</p>
          <Link href="/blog" className="buttonSecondary">Back to Blog</Link>
        </div>
      </section>
    );
  }

  const dateLabel = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  // Split on blank lines so plain-text content renders as separate paragraphs
  const paragraphs = post.content.split(/\n\s*\n/).filter(Boolean);

  return (
    <article>
      <section className="sectionPadding" style={{ paddingBottom: 0 }}>
        <div className="containerNarrow" style={{ textAlign: "center" }}>
          <p
            style={{
              fontFamily:    "var(--font-mono)",
              fontSize:      "0.75rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color:         "var(--color-accent)",
              marginBottom:  "var(--space-md)",
            }}
          >
            {post.category} · {post.readTime} min read · {dateLabel}
          </p>
          <h1
            style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "clamp(2rem, 5vw, 3.25rem)",
              fontWeight:    800,
              letterSpacing: "-0.02em",
              marginBottom:  "var(--space-lg)",
            }}
          >
            {post.title}
          </h1>
        </div>
      </section>

      <section className="containerContent" style={{ marginTop: "var(--space-xl)" }}>
        <div style={{ position: "relative", width: "100%", paddingTop: "50%", borderRadius: "var(--border-radius-card, 12px)", overflow: "hidden" }}>
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </section>

      <section className="sectionPadding">
        <div className="containerNarrow">
          {paragraphs.map((paragraph, index) => (
            <p key={index} style={{ marginBottom: "var(--space-lg)", fontSize: "1.0625rem", lineHeight: 1.8 }}>
              {paragraph}
            </p>
          ))}

          {post.tags.length > 0 && (
            <div style={{ display: "flex", gap: "var(--space-sm)", flexWrap: "wrap", marginTop: "var(--space-xl)" }}>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding:      "0.25rem 0.75rem",
                    borderRadius: "999px",
                    background:   "var(--color-surface)",
                    border:       "1px solid var(--color-border)",
                    fontSize:     "0.8125rem",
                    color:        "var(--color-text-muted)",
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div style={{ marginTop: "var(--space-2xl)" }}>
            <Link href="/blog" className="buttonSecondary">Back to Blog</Link>
          </div>
        </div>
      </section>
    </article>
  );
}
