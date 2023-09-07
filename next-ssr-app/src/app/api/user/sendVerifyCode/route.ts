import { format } from "date-fns";
import md5 from "md5";
import { NextRequest, NextResponse} from 'next/server'
import { encode } from "js-base64";
import requestInstance from "../../../../../service/fetch";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/route";
import {setValueWithExpiration} from "@/lib/memroryStore";

const config = {
    AccountId  : "2c94811c8a27cf2d018a574115151085",
    AuthToken  : "85faa40a2cac43a3bf6db57e1bc5f25c",
    appId      : "2c94811c8a27cf2d018a57411663108c",
    expireTime : "5",
    baseURL    : "https://app.cloopen.com:8883"
};

export  async function POST(request: NextRequest) {
    const requestBody = await request.json();
    const { to, templateId, } = requestBody;
    const CurrentStampTime = format(new Date(), "yyyyMMddHHmmss");
    const SigParameter     = md5(`${config.AccountId}${config.AuthToken}${CurrentStampTime}`);
    const Authorization    = encode(`${config.AccountId}:${CurrentStampTime}`);
    const url = `${config.baseURL}/2013-12-26/Accounts/${config.AccountId}/SMS/TemplateSMS?sig=${SigParameter}`;
    const verifyCode     = Math.floor(Math.random() * (9999 - 1000)) + 1000;

    setValueWithExpiration(to, verifyCode, 5);

    const result = await requestInstance.post(url, {
        to,
        templateId,
        appId: config.appId,
        datas: [verifyCode, config.expireTime],
    }, {
        headers: {
            Authorization,
        },
    });

    return NextResponse.json({ result });
}
