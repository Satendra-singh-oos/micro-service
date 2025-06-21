import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import env from "../utils/env";
import { GetUserDTO } from "../utils/types/user.type";
import redis from "../config/redis/redis";
import { ApiError } from "../utils/AppError";
import { HttpStatusCode } from "axios";
import { ApiResponse } from "../utils/AppResponse";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new ApiError(HttpStatusCode.BadRequest, "Access token missing");
    }

    const decodedTokenPayload = jwt.verify(
      token,
      env.ACCESS_TOKEN_SECRET as string
    ) as GetUserDTO;

    const cachedUser = await redis.get(`user:${decodedTokenPayload.id}`);
    if (!cachedUser) {
      throw new ApiError(HttpStatusCode.BadRequest, "Please Login First");
    }

    req.user = decodedTokenPayload;
    return next();
  } catch (error: any) {
    res
      .status(502)
      .json(
        new ApiResponse(
          HttpStatusCode.BadGateway,
          {},
          error.message.length > 0 ? error.message : "Invalid or expired token"
        )
      );
  }
};
