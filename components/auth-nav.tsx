"use client"

import Link from "next/link"
import { logout } from "@/actions/logout"
import { RocketIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"

export default function AuthNav() {
  return (
    <>
      <nav className="flex w-full items-center justify-between p-10">
        <div className="flex items-center gap-5">
          <button className="flex items-center gap-2 text-xl font-bold text-black">
            <RocketIcon className="size-[30px]" />
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
          <Button
            className="rounded-full bg-black px-5 py-2 text-sm text-white"
            variant="outline"
            asChild
            onClick={() => {
              logout()
            }}
          >
            <p>Log out</p>
          </Button>
        </div>
      </nav>
    </>
  )
}
