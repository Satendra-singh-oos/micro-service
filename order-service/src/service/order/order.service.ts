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
import {
  publishOrderCancelled,
  publishOrderCreated,
} from "../../config/kafka/producer";

export const createOrderService = async (data: CreateOrderDTO) => {
  const productIds: string[] = data.productIds;

  for (const productId of productIds) {
    try {
      const productResponse = await axios.get(
        `${env.API_GATEWAY_URL}/product-service/product/${productId}`
      );

      const product = productResponse.data?.data;

      if (!product) {
        throw new ApiError(
          HttpStatusCode.BadRequest,
          `Product with ID ${productId} not found`
        );
      }

      if (product.stock <= 0) {
        throw new ApiError(
          HttpStatusCode.BadRequest,
          `Product "${product.title}" is out of stock`
        );
      }
    } catch (err: any) {
      const status = err?.response?.status;
      const msg =
        err?.response?.data?.message ||
        `Product with ID ${productId} not found`;

      throw new ApiError(status || HttpStatusCode.BadRequest, msg);
    }
  }

  const createdOrder = await orderRepo.createOrder(data);

  await publishOrderCreated({
    orderId: createdOrder.id,
    productIds: createdOrder.productIds,
    amount: createdOrder.totalAmount,
  });

  return createdOrder;
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

  if (
    order.status === ORDER_STATUS.CANCELLED ||
    order.status === ORDER_STATUS.FAILED ||
    order.status === ORDER_STATUS.REFUNDED
  ) {
    await publishOrderCancelled({
      orderId: isOrderExist.id,
      productIds: isOrderExist.productIds,
      reason: order.status,
    });
  }

  return order;
};

export const getOrderByIdService = async (id: string) => {
  const order = await orderRepo.getOrderById(id);

  if (!order) {
    throw new ApiError(HttpStatusCode.NotFound, "Order With This Id Not Found");
  }

  return order;
};
