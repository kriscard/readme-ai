import "@/styles/globals.css"

import type { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"
import localFont from "next/font/local"
import { auth } from "@/auth"
import { SessionProvider } from "next-auth/react"

import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
})

export const metadata: Metadata = {
  title: "Readme.ai",
  description: "Create your Readme file in seconds",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const session = await auth()

  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen font-sans antialiased",
          fontSans.variable,
          fontHeading.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="#F1F6FC"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
