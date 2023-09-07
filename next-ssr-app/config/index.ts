

export const ironOptions = {
  cookieName: process.env["SESSION_COOKIE_NAME "],
  password:  process.env["SESSION_PASSWORD "],
  cookieOptions: {
    maxAge: 25 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production"
  }
}
