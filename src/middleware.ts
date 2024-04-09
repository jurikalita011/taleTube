import { Session, getSession } from "@auth0/nextjs-auth0/edge";
import { NextRequest, NextResponse } from "next/server";
import NodeCache from "node-cache";

const cache = new NodeCache();

type UserSession = Session | undefined;

export async function middleware(req: NextRequest) {
  try {
    /* if requested url is related to admin panel and role is user role or user is not authenticated then system will be redirected the request to dashboard page.*/
    if (req.nextUrl.pathname.startsWith("/admin")) {
      let userSession: UserSession = cache.get("userSessionData");
      if (userSession === undefined) {
        // there is no cache value therefor get it from auth0 server
        userSession = (await getSession()) || undefined; // if we have null || undefined then last falsy value will be returned
        cache.set<UserSession>("userSessionData", userSession); // set the cache
      }

      if (
        userSession === undefined ||
        !userSession.user["taletube_other/roles"].includes("admin")
      ) {
        return NextResponse.redirect(new URL("/not-found", req.nextUrl));
      }
    }

    // return NextResponse.next();
  } catch (error) {
    console.error(error);
  }
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
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
