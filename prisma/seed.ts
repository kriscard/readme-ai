const { PrismaClient } = require("@prisma/client")

const users = [
  {
    id: "123",
    name: "John doe",
    email: "johndoe@email.com",
    image: null,
    emailVerified: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "456",
    name: "Jane doe",
    email: "janedoe@email.com",
    image: null,
    emailVerified: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "789",
    name: "John Smith",
    email: "jonesmith@email.com",
    image: null,
    emailVerified: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const prisma = new PrismaClient()

const load = async () => {
  try {
    await prisma.user.deleteMany()
    console.log("Deleted users in category table")

    await prisma.$queryRaw`ALTER TABLE users AUTO_INCREMENT = 1`
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
