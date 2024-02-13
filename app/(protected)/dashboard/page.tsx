import { auth } from "@/auth"

export default async function Dashboard() {
  const session = await auth()

  console.log("session", session)

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-heading text-2xl md:text-xl">Readme.ai</h1>
      <p className="font-sans text-lg md:text-sm">
        Create your Readme file in seconds
      </p>
      <pre>{JSON.stringify(session)}</pre>
    </div>
  )
}
