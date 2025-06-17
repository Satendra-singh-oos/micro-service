import { ApiError } from "../../utils/AppError";
import { ApiResponse } from "../../utils/AppResponse";
import { asyncHandler } from "../../utils/asyncHandler";

const healthCheck = asyncHandler(async (req, res) => {
  try {
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Product Service Health Good"));
  } catch (error: any) {
    throw new ApiError(500, error?.message);
  }
});

export { healthCheck };
