import express from "express";
import validateRoute from "../../middlewares/validate";
import { createCategorySchema } from "./category.validation";
import { createCategory, getAllCategory } from "./category.controller";

const router = express.Router();

router.post("/", validateRoute(createCategorySchema), createCategory);

router.get("/", getAllCategory);

export default router;
