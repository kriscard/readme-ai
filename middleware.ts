import NextAuth from "next-auth"

import { authConfig } from "./auth.config"

export default NextAuth(authConfig).auth

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  // matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}

// import { NextResponse } from "next/server"
// import { authConfig } from "@/auth.config"
// import {
//   apiAuthPrefix,
//   authRoutes,
//   DEFAULT_LOGIN_REDIRECT,
//   publicRoutes,
// } from "@/routes"
// import NextAuth from "next-auth"

// const { auth } = NextAuth(authConfig)

// export default auth((req) => {
//   const { nextUrl } = req
//   console.log("REQ", req)
//   const isLoggedIn = !!req.auth
//
//   const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
//   const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
//   const isAuthRoute = authRoutes.includes(nextUrl.pathname)
//
//   if (isApiAuthRoute) {
//     return NextResponse.next()
//   }
//
//   if (isAuthRoute) {
//     if (isLoggedIn) {
//       return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
//     }
//     return NextResponse.next()
//   }
//
//   if (!isLoggedIn && !isPublicRoute) {
//     let callbackUrl = nextUrl.pathname
//     if (nextUrl.search) {
//       callbackUrl += nextUrl.search
//     }
//
//     const encodedCallbackUrl = encodeURIComponent(callbackUrl)
//
//     return Response.redirect(
//       new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl),
//     )
//   }
//
//   return NextResponse.next()
// })

// Optionally, don't invoke Middleware on some paths
// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// }
