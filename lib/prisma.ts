// LensVerse — Prisma Client Singleton
// Prevents multiple PrismaClient instances during Next.js hot reloads in dev

import { PrismaClient } from "@prisma/client";

// Store the instance on the global object in development to survive hot reloads
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development"
      ? ["query", "error", "warn"]
      : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
