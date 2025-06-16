import { Router } from "express";
import { healthCheck } from "./health.controller";

const router = Router();

router.route("/").get(healthCheck);

export default router;
