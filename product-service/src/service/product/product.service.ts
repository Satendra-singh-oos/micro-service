import { Product } from "@prisma/client";
import {
  CreateProductDTO,
  GetAllProductDTO,
  GetProductDTO,
} from "../../utils/types/product.type";
import * as productRepo from "../../repository/product/product.repository";
import * as categoryRepo from "../../repository/category/category.repository";

import { ApiError } from "../../utils/AppError";

import { HttpStatusCode } from "axios";

export const createProductService = async (
  data: CreateProductDTO
): Promise<Product> => {
  const isProductWithThisTitleExist = await productRepo.getProductByName(
    data.title
  );

  if (isProductWithThisTitleExist) {
    throw new ApiError(
      HttpStatusCode.BadRequest,
      "Product With This Title Already Exist"
    );
  }

  const isCategoryExist = await categoryRepo.getCategoryById(data.categoryId);

  if (!isCategoryExist) {
    throw new ApiError(HttpStatusCode.BadRequest, "Category Dose Not Exist ");
  }

  return await productRepo.addProduct(data);
};

export const getProductByIdService = async (
  id: string
): Promise<GetProductDTO> => {
  const isProductExist = await productRepo.getProductById(id);

  if (!isProductExist || isProductExist.deleted) {
    throw new ApiError(HttpStatusCode.BadRequest, "Product Not Found");
  }

  return isProductExist;
};

// TODO:ADD PAGINATION
export const getAllProductService = async (): Promise<GetAllProductDTO[]> => {
  return await productRepo.getAllProduct();
};

export const deleteProductService = async (id: string): Promise<Product> => {
  const isProductExist = await productRepo.getProductById(id);

  if (!isProductExist || isProductExist.deleted) {
    throw new ApiError(HttpStatusCode.BadRequest, "Product Not Found");
  }

  return productRepo.softDeleteProduct(id);
};
