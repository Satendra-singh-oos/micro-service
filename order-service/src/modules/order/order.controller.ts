import { Request, Response } from "express";
import { HttpStatusCode } from "axios";
import { ApiError } from "../../utils/AppError";
import {
  CreateOrderDTO,
  UpdateOrderStatusDTO,
} from "../../utils/types/order.type";
import {
  createOrderService,
  getOrderByIdService,
  updateOrderStatusService,
} from "../../service/order/order.service";
import { ApiResponse } from "../../utils/AppResponse";

export const createOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  const data: CreateOrderDTO = req.body;

  if (!req.user) {
    throw new ApiError(HttpStatusCode.BadRequest, "No Allowed To Access");
  }
  data.orderById = req.user.id;
  data.orderByEmail = req.user.email;

  const order = await createOrderService(req.body);

  res
    .status(HttpStatusCode.Ok)
    .json(
      new ApiResponse(HttpStatusCode.Ok, order, "Order Placed Successfully ")
    );
};

export const toggleOrderStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.user) {
    throw new ApiError(HttpStatusCode.BadRequest, "No Allowed To Access");
  }

  const data: UpdateOrderStatusDTO = {
    orderId: req.params.id,
    status: req.body.status,
  };
  const order = await updateOrderStatusService(data);

  res
    .status(HttpStatusCode.Ok)
    .json(
      new ApiResponse(
        HttpStatusCode.Ok,
        order,
        "Order Status Updated Successfully "
      )
    );
};

export const getOrderById = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.user) {
    throw new ApiError(HttpStatusCode.BadRequest, "No Allowed To Access");
  }

  const order = await getOrderByIdService(req.params.id);

  res
    .status(HttpStatusCode.Ok)
    .json(
      new ApiResponse(HttpStatusCode.Ok, order, "Order Fetched Successfully ")
    );
};
