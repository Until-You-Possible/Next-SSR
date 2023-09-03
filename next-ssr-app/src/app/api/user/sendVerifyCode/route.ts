import { format } from "date-fns";
import md5 from "md5";
import { NextResponse } from 'next/server'
import { encode } from "js-base64";
import requestInstance from "../../../../../service/fetch";

const config = {
    AccountId  : "2c94811c8a27cf2d018a574115151085",
    AuthToken  : "85faa40a2cac43a3bf6db57e1bc5f25c",
    appId      : "2c94811c8a27cf2d018a57411663108c",
    expireTime : "5",
    baseURL    : "https://app.cloopen.com:8883"
};

export async function POST(req, res) {

    const { to = "15026405271", templateId = "1" } = req.body;
    const CurrentStampTime = format(new Date(), "yyyyMMddHHmmss");
    const SigParameter     = md5(`${config.AccountId}${config.AuthToken}${CurrentStampTime}`);
    const Authorization    = encode(`${config.AccountId}:${CurrentStampTime}`);
    const url = `${config.baseURL}/2013-12-26/Accounts/${config.AccountId}/SMS/TemplateSMS?sig=${SigParameter}`;
    const verifyCode     = Math.floor(Math.random() * (9999 - 1000)) + 1000;

    try {
        const response = await requestInstance.post(url, {
            to,
            templateId,
            appId: config.appId,
            datas: [verifyCode, config.expireTime],
        }, {
            headers: {
                Authorization,
            },
        });

        console.log("SMS response", response);

        // const data = req.body;
        return NextResponse.json({  });
    } catch (error) {
        console.error("Error sending SMS:", error);
        return NextResponse.error("Failed to send SMS");
    }
}
