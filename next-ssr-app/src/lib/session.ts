import { createResponse, getIronSession } from "iron-session";

export interface Data {
    person?: {
        phone: number;
        code: number;
    };
}

export const getSession = (req: Request, res: Response) => {
    return getIronSession<Data>(req, res, {
        password: "uYUBvvwcI5qXVfRhdHtwtUsv3A5PP98k",
        cookieName: "sid",
        cookieOptions: {
            maxAge: 60,
            secure: false,
        },
    });
};

export { createResponse };
