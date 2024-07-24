import { Router } from "express";
import { getLocations } from "../controllers/location.controller.js";

const router = Router();

router.route("/").get(getLocations);

export default router;