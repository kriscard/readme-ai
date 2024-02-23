import Link from "next/link"
import { validateToken } from "@/actions/validate-token"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default async function VerificationTokenPage({
  searchParams,
}: {
  searchParams: { token: string }
}) {
  const result = await validateToken(searchParams.token)

  if (result.success) {
    return (
      <div className="flex items-center">
        <Card className="mx-auto h-fit w-full max-w-md overflow-hidden border-y border-gray-200 sm:rounded-2xl sm:border sm:shadow-xl">
          <div className="flex h-full items-center justify-center">
            <div className="w-fit p-8">
              <div className="mx-auto flex w-full flex-col justify-center space-y-6">
                <div className="flex flex-col space-y-2 text-center">
                  <h1 className="text-2xl font-semibold tracking-tight">
                    Email is Verified
                  </h1>
                  <div className="flex flex-col gap-1">
                    <p className="text-muted-foreground text-sm">
                      Your email has been verified and your account has been set
                      up.
                    </p>
                    <Button className="my-4 w-full">
                      <Link href="/login">You can log in</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <Card className="mx-auto h-fit w-full max-w-md overflow-hidden border-y border-gray-200 sm:rounded-2xl sm:border sm:shadow-xl">
      {result.error && (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(result.error, null, 2)}
          </code>
        </pre>
      )}
    </Card>
  )
}
