import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const DEMO_COOKIE = "pve_demo_access";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  cookieStore.delete(DEMO_COOKIE);

  return NextResponse.redirect(new URL("/demo-login", request.url));
}
