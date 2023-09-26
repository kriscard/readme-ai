import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"

/**
 * middleware function doesn't work with nexjs 13 yet
 * We need to wait for this issue to be resolved
 * before we can use the full potential of next-auth middleware
 * I choose to use the Provider pattern for now
 **/

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req })
    const isAuth = !!token
    const isAuthPage =
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/register")

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }

      return null
    }

    if (!isAuth) {
      let from = req.nextUrl.pathname
      console.log("from", from)

      if (req.nextUrl.search) {
        from += req.nextUrl.search
      }

      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(from)}`, req.url),
      )
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if (req.nextUrl.pathname)
          if (
            req.nextUrl.pathname === "/" ||
            (req.nextUrl.pathname.startsWith("/dashboard") && token === null)
          ) {
            return false
          }
        return true
      },
    },
  },
)

export const config = {
  matcher: ["/dashboard/:path*"],
}
