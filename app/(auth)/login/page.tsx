import { Suspense } from "react"
import { Metadata } from "next"
import Link from "next/link"

import { Card } from "@/components/ui/card"
import { LoginForm } from "@/components/auth/login/login-form"
import { Icons } from "@/components/icons"

export const metadata: Metadata = {
  title: "Readme-ai - Log in",
  description: "User log in page",
}

export default function UserLoginPage() {
  return (
    <div className="flex items-center">
      <Card className="mx-auto h-fit w-full max-w-md overflow-hidden border-y border-gray-200 sm:rounded-2xl sm:border sm:shadow-xl">
        <div className="flex h-full items-center justify-center">
          <div className="w-fit p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Log in
                </h1>
                <p className="text-muted-foreground text-sm">
                  Enter your email below to login
                </p>
              </div>
              {/* TODO: Find a better fallback */}
              <Suspense
                fallback={
                  <Icons.spinner className="mr-2 size-4 animate-spin" />
                }
              >
                <LoginForm />
              </Suspense>
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
