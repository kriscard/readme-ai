import { ReactNode } from "react"
import { redirect } from "next/navigation"
import { auth } from "@/auth"

import AuthNav from "@/components/auth-nav"

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode
}) {
  const session = await auth()

  if (!session?.user) {
    redirect("/")
  }

  return (
    <div className="min-h-screen">
      <AuthNav />
      {children}
    </div>
  )
}
