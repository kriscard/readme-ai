import { PrismaClient } from "@prisma/client"

const cachedPrisma = () => {
  return new PrismaClient()
}

type CachedPrismaClient = ReturnType<typeof cachedPrisma>

const globalForPrisma = globalThis as unknown as {
  prisma: CachedPrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? cachedPrisma()

export default prisma

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
