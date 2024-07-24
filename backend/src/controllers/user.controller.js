import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import { Faculty } from '../models/faculty.model.js';
import { Student } from '../models/student.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import jwt from 'jsonwebtoken';
import sgMail from '@sendgrid/mail';

const baseFrontendUrl = process.env.BASE_FRONTEND_URL || 'http://localhost:5173';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// send email 
const sendEmail = async (to, subject, html) => {
    const msg = {
        to,
        from: {
            name: process.env.EMAIL_FROM_NAME,
            email: process.env.EMAIL_FROM,
        },
        subject,
        html,
    };
    await sgMail.send(msg);
};

// Generate access and refresh tokens
const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

// Register a new user
const signUpUser = asyncHandler(async (req, res, next) => {
    // steps to register a user
    // 1. get the user data from the request body (data that is sent from the client to the server - frontend)
    // 2. validate the user data - not empty, valid email, password, role
    // 3. check if the user already exists in the database - using email
    // 4. create user object - a new entry in the database
    // 5. create Faculty or Student object based on the role
    // 6. remove the password and refreshToken from the user object
    // 7. send a response

   try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            throw new ApiError(400, "All fields are required");
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new ApiError(409, "User with this email already exists");
        }

        const user = await User.create({ name, email, password, role });
        if (!user) {
            throw new ApiError(500, "User registration failed");
        }

        if (role === "Faculty") {
            await Faculty.create({ user: user._id, name, department: req.body.department, email });
        } else if (role === "Student") {
            await Student.create({ user: user._id, name, branch: req.body.branch, email });
        } else {
            throw new ApiError(400, "Invalid role");
        }

        const token = jwt.sign({ email: user.email }, process.env.EMAIL_VERIFICATION_SECRET, { expiresIn: '1h' });

        const verificationUrl = `${baseFrontendUrl}/verify-email/${token}`;
        user.emailVerificationToken = token;
        user.emailVerificationExpires = Date.now() + 3600000;
        await user.save();

        const message = `
            <div style="font-family: Arial, sans-serif; line-height: 1.5;">
                <p>Hello ${user.name},</p>
                <p>Thank you for signing up! To complete your registration, please verify your email address by clicking the following link:</p>
                <p><a href="${verificationUrl}">Verify Your Email Address</a></p>
                <p>If you did not create an account, no further action is required.</p>
                <p>Best regards,<br>LNMIIT</p>
            </div>
        `;

        await sendEmail(user.email, 'Email Verification', message);
        res.status(201).json(new ApiResponse(201, {}, "User registered successfully. Please verify your email address."));
    } catch (error) {
        console.error("Error occurred during sign-up:", error);
        next(error); // pass the error to the error handler middleware
    }
});

// verify email
const verifyEmail = asyncHandler(async (req, res, next) => {
    try {
        const { token } = req.params;

        console.log('Token:', token);

        if (!token) {
            throw new ApiError(400, 'Invalid token.');
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.EMAIL_VERIFICATION_SECRET);
        } catch (error) {
            throw new ApiError(400, 'Invalid or expired token.');
        }

        const user = await User.findOne({
            email: decoded.email,
            emailVerificationToken: token,
            emailVerificationExpires: { $gt: Date.now() },
        });

        if (!user) {
            throw new ApiError(400, 'Invalid or expired token.');
        }

        user.isEmailVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationExpires = undefined;

        try {
            await user.save();
            res.status(200).json({ message: 'Email verified successfully.' });
        } catch (error) {
            throw new ApiError(500, 'Error verifying email.');
        }
    } catch (error) {
        next(error);
    }
});


// login a user
const loginUser = asyncHandler(async (req, res, next) => {
    // steps to login a user
    // 1. get the user data from the request body (data that is sent from the client to the server - frontend)
    // 2. validate the user data - not empty, valid email, password
    // 3. check if the user exists in the database - using email
    // 4. check if the password is correct
    // 5. generate an access token and refresh token
    // 6. send cookies with the tokens
    // 7. send a response
    try {
        const { email, password } = req.body;

        if (!email) {
            throw new ApiError(400, "Email is required");
        }

        if (!password) {
            throw new ApiError(400, "Password is required");
        }

        const user = await User.findOne({ email });

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        if (!user.isEmailVerified) {
            throw new ApiError(403, "Email not verified. Please verify your email address.");
        }

        const isValidPassword = await user.isPasswordCorrect(password);

        if (!isValidPassword) {
            throw new ApiError(401, "Invalid credentials");
        }

        const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);

        const loggedInUser = await User.findById(user._id)
                                       .select("-password -refreshToken");

        const options = {
            httpOnly: true,
            secure: true,
            path: "/",
        };

        res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                user: loggedInUser,
                accessToken,
                refreshToken,
                message: "User logged In Successfully"
            });
    } catch (error) {
        next(error);  // pass the error to the error handler middleware
    }
});

// logout user
const logoutUser = asyncHandler(async (req, res) => {
    // steps to logout a user
    // 1. set the refreshToken to undefined in the database
    // 2. clear the access and refresh tokens from the cookies
    // 3. send a response to the client

    await User.findByIdAndUpdate(
        req.user._id, 
        {
            $set: {
                refreshToken: undefined
            },
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true,
        path: "/",
    }

    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(200, {}, "User logged out successfully")
        )
})

// refresh access token
const refreshAccessToken = asyncHandler(async (req, res) => {
    // steps to refresh access token
    // 1. get the refresh token from the cookies or request body
    // 2. check if the refresh token is valid
    // 3. generate a new access token
    // 4. send a response with the new access token

    const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
    }

   try {
     const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
 
     const user = await User.findById(decodedToken?.id);
 
     if (!user) {
         throw new ApiError(401, "Invalid refresh token");
     }
 
     if (user?.refreshToken !== incomingRefreshToken) {
             throw new ApiError(401, "Refresh token is expired or invalid")
         }
     
         // why options ? - to make sure the cookies are updated only by the server
         const options = {
            httpOnly: true,
            secure: true,
            sameSite: "none"
         }
     
         const {newAccessToken, newRefreshToken} = await generateAccessAndRefereshTokens(user._id)
     
         return res.status(200)
             .cookie("accessToken", newAccessToken, options)
             .cookie("refreshToken", newRefreshToken, options)
             .json(
                 new ApiResponse(200, 
                 { newAccessToken, newRefreshToken },
                 "Access token refreshed successfully")
             )

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }
})

// get user details
const getUserDetails = asyncHandler(async (req, res, next) => {
    // steps to get user details
    // 1. get the user details from the database
    // 2. send a response with the user details

    try {
        const user = await User.findById(req.user._id).select("-password -refreshToken");
    
        if (!user) {
            throw new ApiError(404, "User not found");
        }
    
        // extract email and name from the user
    
        const sendUser = {
            email: user.email,
            name: user.name
        }
    
        return res.status(200).json(
            new ApiResponse(200, sendUser, "User details retrieved successfully")
        );
    } catch (error) {
        next(error);
    }
});

// forgot password 
const forgotPassword = asyncHandler(async (req, res, next) => {
    try {
        const { email } = req.body;
    
        if (!email) {
            throw new ApiError(400, "Email is required");
        }
    
        const user = await User.findOne({ email });
    
        if (!user) {
            throw new ApiError(404, "User not found");
        }
    
        const token = jwt.sign({ id: user._id }, process.env.RESET_PASSWORD_SECRET, { expiresIn: '1h' });
        const resetUrl = `${baseFrontendUrl}/reset-password/${token}`;
    
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; 
        await user.save();
    
        const message = `
            <div style="font-family: Arial, sans-serif; line-height: 1.5;">
                <h2 style="color: #333;">Password Reset Request</h2>
                <p>Dear ${user.name},</p>
                <p>We received a request to reset your password. Click the link below to reset your password:</p>
                <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; margin: 10px 0; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Reset Password</a>
                <p>If you did not request a password reset, please ignore this email or contact support ${process.env.EMAIL_FROM} if you have questions.</p>
                <p>Thank you,</p>
                <p>LNMIIT</p>
            </div>
        `;
    
        await sendEmail(user.email, 'Password Reset Request', message);
    
        return res.status(200).json(new ApiResponse(200, {}, 'Email sent.Check your inbox or spam folder'));
    } catch (error) {
        next(error);
    }
});

// reset password
const resetPassword = asyncHandler(async (req, res, next) => {
    try {
        const { token } = req.params;
        const { password } = req.body;
    
        if (!password) {
            throw new ApiError(400, "Password is required");
        }
    
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);
        } catch (err) {
            console.error('JWT verification failed:', err);
            throw new ApiError(400, "Invalid or expired token");
        }
    
        const user = await User.findOne({
            _id: decoded.id,
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });
    
        if (!user) {
            throw new ApiError(400, "Invalid or expired token");
        }
    
        const checkForSamePassword = await user.isPasswordCorrect(password);
    
        if (checkForSamePassword) {
            throw new ApiError(400, "Cannot use the same password");
        }
    
    
        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
    
        try {
            await user.save();
            console.log('Password updated successfully');
        } catch (err) {
            console.error('Error saving user:', err);
            throw new ApiError(500, "Error saving password");
        }
    
        return res.status(200).json(new ApiResponse(200, 'Password reset successful'));
    } catch (error) {
        next(error);
    }
});

export { signUpUser, loginUser, logoutUser, refreshAccessToken, getUserDetails, forgotPassword, resetPassword, verifyEmail };