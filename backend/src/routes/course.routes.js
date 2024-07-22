import { Router } from "express";
import { getCoursesByBatch } from "../controllers/course.controller.js";

const router = Router();

router.route("/").get(getCoursesByBatch);

export default router;