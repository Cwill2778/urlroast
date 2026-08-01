import { NextResponse } from 'next/server';

export function proxy(req) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get('host') || '';

  // Handle the Roman Exchange subdomain
  const isRomanExchange = 
    hostname === 'romanexchange.cronantech.com' || 
    hostname.startsWith('romanexchange.localhost');

  if (isRomanExchange) {
    // Prevent double-rewriting if already under /romans-chat
    if (!url.pathname.startsWith('/romans-chat')) {
      // Rewrite the URL to point to the /romans-chat folder internally
      url.pathname = `/romans-chat${url.pathname === '/' ? '' : url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  // Allow standard routing to proceed
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
     * - public files (images, fonts, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
