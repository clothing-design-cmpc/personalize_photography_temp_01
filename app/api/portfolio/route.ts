// LensVerse — GET /api/portfolio
// Returns published portfolio items, optionally filtered by featured/category

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const featured = searchParams.get("featured");
    const category = searchParams.get("category");
    const limit    = parseInt(searchParams.get("limit") ?? "50", 10);

    const items = await prisma.portfolio.findMany({
      where: {
        isPublished: true,
        ...(featured === "true" ? { isFeatured: true } : {}),
        ...(category ? { category } : {}),
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error("GET /api/portfolio error:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolio items" },
      { status: 500 }
    );
  }
}
