import { ORDER_STATUS } from "@prisma/client";

export interface CreateOrderDTO {
  orderById: string;
  orderByEmail?: string;
  productIds: string[];
  totalAmount: number;
  addressId?: string;
}

export interface UpdateOrderStatusDTO {
  orderId: string;
  status: ORDER_STATUS;
}
