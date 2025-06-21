import express from "express";
import {
  getUserSchema,
  loginUserSchema,
  registerUserSchema,
  updateUserRoleSchema,
} from "./user.validation";
import validateRoute from "../../middlewares/validate";
import { getUserById, userLogin, userRegistration } from "./user.controller";

const router = express.Router();

router.post("/register", validateRoute(registerUserSchema), userRegistration);
router.post("/login", validateRoute(loginUserSchema), userLogin);
router.get("/:id", validateRoute(getUserSchema), getUserById);
router.patch("/:id", validateRoute(updateUserRoleSchema), getUserById);

export default router;
