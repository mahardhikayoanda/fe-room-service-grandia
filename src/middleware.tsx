import { type NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line consistent-return
export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  //   const token = request.cookies.get("token")?.value;

  if (/\.(png|svg|jpeg|jpg|mp3|xlsx)$/.test(pathname)) {
    return NextResponse.next();
  }

  //   if (token && (pathname === "/login" || pathname === "/register")) {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }

  // if (
  //   pathname.startsWith("/profile") &&
  //   !pathname.startsWith("/profile/your-order") &&
  //   !token
  // ) {
  //   return NextResponse.redirect(
  //     new URL(`/login?fallback=${pathname}`, request.url)
  //   );
  // }

  // if (
  //   !token &&
  //   pathname.startsWith("/profile") &&
  //   !pathname.startsWith("/profile/your-order") &&
  //   pathname !== "/login" &&
  //   pathname !== "/register"
  // ) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  return NextResponse.next();
};

export const config = {
  matcher: ["/login", "/((?!_next/static|_next/image|favicon.ico).*)"],
};
