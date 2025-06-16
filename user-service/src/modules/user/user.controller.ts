import { Request, Response } from "express";
import { userRegistrationService } from "../../service/user/user.service";
import { HttpStatusCode } from "axios";
import { ApiResponse } from "../../utils/AppResponse";

export const userRegistration = async (
  req: Request,
  res: Response
): Promise<void> => {
  const user = await userRegistrationService(req.body);

  res
    .status(HttpStatusCode.Ok)
    .json(
      new ApiResponse(
        HttpStatusCode.Ok,
        user,
        "User Created Successfully next step is to verify user"
      )
    );
};
