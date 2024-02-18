import { redirect } from "next/navigation"
import { validateToken } from "@/actions/validate-token"

import { Card } from "@/components/ui/card"

export default async function VerificationTokenPage({
  searchParams,
}: {
  searchParams: { token: string }
}) {
  const result = await validateToken(searchParams.token)

  if (result.success) {
    redirect("/dashboard")
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
