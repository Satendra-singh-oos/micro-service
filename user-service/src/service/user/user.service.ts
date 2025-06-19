import {
  GetUserDTO,
  UserLoginDTO,
  UserRegistrationDTO,
} from "../../utils/types/user.type";
import * as userRepo from "../../repository/user/user.repository";
import { ApiError } from "../../utils/AppError";
import { HttpStatusCode } from "axios";
import {
  comparePassword,
  generateAccessToken,
  generateHashPassword,
} from "../../utils/helper";
import { Role } from "@prisma/client";
import redis from "../../config/redis/redis";

export const userRegistrationService = async (
  data: UserRegistrationDTO
): Promise<{ id: string }> => {
  const isEmailExist = await userRepo.getUserByEmail(data.email);

  if (isEmailExist) {
    throw new ApiError(
      HttpStatusCode.Conflict,
      "User With This Email Already Exist"
    );
  }

  const isUserNameExist = await userRepo.getUserByUsername(data.userName);
  if (isUserNameExist) {
    throw new ApiError(
      HttpStatusCode.Conflict,
      "User With This username Already Exist"
    );
  }

  const hashedPassword = await generateHashPassword(data.password);

  data.password = hashedPassword;

  return await userRepo.createUser(data);
};

export const userLoginService = async (data: UserLoginDTO): Promise<string> => {
  const isUserExist = await userRepo.getUserByEmail(data.email);

  if (!isUserExist) {
    throw new ApiError(HttpStatusCode.BadRequest, "User Dose Not Exist");
  }

  const isPasswordCorrect = await comparePassword({
    password: data.password,
    hashedPassword: isUserExist.password,
  });

  if (!isPasswordCorrect) {
    throw new ApiError(HttpStatusCode.BadRequest, "Password is incorrect");
  }

  return await generateAccessToken({
    email: isUserExist.email,
    role: isUserExist.role,
    userId: isUserExist.id,
    username: isUserExist.userName,
  });
};

export const getUserByIdService = async (
  id: string
): Promise<GetUserDTO | null> => {
  const isUserExist = await userRepo.getUserById(id);

  if (!isUserExist) {
    throw new ApiError(HttpStatusCode.BadRequest, "User Dose Not Exist");
  }
  return isUserExist;
};

export const updatedUserRoleService = async ({
  id,
  role,
}: {
  id: string;
  role: Role;
}) => {
  const isUserExist = await userRepo.getUserById(id);

  if (!isUserExist) {
    throw new ApiError(HttpStatusCode.BadRequest, "User Dose Not Exist");
  }

  await redis.del(`user:${isUserExist.id}`);
  return await userRepo.updateUserDetails({ id, data: { role } });
};
