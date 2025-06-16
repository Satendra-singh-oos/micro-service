import { UserRegistrationDTO } from "../../utils/types/user.type";
import * as userRepo from "../../repository/user/user.repository";
import { ApiError } from "../../utils/AppError";
import { HttpStatusCode } from "axios";
import { generateHashPassword } from "../../utils/helper";

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
