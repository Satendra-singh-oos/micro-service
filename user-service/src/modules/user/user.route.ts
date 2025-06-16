import express from "express";
import { loginUserSchema, registerUserSchema } from "./user.validation";
import validateRoute from "../../middlewares/validate";
import { userLogin, userRegistration } from "./user.controller";

const router = express.Router();

router.post("/register", validateRoute(registerUserSchema), userRegistration);
router.post("/login", validateRoute(loginUserSchema), userLogin);

export default router;
