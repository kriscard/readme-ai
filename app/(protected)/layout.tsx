import { ReactNode } from "react"

import AuthNav from "@/components/auth-nav"

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen">
      <AuthNav />
      {children}
    </div>
  )
}
