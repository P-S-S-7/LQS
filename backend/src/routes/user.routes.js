import { Router } from 'express';
import { signUpUser, loginUser, logoutUser, refreshAccessToken, getUserDetails } from '../controllers/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.route("/signup").post(signUpUser);
router.route("/login").post(loginUser);

// secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken)

router.route("/user-details").get(verifyJWT, getUserDetails);   

export default router;
