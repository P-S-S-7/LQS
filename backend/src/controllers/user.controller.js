import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import { Faculty } from '../models/faculty.model.js';
import { Student } from '../models/student.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';

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
const signUpUser = asyncHandler(async (req, res) => {
    // steps to register a user
    // 1. get the user data from the request body (data that is sent from the client to the server - frontend)
    // 2. validate the user data - not empty, valid email, password, role
    // 3. check if the user already exists in the database - using email
    // 4. create user object - a new entry in the database
    // 5. create faculty or student object based on the role
    // 6. remove the password and refreshToken from the user object
    // 7. send a response

    const { email, password, role} = req.body;

    if(!email) {
        throw new ApiError(400, "Email is required");
    }

    if(!password) { 
        throw new ApiError(400, "Password is required");
    }   

    if(!role) {
        throw new ApiError(400, "Role is required");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ApiError(409, "User with this email already exists");
    }

    const user = await User.create({
        email,
        password,
        role
    });

    if (!user) {
        throw new ApiError(500, "User registration failed");
    }

    if (role === "faculty") {
        await Faculty.create({ user: user._id, department: req.body.department});
    } else if (role === "student") {
        await Student.create({ user: user._id, branch: req.body.branch});
    } else {
        throw new ApiError(400, "Invalid role");
    }

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, "User registration failed");
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully")
    );
});

// login user
const loginUser = asyncHandler(async (req, res) => {
    // steps to login a user
    // 1. get the user data from the request body (data that is sent from the client to the server - frontend)
    // 2. validate the user data - not empty, valid email, password
    // 3. check if the user exists in the database - using email
    // 4. check if the password is correct
    // 5. generate an access token and refresh token
    // 6. send cookies with the tokens
    // 7. send a response

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

    const isValidPassword = await user.isPasswordCorrect(password)

    if (!isValidPassword) {
        throw new ApiError(401, "Invalid credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )
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
    }

    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(200, {}, "User logged out successfully")
        )
})

export { signUpUser, loginUser, logoutUser };