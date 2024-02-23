import { ReactNode } from "react"

import MainNav from "@/components/main-nav"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <MainNav />
      {children}
    </div>
  )
}
