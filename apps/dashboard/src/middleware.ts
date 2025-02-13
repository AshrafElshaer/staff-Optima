import type { NextRequest } from "next/server";

import { updateSession } from "@/lib/supabase/middleware";
import { NextResponse } from "next/server";
import { redis } from "./lib/redis";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (isPublicRoute(pathname)) {
    return NextResponse.next({
      request: request,
      headers: {
        ...request.headers,
        "x-pathname": pathname,
      },
    });
  }

  const { response, user } = await updateSession(
    request,
    NextResponse.next({
      request: request,
      headers: {
        ...request.headers,
        "x-pathname": pathname,
      },
    }),
  );
  if (!request.nextUrl.pathname.endsWith("/auth") && !user) {
    return NextResponse.redirect(
      new URL(`/auth?redirect_url=${request.nextUrl.pathname}`, request.url),
    );
  }

  // Only check if user exists and has an organization ID
  const isAllowedOrganization = await redis.sismember(
    "allowed_organizations",
    user?.user_metadata.organization_id ?? "",
  );

  if (!isAllowedOrganization) {
    return NextResponse.redirect(new URL("/waitlist", request.url));
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

const PUBLIC_ROUTES = ["/auth", "/waitlist", "/onboarding"];

function isPublicRoute(pathname: string) {
  return PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
}
