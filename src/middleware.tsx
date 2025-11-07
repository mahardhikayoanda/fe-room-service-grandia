import { type NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line consistent-return
export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files
  if (/\.(png|svg|jpeg|jpg|mp3|xlsx)$/.test(pathname)) {
    return NextResponse.next();
  }

  // Allow access to QR verification page without restrictions
  if (pathname === "/qr-verify") {
    return NextResponse.next();
  }

  // Check if QR is verified (this will be checked on client-side)
  // Middleware can't access sessionStorage, so we'll handle this via client-side routing

  return NextResponse.next();
};

export const config = {
  matcher: ["/qr-verify", "/((?!_next/static|_next/image|favicon.ico).*)"],
};
