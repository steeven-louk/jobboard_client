import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"


export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

  const recruiterRoutes = ["/recruiter/*", "/companies/jobs/new", "/companies/edit"]

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  } else{
    if (recruiterRoutes.includes(request.nextUrl.pathname) && token.role !== "RECRUITER") {
        return NextResponse.redirect(new URL("/", request.url))
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
    "/profil/",
    "/bookmark/:path*",
  ],
}

