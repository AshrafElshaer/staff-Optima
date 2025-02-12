import type { NextRequest } from "next/server";

import { updateSession } from "@/lib/supabase/middleware";
import { NextResponse } from "next/server";
import { redis } from "./lib/redis";

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
  // Only check if user exists and has an organization ID
  if (!user?.user_metadata.organization_id) {
    return NextResponse.redirect(new URL("/waitlist", request.url));
  }

  // Cache the allowed status in memory for 5 minutes
  const cacheKey = `allowed_org:${user.user_metadata.organization_id}`;
  const cachedStatus = await redis.get(cacheKey);

  if (cachedStatus === null) {
    const isAllowed = await redis.sismember(
      "allowed_organizations", 
      user.user_metadata.organization_id
    );
    
    // Cache the result for 5 minutes
    await redis.set(cacheKey, isAllowed ? "1" : "0", { ex: 300 });
    
    if (!isAllowed) {
      return NextResponse.redirect(new URL("/waitlist", request.url));
    }
  } else if (cachedStatus === "0") {
    return NextResponse.redirect(new URL("/waitlist", request.url));
  }

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
