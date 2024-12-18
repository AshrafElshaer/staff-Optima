import type { NextRequest } from "next/server";

import { updateSession } from "@/lib/supabase/middleware";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(
    request,
    NextResponse.next({
      request: request,
      headers: {
        ...request.headers,
        "x-pathname": request.nextUrl.pathname,
      },
    }),
  );

  if (request.nextUrl.pathname.startsWith("/jobs")) {
    return response;
  }

  if (!request.nextUrl.pathname.endsWith("/auth") && !user) {
    return NextResponse.redirect(
      new URL(`/auth?redirect_url=${request.nextUrl.pathname}`, request.url),
    );
  }

  response.headers.set("x-user-id", user?.id ?? "");
  response.headers.set(
    "x-organization-id",
    user?.user_metadata.organization_id ?? "",
  );
  response.headers.set("x-access-role", user?.user_metadata.access_role ?? "");
  return response;
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
