import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import NextAuth, { NextAuthConfig } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import GithubProvider from "next-auth/providers/github"

import { resend } from "@/lib/resend"
import { VerifyEmail } from "@/components/verify-email"

const prisma = new PrismaClient()

const authConfig = {
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
        resend.emails.send({
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
      let dbUser = null

      if (token?.email) {
        dbUser = await prisma.user.findFirst({
          where: {
            email: token.email,
          },
        })
      }

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
      let userExist = null

      if (user?.email) {
        userExist = await prisma.user.findFirst({
          where: {
            email: user.email, //the user object has an email property, which contains the email the user entered.
          },
        })
      }
      return userExist ? true : false
    },
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
