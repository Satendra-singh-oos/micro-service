import { env } from "process";

export const V1 = "/api/v1";

export const HASHED_PASSWORD_ROUNDS = 10;

export const JWT_EXPIRE = 60 * 60 * 24 * 30;
export const REDIS_EXPIRE = 90 * 24 * 60 * 60;

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
};
