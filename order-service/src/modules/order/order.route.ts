import express from "express";
import validateRoute from "../../middlewares/validate";
import {
  createOrderSchema,
  getOrderByIdSchema,
  updateOrderStatusSchema,
} from "./order.validation";
import { authMiddleware } from "../../middlewares/auth.middleware";
import {
  createOrder,
  getOrderById,
  toggleOrderStatus,
} from "./order.controller";

const router = express.Router();

router.post(
  "/buy",
  validateRoute(createOrderSchema),
  authMiddleware,
  createOrder
);

router.patch(
  "/:id",
  validateRoute(updateOrderStatusSchema),
  authMiddleware,
  toggleOrderStatus
);

router.get(
  "/:id",
  validateRoute(getOrderByIdSchema),
  authMiddleware,
  getOrderById
);

export default router;
