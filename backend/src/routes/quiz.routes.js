import { Router } from "express";       
import { getQuizzesByBatch, scheduleQuiz } from "../controllers/quiz.controller.js";

const router = Router();

router.route("/schedule").post(scheduleQuiz);
router.route("/").get(getQuizzesByBatch);

export default router;