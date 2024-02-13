"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { validateToken } from "@/actions/validate-token"

export default function VerificationTokenPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const token = searchParams.get("token")

  useEffect(() => {
    validateToken(token).then((result) => {
      result.error ? router.push("/login") : router.push("/dashboard")
    })
  }, [token])

  return <></>
}
