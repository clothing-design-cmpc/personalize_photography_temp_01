// LensVerse — Cloudinary Config
// Provides a configured v2 client and URL transformation helpers

import { v2 as cloudinary } from "cloudinary";

// ─── Configure Cloudinary from environment ────────────────────────────────────
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure:     true,
});

export default cloudinary;

// ─── buildCloudinaryUrl ───────────────────────────────────────────────────────
// Builds an optimized Cloudinary URL for a given public ID and options
export function buildCloudinaryUrl(
  publicId: string,
  options: {
    width?:   number;
    height?:  number;
    quality?: number | "auto";
    format?:  string;
    crop?:    string;
  } = {}
): string {
  const {
    width,
    height,
    quality = "auto",
    format  = "webp",
    crop    = "fill",
  } = options;

  const transformations: string[] = [
    `q_${quality}`,
    `f_${format}`,
    ...(width  ? [`w_${width}`]         : []),
    ...(height ? [`h_${height}`]        : []),
    ...(width || height ? [`c_${crop}`] : []),
  ];

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations.join(",")}/${publicId}`;
}
