import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Create a profile for new users
  if (session?.user && req.nextUrl.pathname === "/auth/callback") {
    await supabase.from("profiles").upsert({
      id: session.user.id,
      username: null,
      full_name: null,
      avatar_url: null,
      website: null,
      is_admin: false,
      updated_at: new Date().toISOString(),
    })
  }

  return res
}

export const config = {
  matcher: ["/auth/callback"],
}
