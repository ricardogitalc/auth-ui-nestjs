export const AUTH_CONFIG = {
  JWT_KEY: process.env.JWT_SECRET_KEY as string,
  REFRESH_KEY: process.env.REFRESH_SECRET_KEY as string,
  COOKIE_OPTIONS: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  },
};
