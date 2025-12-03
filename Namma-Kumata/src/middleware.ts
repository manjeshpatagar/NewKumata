import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define public routes that don't require authentication
const publicRoutes = ['/login', '/register', '/forgot-password'];

// Define admin routes
const adminRoutes = ['/admin', '/admin/shops', '/admin/ads', '/admin/users', '/admin/categories', '/admin/notifications', '/admin/analytics'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (publicRoutes.includes(pathname) || pathname === '/admin-login') {
    return NextResponse.next();
  }

  // For now, we'll allow all routes since auth is client-side
  // In production, you would check authentication tokens here
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
