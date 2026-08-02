import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const DEMO_COOKIE = "pve_demo_access";

function isDemoEnabled() {
  return process.env.DEMO_MODE_ENABLED === "true";
}

async function createToken(password: string, secret: string) {
  const payload = new TextEncoder().encode(`${password}:${secret}`);
  const digest = await crypto.subtle.digest("SHA-256", payload);

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function proxy(request: NextRequest) {
  if (!isDemoEnabled()) {
    return NextResponse.next();
  }

  const { pathname, search } = request.nextUrl;

  if (
    pathname.startsWith("/demo-login") ||
    pathname.startsWith("/demo-auth") ||
    pathname.startsWith("/demo-logout")
  ) {
    return NextResponse.next();
  }

  const password = process.env.DEMO_PASSWORD;
  const secret = process.env.DEMO_SESSION_SECRET;

  if (!password || !secret) {
    const loginUrl = new URL("/demo-login", request.url);
    loginUrl.searchParams.set("error", "config");
    return NextResponse.redirect(loginUrl);
  }

  const expectedToken = await createToken(password, secret);
  const currentToken = request.cookies.get(DEMO_COOKIE)?.value;

  if (currentToken === expectedToken) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/demo-login", request.url);
  loginUrl.searchParams.set("next", `${pathname}${search}`);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
