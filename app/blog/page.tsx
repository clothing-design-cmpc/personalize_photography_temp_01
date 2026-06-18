"use client";

// LensVerse — Blog Index Page
// Fetches published posts from GET /api/blog and renders them as cards
// linking to the full post at /blog/[slug].

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PortfolioCardSkeleton } from "@/components/ui/LoadingSkeleton";

interface BlogPost {
  id:         string;
  slug:       string;
  title:      string;
  excerpt:    string;
  coverImage: string;
  category:   string;
  readTime:   number;
  createdAt:  string;
}

export default function BlogPage() {
  const [posts, setPosts]       = useState<BlogPost[] | null>(null);
  const [error, setError]       = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadPosts() {
      try {
        const res  = await fetch("/api/blog?limit=12");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Failed to load posts");
        if (isMounted) setPosts(data.posts);
      } catch {
        if (isMounted) setError("Couldn't load blog posts right now. Please try again later.");
      }
    }

    loadPosts();
    return () => { isMounted = false; };
  }, []);

  return (
    <section className="sectionPadding">
      <div className="containerContent">
        <div style={{ textAlign: "center", marginBottom: "var(--space-2xl)" }}>
          <p className="eyebrow" style={{ marginBottom: "var(--space-md)" }}>From The Field</p>
          <h1
            style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "clamp(2.25rem, 5vw, 3.5rem)",
              fontWeight:    800,
              letterSpacing: "-0.02em",
              marginBottom:  "var(--space-lg)",
            }}
          >
            Blog
          </h1>
          <p style={{ maxWidth: "52ch", margin: "0 auto" }}>
            Notes on shoots, gear, and the craft of photography.
          </p>
        </div>

        {error && (
          <p style={{ textAlign: "center", color: "var(--color-error)" }}>{error}</p>
        )}

        {!posts && !error && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "var(--space-lg)" }}>
            {Array.from({ length: 6 }).map((_, i) => <PortfolioCardSkeleton key={i} />)}
          </div>
        )}

        {posts && posts.length === 0 && (
          <p style={{ textAlign: "center", color: "var(--color-text-muted)" }}>
            No posts published yet — check back soon.
          </p>
        )}

        {posts && posts.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "var(--space-lg)" }}>
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="glassCard"
                style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}
              >
                <div style={{ position: "relative", width: "100%", paddingTop: "62%" }}>
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width:767px) 100vw, (max-width:1023px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div style={{ padding: "var(--space-lg)", display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
                  <p
                    style={{
                      fontFamily:    "var(--font-mono)",
                      fontSize:      "0.75rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color:         "var(--color-accent)",
                    }}
                  >
                    {post.category} · {post.readTime} min read
                  </p>
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize:   "1.25rem",
                      fontWeight: 700,
                    }}
                  >
                    {post.title}
                  </h2>
                  <p style={{ color: "var(--color-text-muted)", fontSize: "0.9375rem" }}>
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
