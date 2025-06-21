import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/AppError";
import { env } from "process";
import axios from "axios";
import { REDIS_EXPIRE, UserRole } from "../utils/constant";
import redis from "../config/redis";

export interface CustomJwtPayload extends JwtPayload {
  id: string;
  email: string;
  username: string;
  role: string;
}

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json(new ApiError(401, "Unauthorized request"));
    }

    const verifiedToken = jwt.verify(
      token,
      env.ACCESS_TOKEN_SECRET as string
    ) as CustomJwtPayload;

    const userId = verifiedToken?.id;

    const cachedUser = await redis.get(`user:${userId}`);
    if (cachedUser) {
      req.user = JSON.parse(cachedUser);
      return next();
    }

    const userRes = await axios.get(
      `${env.USER_SERVICE_URL}/api/v1/user/${userId}`
    );

    const user = userRes.data?.data;

    if (!userRes.data?.success || !user) {
      return res.status(401).json({ message: "User no longer exists" });
    }

    // Cache user for future
    await redis.setex(`user:${userId}`, REDIS_EXPIRE, JSON.stringify(user));

    console.log("api-gateway ->", user);

    req.user = user;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return res
      .status(500)
      .json(new ApiError(500, "Something went wrong during JWT verification"));
  }
});

export const verifyAdmin = asyncHandler(async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "User no Found" });
    }

    if (user.role !== UserRole.ADMIN) {
      return res
        .status(403)
        .json(new ApiError(403, "Not Authorized To Access"));
    }

    next();
  } catch (error) {
    console.error("verifyAdmin error:", error);
    return res
      .status(500)
      .json(new ApiError(500, "Something went wrong during admin check"));
  }
});

export const verifySuperAdmin = asyncHandler(async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "User no Found" });
    }

    if (user.role !== UserRole.SUPER_ADMIN) {
      return res
        .status(403)
        .json(new ApiError(403, "Not Authorized To Access"));
    }

    next();
  } catch (error) {
    console.error("verifySuperAdmin error:", error);
    return res
      .status(500)
      .json(new ApiError(500, "Something went wrong during super admin check"));
  }
});
