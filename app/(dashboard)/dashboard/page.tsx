import prisma from "@/lib/db"

export default async function Dashboard() {
  const users = await prisma.user.findMany()

  console.log("users", users)

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-heading text-2xl md:text-xl">Readme.ai</h1>
      <p className="font-sans text-lg md:text-sm">
        Create your Readme file in seconds
      </p>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}
