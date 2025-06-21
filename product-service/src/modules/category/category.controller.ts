import { Request, Response } from "express";
import {
  createCategoryService,
  getAllCategoryService,
} from "../../service/category/category.service";
import { HttpStatusCode } from "axios";
import { ApiResponse } from "../../utils/AppResponse";

export const createCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const category = await createCategoryService(req.body);

  res
    .status(HttpStatusCode.Ok)
    .json(
      new ApiResponse(
        HttpStatusCode.Ok,
        category,
        "Category Created Successfully"
      )
    );
};

export const getAllCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const categories = await getAllCategoryService();

  res
    .status(HttpStatusCode.Ok)
    .json(
      new ApiResponse(
        HttpStatusCode.Ok,
        categories,
        "All Categories Fetched Successfully"
      )
    );
};
