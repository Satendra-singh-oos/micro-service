import { prisma } from "../../config/db/db";
import {
  CreateOrderDTO,
  UpdateOrderStatusDTO,
} from "../../utils/types/order.type";
import { Order, ORDER_STATUS } from "@prisma/client";

export const createOrder = async (data: CreateOrderDTO) => {
  return await prisma.order.create({
    data: {
      orderById: data.orderById,
      orderByEmail: data.orderByEmail ?? null,
      productIds: data.productIds,
      totalAmount: data.totalAmount,
      addressId: data.addressId ?? null,
      status: ORDER_STATUS.PENDING,
    },
  });
};

export const updateOrderStatus = async (data: UpdateOrderStatusDTO) => {
  return await prisma.order.update({
    where: {
      id: data.orderId,
    },
    data: {
      status: data.status,
    },
  });
};

export const getOrderById = async (id: string): Promise<Order | null> => {
  return await prisma.order.findFirst({
    where: {
      id,
    },
  });
};
