import { updateSession } from '@/utils/supabase/middleware'
import { NextResponse } from 'next/server'

export async function middleware(request) {
  // Update session first
  const response = await updateSession(request)

  const { pathname } = request.nextUrl

  // Redirect old /dashboard to new /portal/dashboard
  if (pathname === '/dashboard') {
    return NextResponse.redirect(new URL('/portal/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/dashboard',
    '/portal/:path*',
    '/login',
  ],
}
