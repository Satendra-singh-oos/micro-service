import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/AppError";
import { getUserByIdService } from "../service/user/user.service";
import { env } from "process";
import { Role } from "@prisma/client";

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
      return res.status(404).json(new ApiError(401, "Unauthorized request"));
    }

    const verifiedToken = (await jwt.verify(
      token,
      env.ACCESS_TOKEN_SECRET as string
    )) as CustomJwtPayload;

    const userId: string = verifiedToken?.id;

    const user = await getUserByIdService(userId);

    if (!user) {
      return res.status(404).json(new ApiError(401, "Invalid access token"));
    }

    req.user = user;

    next();
  } catch (error) {
    return res
      .status(404)
      .json(
        new ApiError(500, "Something went wrong during verify of jwt token")
      );
  }
});

export const verifyAdmin = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(404).json(new ApiError(401, "Unauthorized request"));
    }

    const verifiedToken = (await jwt.verify(
      token,
      env.ACCESS_TOKEN_SECRET as string
    )) as CustomJwtPayload;

    const userId: string = verifiedToken?.id;

    const user = await getUserByIdService(userId);

    if (!user) {
      return res.status(404).json(new ApiError(401, "Invalid access token"));
    }

    // check dose the user is addmin or not
    if (user.role !== Role.ADMIN) {
      return res
        .status(404)
        .json(new ApiError(401, "Not Authorized To Access"));
    }

    next();
  } catch (error) {
    return res
      .status(404)
      .json(new ApiError(500, "Something went wrong during verify of jwt"));
  }
});

export const verifySuperAdmin = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(404).json(new ApiError(401, "Unauthorized request"));
    }

    const verifiedToken = (await jwt.verify(
      token,
      env.ACCESS_TOKEN_SECRET as string
    )) as CustomJwtPayload;

    const userId: string = verifiedToken?.id;

    const user = await getUserByIdService(userId);

    if (!user) {
      return res.status(404).json(new ApiError(401, "Invalid access token"));
    }

    // check dose the user is addmin or not
    if (user.role !== Role.SUPER_ADMIN) {
      return res
        .status(404)
        .json(new ApiError(401, "Not Authorized To Access"));
    }

    next();
  } catch (error) {
    return res
      .status(404)
      .json(new ApiError(500, "Something went wrong during verify of jwt"));
  }
});
