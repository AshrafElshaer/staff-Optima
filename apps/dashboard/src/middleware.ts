import { updateSession } from "@v1/supabase/middleware";

import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const { response, user } = await updateSession(
    request,
    NextResponse.next({
      headers: {
        ...request.headers,
        "x-pathname": pathname,
      },
    }),
  );

  if (
    !request.nextUrl.pathname.endsWith("/login") &&
    !request.nextUrl.pathname.endsWith("/components") &&
    !user
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|api|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
