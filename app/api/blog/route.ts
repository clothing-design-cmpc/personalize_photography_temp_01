// LensVerse — GET /api/blog
// Returns published blog posts, optionally filtered by category/tag, paginated.

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { blogQuerySchema } from "@/lib/validations";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const { category, tag, page, limit } = blogQuerySchema.parse({
      category: searchParams.get("category") ?? undefined,
      tag:      searchParams.get("tag") ?? undefined,
      page:     searchParams.get("page") ?? undefined,
      limit:    searchParams.get("limit") ?? undefined,
    });

    const pageSize    = limit ?? 9;
    const currentPage = page ?? 1;

    const where = {
      isPublished: true,
      ...(category ? { category } : {}),
      ...(tag ? { tags: { has: tag } } : {}),
    };

    const [posts, total] = await Promise.all([
      prisma.blog.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip:    (currentPage - 1) * pageSize,
        take:    pageSize,
      }),
      prisma.blog.count({ where }),
    ]);

    return NextResponse.json({
      posts,
      total,
      page:       currentPage,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    console.error("GET /api/blog error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}
