import express from "express";
import validateRoute from "../../middlewares/validate";
import {
  createProduct,
  getProductById,
  getAllProducts,
  deleteProduct,
} from "./product.controller";
import {
  createProductSchema,
  deleteProductSchema,
  getProductByIdSchema,
} from "./product.validation";
import { authMiddleware } from "../../middlewares/auth.middelware";

const router = express.Router();

router.post(
  "/",
  validateRoute(createProductSchema),
  authMiddleware,
  createProduct
);

router.get("/:id", validateRoute(getProductByIdSchema), getProductById);

router.get("/", getAllProducts);

router.delete(
  "/:id",
  validateRoute(deleteProductSchema),
  authMiddleware,
  deleteProduct
);

export default router;
