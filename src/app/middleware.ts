import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"
import { useSession } from "next-auth/react"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  const {data:session} = useSession()
console.log("tokkkkken", token)
  const userRole = session?.user?.role;
  // Check if the user is authenticated
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Routes that require recruiter role
  const recruiterRoutes = ["/recruiter", "/companies/jobs/new", "/companies/edit"]

  // Routes that require candidate role
  const candidateRoutes = ["/candidate", "/applications"]

  const path = request.nextUrl.pathname

  if (recruiterRoutes.some((route) => path.startsWith(route))) {
    if (userRole !== "recruiter") {
      return NextResponse.redirect(new URL("/unauthorized", request.url))
    }
  }

  if (candidateRoutes.some((route) => path.startsWith(route))) {
    if (userRole !== "user") {
      return NextResponse.redirect(new URL("/unauthorized", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/recruiter/:path*",
    "/jobs/new",
    "/companies/jobs/new",
    "/companies/edit/:path*",
    "/candidate/:path*",
    "/applications/:path*",
  ],
}

