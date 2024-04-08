import { getSession } from "@auth0/nextjs-auth0/edge";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  try {
    /* if requested url is related to admin panel and role is user role or user is not authenticated then system will be redirected the request to dashboard page.*/
    if (req.url.includes("/admin")) {
      const user = await getSession(); // it will bring user deatils from auth0
      if (!(user && user["taletube_other/roles"].includes("admin"))) {
        return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
      }
    }
  } catch (error) {
    process.exit();
  }
}
