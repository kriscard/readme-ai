import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const users = [
  {
    id: "124d",
    name: "admin Chris",
    email: "delivered@resend.dev",
    password: "pass123",
    image: null,
    emailVerified: null,
  },
  {
    id: "123",
    name: "John doe",
    email: "johndoe@email.com",
    password: "pass456",
    image: null,
    emailVerified: null,
  },
  {
    id: "456",
    name: "Jane doe",
    email: "janedoe@email.com",
    password: "pass789",
    image: null,
    emailVerified: null,
  },
  {
    id: "789",
    name: "John Smith",
    email: "jonesmith@email.com",
    password: "pass000",
    image: null,
    emailVerified: null,
  },
]

const load = async () => {
  try {
    await prisma.user.deleteMany()
    console.log("Deleted users in category table")

    await prisma.$queryRaw`ALTER TABLE User AUTO_INCREMENT = 1`
    console.log("reset users auto increment to 1")

    await prisma.user.createMany({
      data: users,
    })
    console.log("Added category data")
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

load()
