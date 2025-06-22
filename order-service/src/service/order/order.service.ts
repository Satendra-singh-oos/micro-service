import axios, { HttpStatusCode } from "axios";
import {
  CreateOrderDTO,
  UpdateOrderStatusDTO,
} from "../../utils/types/order.type";
import env from "../../utils/env";
import * as orderRepo from "../../repository/order/order.repository";
import { ApiError } from "../../utils/AppError";
import { ApiResponse } from "../../utils/AppResponse";
import { ORDER_STATUS } from "@prisma/client";

export const createOrderService = async (data: CreateOrderDTO) => {
  const productIds: string[] = data.productIds;

  let totalAmount = 0;

  for (const productId of productIds) {
    const productResponse = await axios.get(
      `${env.API_GATEWAY_URL}/api/product/${productId}`
    );

    const product = productResponse.data?.data;

    if (!product) {
      throw new ApiError(
        HttpStatusCode.BadRequest,
        `Product with ID ${productId} not found`
      );
    }

    if (product.stock <= 0) {
      throw new ApiResponse(
        HttpStatusCode.BadRequest,
        `Product "${product.title}" is out of stock`
      );
    }
  }

  const order = await orderRepo.createOrder(data);

  //TODO: Add Kafka Producer Here So That Product service can consume it and update the stock

  return order;
};

export const updateOrderStatusService = async (data: UpdateOrderStatusDTO) => {
  const isOrderExist = await orderRepo.getOrderById(data.orderId);

  if (!isOrderExist) {
    throw new ApiError(HttpStatusCode.NotFound, "Order With This Id Not Found");
  }

  if (isOrderExist.status === ORDER_STATUS.COMPLETED) {
    throw new ApiError(HttpStatusCode.Conflict, "Order Is Already Completed ");
  }

  const order = await orderRepo.updateOrderStatus(data);

  //TODO: add kafka producer her when ORDER_STATUS= CANCELED REFUND FAILED re update the stock so that product consumer can listen

  return order;
};

export const getOrderByIdService = async (id: string) => {
  const order = await orderRepo.getOrderById(id);

  if (!order) {
    throw new ApiError(HttpStatusCode.NotFound, "Order With This Id Not Found");
  }

  return order;
};
