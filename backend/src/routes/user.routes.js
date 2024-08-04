import { Router } from 'express';
import { signUpUser, loginUser, logoutUser, refreshAccessToken, getUserDetails, forgotPassword, resetPassword, verifyEmail } from '../controllers/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.route("/signup").post(signUpUser);
router.route("/verify-email/:token").post(verifyEmail);

router.route("/login").post(loginUser);
router.route("/verify-user").get(verifyJWT, (req, res) => {
    const user = req.user;
    if (user) {
        res.status(200).json({ role: user.role });
    }
    else {
        res.status(401).json({ message: "Unauthorized access" });
    }
})


router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").post(resetPassword);

// secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken)

router.route("/user-details").get(verifyJWT, getUserDetails);   

export default router;
