import { resend } from "@/lib/resend"

const domain = process.env.NEXT_PUBLIC_APP_URL

export async function sendVerificationEmail(email: string, token: string) {
  const confirmLink = `${domain}/verification-token?token=${token}`

  await resend.emails.send({
    from: "contact@christophercardoso.dev",
    to: email,
    subject: `Your ${process.env.NEXT_PUBLIC_APP_NAME} Login Link`,
    // TODO: Create email template for this and use react instead of html example:
    // react: LoginLink({ url, email }),
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  })
}
