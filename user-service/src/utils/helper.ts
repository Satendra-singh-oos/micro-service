import bcryptjs from "bcryptjs";
import { HASHED_PASSWORD_ROUNDS, JWT_EXPIRE } from "./constant";
import jwt from "jsonwebtoken";
import env from "./env";
import { ApiError } from "./AppError";

export async function generateHashPassword(password: string) {
  const salt = await bcryptjs.genSalt(HASHED_PASSWORD_ROUNDS);
  const hashedPassword = await bcryptjs.hash(password, salt);

  return hashedPassword;
}

export async function comparePassword({
  password,
  hashedPassword,
}: {
  password: string;
  hashedPassword: string;
}): Promise<boolean> {
  return await bcryptjs.compare(password, hashedPassword);
}

export const generateAccessToken = async ({
  userId,
  username,
  role,
  email,
}: {
  userId: string;
  username: string;
  role: string;
  email: string;
}): Promise<string> => {
  try {
    const accessToken = jwt.sign(
      {
        id: userId,
        email,
        username,
        role,
      },
      env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: JWT_EXPIRE,
      }
    );

    return accessToken;
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong during access token generation"
    );
  }
};
