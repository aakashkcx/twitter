import { NextRequest, NextResponse } from "next/server";

import { verifySession } from "@/lib/session";

const protectedRoutes = [""];
const publicRoutes = ["/login", "/register"];

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const userId = await verifySession();

  if (isProtectedRoute && !userId)
    return NextResponse.redirect(new URL("/login", request.url));

  if (isPublicRoute && userId)
    return NextResponse.redirect(new URL("/", request.url));

  return NextResponse.next();
}
