import express from "express";
import {
  getUserSchema,
  loginUserSchema,
  registerUserSchema,
  updateUserRoleSchema,
} from "./user.validation";
import validateRoute from "../../middlewares/validate";
import { getUserById, userLogin, userRegistration } from "./user.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = express.Router();

router.post("/register", validateRoute(registerUserSchema), userRegistration);
router.post("/login", validateRoute(loginUserSchema), userLogin);
router.get("/:id", validateRoute(getUserSchema), authMiddleware, getUserById);
router.patch(
  "/:id",
  validateRoute(updateUserRoleSchema),
  authMiddleware,
  getUserById
);

export default router;
