import { Metadata } from "next"
import Link from "next/link"

import { Card } from "@/components/ui/card"
import { UserAuthForm } from "@/components/user-auth-form"

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default function UserLoginPage() {
  return (
    <div className="flex h-screen items-center">
      <Card className="mx-auto h-fit w-full max-w-md overflow-hidden border-y border-gray-200 sm:rounded-2xl sm:border sm:shadow-xl">
        <div className="flex h-full items-center justify-center">
          <div className="w-fit p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Log in (Need update)
                </h1>
                <p className="text-muted-foreground text-sm">
                  Enter your email below to create your account
                </p>
              </div>
              <UserAuthForm />
              <p className="text-muted-foreground px-8 text-center text-sm">
                By clicking continue, you agree to our{" "}
                <Link
                  href="/terms"
                  className="hover:text-primary underline underline-offset-4"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="hover:text-primary underline underline-offset-4"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
