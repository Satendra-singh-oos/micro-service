import express from "express";
import {
  getUserSchema,
  loginUserSchema,
  registerUserSchema,
  updateUserRoleSchema,
} from "./user.validation";
import validateRoute from "../../middlewares/validate";
import { getUserById, userLogin, userRegistration } from "./user.controller";
import { verifyAdmin, verifyJWT } from "../../middlewares/auth.middelware";

const router = express.Router();

router.post("/register", validateRoute(registerUserSchema), userRegistration);
router.post("/login", validateRoute(loginUserSchema), userLogin);
router.get("/:id", validateRoute(getUserSchema), verifyJWT, getUserById);
router.patch(
  "/:id",
  validateRoute(updateUserRoleSchema),
  verifyAdmin,
  getUserById
);

export default router;
