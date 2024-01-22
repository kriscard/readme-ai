import { ReactNode } from "react"

import MainNav from "@/components/main-nav"

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <MainNav />
      {children}
    </div>
  )
}
