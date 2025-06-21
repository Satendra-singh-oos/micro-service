import { Category } from "@prisma/client";
import {
  CreateCategoryDTO,
  GetAllCategoryDTO,
} from "../../utils/types/product.type";
import * as categoryRepo from "../../repository/category/category.repository";
import { HttpStatusCode } from "axios";
import { ApiError } from "../../utils/AppError";

export const createCategoryService = async (
  data: CreateCategoryDTO
): Promise<Category> => {
  const isCategoryExistWithThisLabel = await categoryRepo.getCategoryByLabel(
    data.label
  );

  if (isCategoryExistWithThisLabel) {
    throw new ApiError(
      HttpStatusCode.BadRequest,
      "Category With This Label Already Exist"
    );
  }

  const isCategoryExistWithThisValue = await categoryRepo.getCategoryByValue(
    data.value
  );

  if (isCategoryExistWithThisValue) {
    throw new ApiError(
      HttpStatusCode.BadRequest,
      "Category With This Value Already Exist"
    );
  }

  return await categoryRepo.addCategory(data);
};

// TODO:ADD PAGINATION
export const getAllCategoryService = async (): Promise<GetAllCategoryDTO[]> => {
  return await categoryRepo.getAllCategory();
};
