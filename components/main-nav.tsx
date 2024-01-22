import Link from "next/link"
import { RocketIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"

export default function MainNav() {
  return (
    <>
      <nav className="flex w-full items-center justify-between p-10">
        <div className="flex items-center gap-5">
          <button className="flex items-center gap-2 text-xl font-bold text-black">
            <RocketIcon className="h-[30px] w-[30px]" />
            Readme.ai
          </button>
          <Link className="hover:text-gray-700" href="#">
            about
          </Link>
          <Link className="hover:text-gray-700" href="/Github" target="_blank">
            Github
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Link className="px-5 py-2 hover:text-gray-700" href="/login">
            Log In
          </Link>
          <Button
            className="rounded-full bg-black px-5 py-2 text-sm text-white"
            variant="outline"
            asChild
          >
            <Link href="/register">Sign Up</Link>
          </Button>
        </div>
      </nav>
    </>
  )
}
