import { Router } from "express";       
import { getQuizzesByBatch, scheduleQuiz, getQuizzesByUser} from "../controllers/quiz.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/schedule").post(verifyJWT, scheduleQuiz);
router.route("/batch/").get(getQuizzesByBatch);
router.route("/user/").get(verifyJWT, getQuizzesByUser);

export default router;