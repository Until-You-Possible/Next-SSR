import {NextRequest, NextResponse} from "next/server";


export function middleware(req: NextRequest) {
  const allCookies = req.cookies;
  return NextResponse.next()
}
