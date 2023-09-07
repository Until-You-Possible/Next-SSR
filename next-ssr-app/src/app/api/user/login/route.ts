import {NextRequest, NextResponse} from "next/server";
import {getValue} from "@/lib/memroryStore";

export async function POST(req: NextRequest) {
    const requestBody = await req.json();
    const { phone, smsCode } =  requestBody;
    console.log("phone", phone);
    console.log("smsCode", smsCode);
    // 从内存中去相关额信息
    // 验证SMS code
    const userMessage = getValue(phone);
    console.log("userMessage", userMessage);
    if (userMessage) {
        const getStorePhone = userMessage.phone;
        const getStoreSMSCode = userMessage.SMSCode;
        if (phone == getStorePhone && smsCode == getStoreSMSCode) {
            return NextResponse.json({ "success": true })
        }
    }
    return NextResponse.json({ "success": false });
}
