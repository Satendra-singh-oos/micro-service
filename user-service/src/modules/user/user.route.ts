import express from "express";
import { registerUserSchema } from "./user.validation";
import validateRoute from "../../middlewares/validate";
import { userRegistration } from "./user.controller";

const router = express.Router();

router.post("/register", validateRoute(registerUserSchema), userRegistration);

export default router;
