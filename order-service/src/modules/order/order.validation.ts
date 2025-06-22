import { ORDER_STATUS } from "@prisma/client";
import { z } from "zod";

export const createOrderSchema = z.object({
  body: z
    .object({
      productIds: z.array(z.string()),
      totalAmount: z.number(),
      addressId: z.string().optional(),
    })
    .strict(),
});

export const updateOrderStatusSchema = z.object({
  body: z
    .object({
      status: z.nativeEnum(ORDER_STATUS),
    })
    .strict(),

  params: z
    .object({
      id: z.string().uuid(),
    })
    .strict(),
});

export const getOrderByIdSchema = z.object({
  params: z
    .object({
      id: z.string().uuid(),
    })
    .strict(),
});
