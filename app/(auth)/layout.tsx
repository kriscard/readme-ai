import { ReactNode } from "react"

import AuthNav from "@/components/auth-nav"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <AuthNav />
      {children}
    </div>
  )
}
