import { Request, Response } from "express";
import {
  createProductService,
  deleteProductService,
  getAllProductService,
  getProductByIdService,
} from "../../service/product/product.service";
import { HttpStatusCode } from "axios";
import { ApiResponse } from "../../utils/AppResponse";
import { CreateProductDTO } from "../../utils/types/product.type";
import { ApiError } from "../../utils/AppError";

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const data: CreateProductDTO = req.body;

  if (!req.user) {
    throw new ApiError(HttpStatusCode.BadRequest, "No Allowed To Access");
  }
  data.createdById = req.user.id;

  const product = await createProductService(req.body);

  res
    .status(HttpStatusCode.Ok)
    .json(
      new ApiResponse(
        HttpStatusCode.Ok,
        product,
        "Product Created Successfully "
      )
    );
};

export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const product = await getProductByIdService(id);

  res
    .status(HttpStatusCode.Ok)
    .json(
      new ApiResponse(
        HttpStatusCode.Ok,
        product,
        "Product Fetched Successfully"
      )
    );
};

export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  const products = await getAllProductService();

  res
    .status(HttpStatusCode.Ok)
    .json(
      new ApiResponse(
        HttpStatusCode.Ok,
        products,
        "All Products Fetched Successfully"
      )
    );
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  await deleteProductService(id);

  res
    .status(HttpStatusCode.Ok)
    .json(
      new ApiResponse(HttpStatusCode.Ok, {}, "Product Deleted Successfully")
    );
};
