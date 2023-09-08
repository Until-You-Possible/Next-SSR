import {NextRequest, NextResponse} from "next/server";
import {getValue} from "@/lib/memroryStore";
import {getSession} from "@/lib/session";

export async function POST(request: NextRequest, response: NextResponse) {
    const getSessionValue = await  getSession(request, response);
    // await getSessionValue.destroy()
    return NextResponse.json({ "ok": getSessionValue })
}
