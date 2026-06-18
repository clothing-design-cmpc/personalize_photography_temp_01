// LensVerse — POST /api/galleries/[token]
// Looks up a ClientGallery by its access token, checks expiry, and verifies the
// password if the gallery owner protected it. Returns the gallery's images on
// success. Used by app/galleries/[token]/page.tsx.

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { clientGalleryAccessSchema } from "@/lib/validations";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    const body = await request.json().catch(() => ({}));
    const { password } = clientGalleryAccessSchema.parse(body);

    const gallery = await prisma.clientGallery.findUnique({ where: { token } });

    if (!gallery) {
      return NextResponse.json(
        { error: "We couldn't find a gallery with that link. Double-check it and try again." },
        { status: 404 }
      );
    }

    if (gallery.expiresAt && gallery.expiresAt < new Date()) {
      return NextResponse.json(
        { error: "This gallery link has expired. Reach out and we'll send you a new one." },
        { status: 410 }
      );
    }

    if (gallery.password) {
      if (!password) {
        return NextResponse.json(
          { requiresPassword: true, error: "This gallery is password protected." },
          { status: 401 }
        );
      }
      if (password !== gallery.password) {
        return NextResponse.json(
          { requiresPassword: true, error: "That password isn't right. Please try again." },
          { status: 401 }
        );
      }
    }

    return NextResponse.json({
      clientName: gallery.clientName,
      shootDate:  gallery.shootDate,
      images:     gallery.images,
    });
  } catch (error) {
    console.error("POST /api/galleries/[token] error:", error);
    return NextResponse.json(
      { error: "Something went wrong loading this gallery. Please try again." },
      { status: 500 }
    );
  }
}
