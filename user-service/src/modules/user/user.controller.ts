import { Request, Response } from "express";
import {
  userLoginService,
  userRegistrationService,
} from "../../service/user/user.service";
import { HttpStatusCode } from "axios";
import { ApiResponse } from "../../utils/AppResponse";
import { COOKIE_OPTIONS } from "../../utils/constant";

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

export const userLogin = async (req: Request, res: Response): Promise<void> => {
  const accessToken = await userLoginService(req.body);

  res
    .status(HttpStatusCode.Ok)
    .cookie("accessToken", accessToken, COOKIE_OPTIONS)
    .json(new ApiResponse(HttpStatusCode.Ok, {}, "User Login Successfully "));
};
