import * as React from "react"
import { Button } from "@react-email/button"
import { Html } from "@react-email/html"

interface VerifyEmailProps {
  url: string
}

export function VerifyEmail({ url }: VerifyEmailProps) {
  return (
    <Html lang="en">
      <Button href={url}>Click me</Button>
    </Html>
  )
}

export default VerifyEmail
