import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import { ApiError } from "../utils/AppError";

const validateRoute =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      throw new ApiError(400, "Validation Failed", result.error?.errors);
    }

    next();
  };

export default validateRoute;
