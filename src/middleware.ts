import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export { default } from "next-auth/middleware"; // this makes the pages secure with auth, following are the paths that are the secured with auth.
import { getToken } from "next-auth/jwt";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  if (
    token &&
    (url.pathname.startsWith("/sign-in") ||
      url.pathname.startsWith("/sign-up") ||
      url.pathname.startsWith("/") ||
      url.pathname.startsWith("/verify"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if(!token && url.pathname.startsWith("/dashboard") ){
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  // applies middleware to this path
  matcher: ["/sign-in", "/sign-up", "/", "/dashboard/:path*", "/verify"],
};
