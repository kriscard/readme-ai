import { authConfig } from "@/auth.config"
import { getUserByEmail } from "@/data/user"
import { PrismaAdapter } from "@auth/prisma-adapter"
import bcrypt from "bcrypt"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"

import { db } from "@/lib/db"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          console.log("HIIIII")
          const { email, password } = parsedCredentials.data
          console.log({ password })
          const user = await getUserByEmail(email)
          console.log({ user })
          if (!user) return null
          const passwordsMatch = await bcrypt.compare(
            password,
            user.password as string,
          )
          console.log({ passwordsMatch })
          if (passwordsMatch) return user
        }

        return null
      },
    }),
  ],
})
