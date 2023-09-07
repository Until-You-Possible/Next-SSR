import { NextRequest, NextResponse } from "next/server";

import { getValue } from "@/lib/memroryStore";

export async function POST(request: NextRequest) {
  const { phone } = request.body;
  const phoneSMSCodeMessage  = getValue(phone);
  return NextResponse.json({ "result": phoneSMSCodeMessage });
}
