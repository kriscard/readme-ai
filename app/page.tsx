import prisma from "@/lib/db"

export default async function Home() {
  const users = await prisma.user.findMany()

  console.log("users", users)

  return (
    <div className="flex items-center justify-center flex-col">
      <h1 className="font-heading text-2xl md:text-xl">Readme.ai</h1>
      <p className="font-sans text-lg md:text-sm">
        Create your Readme file in seconds
      </p>
      <ul>
        {users.map((user) => (
          <li>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}
