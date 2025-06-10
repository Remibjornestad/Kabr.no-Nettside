import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dtuhdljrhszbxonsttrn.supabase.co"
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0dWhkbGpyaHN6YnhvbnN0dHJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxMzI1MDMsImV4cCI6MjA2NDcwODUwM30.4WpZKUdDcpeE_L0jpEVJKGvMx541LglutsMRxCDeiSw"

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        request.cookies.set({
          name,
          value,
          ...options,
        })
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        })
        response.cookies.set({
          name,
          value,
          ...options,
        })
      },
      remove(name: string, options: any) {
        request.cookies.set({
          name,
          value: "",
          ...options,
        })
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        })
        response.cookies.set({
          name,
          value: "",
          ...options,
        })
      },
    },
  })

  // Only protect CMS routes, not the login page
  if (request.nextUrl.pathname.startsWith("/cms") && !request.nextUrl.pathname.startsWith("/cms/login")) {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.redirect(new URL("/cms/login", request.url))
    }

    // Check if user is admin
    const allowedEmails = (process.env.CMS_ALLOWED_EMAILS || "remi@prosjektai.no").split(",")
    if (!allowedEmails.includes(user.email || "")) {
      return NextResponse.redirect(new URL("/cms/unauthorized", request.url))
    }
  }

  return response
}

export const config = {
  matcher: ["/cms/:path*"],
}
