import { NextResponse } from "next/server";
export function proxy(request) {
  return NextResponse.redirect(new URL("/en", request.url));
}
export const config = { matcher: ["/"] };
