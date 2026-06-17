"use client";

// LensVerse — PortfolioGrid
// Category filter tabs + masonry-style photo grid.
// Images via Unsplash CDN — swap with real photos later.

import { useState } from "react";
import styles from "./portfolio.module.css";

// ── Types ─────────────────────────────────────────────────────────────────────
type Category = "All" | "Weddings" | "Portraits" | "Travel" | "Commercial" | "Food" | "Animals" | "Sports";

interface Photo {
  id:       string;
  src:      string;
  alt:      string;
  category: Exclude<Category, "All">;
  span?:    "tall" | "wide" | "normal";
}

// ── Category descriptions ─────────────────────────────────────────────────────
const CATEGORY_INFO: Record<Exclude<Category, "All">, { heading: string; body: string }> = {
  Weddings: {
    heading: "Weddings",
    body: "Every wedding is a story of two people choosing each other. I capture those quiet in-between moments — the nervous laugh before the walk down the aisle, the first exhale after the vows. Not the poses, but the real thing.",
  },
  Portraits: {
    heading: "Portraits",
    body: "A good portrait doesn't just show what someone looks like — it shows who they are when they stop performing. I work slowly, talk a lot, and wait for the mask to slip. That's when the real shot happens.",
  },
  Travel: {
    heading: "Travel",
    body: "I travel light and shoot without a plan. The best travel photos come from getting lost, slowing down, and paying attention to what most people walk past. Every place has a light that belongs only to it.",
  },
  Commercial: {
    heading: "Commercial",
    body: "Brand photography is about telling a story that sells without feeling like a sales pitch. I work with businesses to find their visual voice — something that feels authentic, not just polished.",
  },
  Food: {
    heading: "Food",
    body: "Food photography is about appetite — making someone want to reach through the screen. I shoot close, use natural light whenever possible, and style for feeling over perfection. Every dish has a mood.",
  },
  Animals: {
    heading: "Animals",
    body: "Animals don't perform for cameras, which makes them the most honest subjects I shoot. Whether it's a pet portrait or wildlife in the field, patience is everything. You wait, you watch, and you're ready when the moment comes.",
  },
  Sports: {
    heading: "Sports",
    body: "Sports photography is about reading what's about to happen before it does. The peak of tension, the instant of impact, the emotion that follows. I shoot with fast glass and stay out of the way — the athletes do the work.",
  },
};

// ── Photo data (Unsplash CDN) ─────────────────────────────────────────────────
const PHOTOS: Photo[] = [
  // Weddings
  { id: "w1", category: "Weddings",   span: "tall",   alt: "Bride in golden light",            src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80" },
  { id: "w2", category: "Weddings",   span: "normal", alt: "Couple walking on beach",           src: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=80" },
  { id: "w3", category: "Weddings",   span: "wide",   alt: "Wedding ceremony aisle",            src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80" },
  { id: "w4", category: "Weddings",   span: "normal", alt: "First dance moment",                src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80" },
  { id: "w5", category: "Weddings",   span: "normal", alt: "Wedding rings detail",              src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80" },
  { id: "w6", category: "Weddings",   span: "tall",   alt: "Bride portrait window light",       src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80" },

  // Portraits
  { id: "p1", category: "Portraits",  span: "tall",   alt: "Studio portrait dramatic light",    src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80" },
  { id: "p2", category: "Portraits",  span: "normal", alt: "Natural light portrait",            src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80" },
  { id: "p3", category: "Portraits",  span: "wide",   alt: "Outdoor golden hour portrait",      src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80" },
  { id: "p4", category: "Portraits",  span: "normal", alt: "Candid street portrait",            src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80" },
  { id: "p5", category: "Portraits",  span: "normal", alt: "Child portrait soft light",         src: "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?w=800&q=80" },
  { id: "p6", category: "Portraits",  span: "tall",   alt: "Black and white portrait",          src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80" },

  // Travel
  { id: "t1", category: "Travel",     span: "wide",   alt: "Mountain landscape sunrise",        src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80" },
  { id: "t2", category: "Travel",     span: "normal", alt: "Street market Asia",                src: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80" },
  { id: "t3", category: "Travel",     span: "tall",   alt: "Desert dunes aerial",               src: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80" },
  { id: "t4", category: "Travel",     span: "normal", alt: "Venice canal at dusk",              src: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80" },
  { id: "t5", category: "Travel",     span: "normal", alt: "Japan temple cherry blossom",       src: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80" },
  { id: "t6", category: "Travel",     span: "wide",   alt: "Ocean coastline drone",             src: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80" },

  // Commercial
  { id: "c1", category: "Commercial", span: "wide",   alt: "Product flat lay minimal",          src: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80" },
  { id: "c2", category: "Commercial", span: "normal", alt: "Brand lifestyle shoot",             src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80" },
  { id: "c3", category: "Commercial", span: "tall",   alt: "Fashion editorial",                 src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" },
  { id: "c4", category: "Commercial", span: "normal", alt: "Food photography overhead",         src: "https://images.unsplash.com/photo-1546039907-7e4ce4d47ef6?w=800&q=80" },
  { id: "c5", category: "Commercial", span: "normal", alt: "Architecture interior",             src: "https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=800&q=80" },
  { id: "c6", category: "Commercial", span: "wide",   alt: "Corporate headshot series",         src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80" },

  // Food
  { id: "f1", category: "Food",       span: "wide",   alt: "Pasta overhead natural light",      src: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&q=80" },
  { id: "f2", category: "Food",       span: "tall",   alt: "Coffee latte art close-up",         src: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80" },
  { id: "f3", category: "Food",       span: "normal", alt: "Fresh sushi plating",               src: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=800&q=80" },
  { id: "f4", category: "Food",       span: "normal", alt: "Artisan bread bakery",              src: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80" },
  { id: "f5", category: "Food",       span: "normal", alt: "Dessert chocolate drizzle",         src: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80" },
  { id: "f6", category: "Food",       span: "wide",   alt: "Farmers market produce",            src: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80" },

  // Animals
  { id: "a1", category: "Animals",    span: "wide",   alt: "Lion portrait golden light",        src: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800&q=80" },
  { id: "a2", category: "Animals",    span: "tall",   alt: "Dog portrait bokeh background",     src: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80" },
  { id: "a3", category: "Animals",    span: "normal", alt: "Eagle in flight",                   src: "https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=800&q=80" },
  { id: "a4", category: "Animals",    span: "normal", alt: "Horse in misty field",              src: "https://images.unsplash.com/photo-1534773728080-33d31da27ae5?w=800&q=80" },
  { id: "a5", category: "Animals",    span: "normal", alt: "Cat close-up sharp eyes",           src: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80" },
  { id: "a6", category: "Animals",    span: "wide",   alt: "Elephant herd savanna",             src: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=800&q=80" },

  // Sports
  { id: "s1", category: "Sports",     span: "wide",   alt: "Basketball player mid-air",         src: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80" },
  { id: "s2", category: "Sports",     span: "tall",   alt: "Surfer barrel wave",                src: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&q=80" },
  { id: "s3", category: "Sports",     span: "normal", alt: "Sprinter exploding from blocks",    src: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80" },
  { id: "s4", category: "Sports",     span: "normal", alt: "Soccer match aerial view",          src: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80" },
  { id: "s5", category: "Sports",     span: "normal", alt: "Boxer training heavy bag",          src: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&q=80" },
  { id: "s6", category: "Sports",     span: "wide",   alt: "Cyclist mountain descent",          src: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&q=80" },
];

const CATEGORIES: Category[] = ["All", "Weddings", "Portraits", "Travel", "Commercial", "Food", "Animals", "Sports"];

// ── Component ─────────────────────────────────────────────────────────────────
export default function PortfolioGrid() {
  const [active, setActive]     = useState<Category>("All");
  const [lightbox, setLightbox] = useState<Photo | null>(null);

  const filtered = active === "All" ? PHOTOS : PHOTOS.filter(p => p.category === active);
  const info     = active !== "All" ? CATEGORY_INFO[active] : null;

  return (
    <main className={styles.portfolioPage}>
      {/* Header */}
      <div className={styles.header}>
        <p className="eyebrow">Portfolio</p>
        <h1 className={styles.heading}>The Work</h1>
        <p className={styles.subheading}>
          A curated selection across weddings, portraits, travel, commercial, food, animals, and sports.
        </p>
      </div>

      {/* Filter tabs */}
      <div className={styles.filters}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`${styles.filterBtn} ${active === cat ? styles.filterBtnActive : ""}`}
          >
            {cat}
            {cat !== "All" && (
              <span className={styles.filterCount}>
                {PHOTOS.filter(p => p.category === cat).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Category description — shown when a specific category is active */}
      {info && (
        <div className={styles.categoryInfo}>
          <h2 className={styles.categoryHeading}>{info.heading}</h2>
          <p className={styles.categoryBody}>{info.body}</p>
        </div>
      )}

      {/* Photo grid */}
      <div className={styles.grid}>
        {filtered.map((photo, i) => (
          <button
            key={photo.id}
            className={`${styles.gridItem} ${styles[photo.span ?? "normal"]}`}
            onClick={() => setLightbox(photo)}
            style={{ animationDelay: `${i * 0.04}s` }}
            aria-label={`View ${photo.alt}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.alt}
              className={styles.gridImg}
              loading="lazy"
            />
            <div className={styles.gridOverlay}>
              <span className={styles.gridCategory}>{photo.category}</span>
              <span className={styles.gridAlt}>{photo.alt}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className={styles.lightboxBackdrop}
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal
          aria-label={lightbox.alt}
        >
          <button
            className={styles.lightboxClose}
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            ✕
          </button>
          <div className={styles.lightboxInner} onClick={e => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightbox.src.replace("w=800", "w=1400")}
              alt={lightbox.alt}
              className={styles.lightboxImg}
            />
            <div className={styles.lightboxMeta}>
              <span className={styles.filterCount}>{lightbox.category}</span>
              <p className={styles.lightboxAlt}>{lightbox.alt}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
