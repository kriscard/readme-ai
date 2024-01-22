import Link from "next/link"

import { Button } from "@/components/ui/button"

import { Icons } from "./icons"

export default function AuthNav() {
  return (
    <>
      <nav className="flex w-full items-start justify-start p-10">
        <Button className="rounded-full px-2 text-sm" variant="ghost" asChild>
          <Link href="/">
            <div className="flex items-center gap-2 text-sm text-black">
              <Icons.chevronLeft className="h-4 w-4" />
              Home
            </div>
          </Link>
        </Button>
      </nav>
    </>
  )
}
