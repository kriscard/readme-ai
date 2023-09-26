import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

import { resend } from "@/lib/resend"
import { VerifyEmail } from "@/components/verify-email"

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: ({ identifier: email, url }) => {
        resend.sendEmail({
          from: process.env.EMAIL_FROM as string,
          to: email,
          subject: "Sign in to your account",
          react: VerifyEmail({ url }),
        })
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        // ADD user Id to session
        session.user.name = token.name
        session.user.image = token.picture
        session.user.email = token.email
      }

      return session
    },
    async jwt({ token, user }) {
      const dbUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      }
    },
    async signIn({ user }) {
      const userExists = await prisma.user.findFirst({
        where: {
          email: user.email, //the user object has an email property, which contains the email the user entered.
        },
      })
      if (userExists) {
        return true //if the email exists in the User collection, email them a magic login link
      } else {
        return "/register"
      }
    },
  },
}

export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
