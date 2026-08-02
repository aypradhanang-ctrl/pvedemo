import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const DEMO_COOKIE = "pve_demo_access";

function createToken(password: string, secret: string) {
  return createHash("sha256")
    .update(`${password}:${secret}`)
    .digest("hex");
}

function safeEquals(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  if (left.length !== right.length) {
    return false;
  }

  return timingSafeEqual(left, right);
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const submittedPassword = String(formData.get("password") ?? "");
  const nextPath = String(formData.get("next") ?? "/");

  const demoPassword = process.env.DEMO_PASSWORD;
  const demoSecret = process.env.DEMO_SESSION_SECRET;

  if (!demoPassword || !demoSecret) {
    return NextResponse.redirect(
      new URL("/demo-login?error=config", request.url),
      { status: 303 },
    );
  }

  if (!safeEquals(submittedPassword, demoPassword)) {
    const invalidUrl = new URL("/demo-login", request.url);
    invalidUrl.searchParams.set("error", "invalid");
    invalidUrl.searchParams.set("next", nextPath);
    return NextResponse.redirect(invalidUrl, { status: 303 });
  }

  const token = createToken(demoPassword, demoSecret);
  const cookieStore = await cookies();
  cookieStore.set(DEMO_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  const destination = nextPath.startsWith("/") ? nextPath : "/";
  return NextResponse.redirect(new URL(destination, request.url), {
    status: 303,
  });
}
