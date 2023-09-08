import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";


export async function POST(request: NextRequest, response: NextResponse) {
  const getSessionValue = await getSession(request, response);
  return NextResponse.json({ "ok": getSessionValue })
}
