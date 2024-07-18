import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import { Faculty } from '../models/faculty.model.js';
import { Student } from '../models/student.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';


// Register a new user
const signUpUser = asyncHandler(async (req, res) => {
    const { email, password, role} = req.body;

    if(!email) {
        throw new ApiError(400, "Email is required");
    }

    if(!password) { 
        throw new ApiError(400, "Password is required");
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
        await Faculty.create({ user: user._id, department: req.body.department, email: email });
    } else if (role === "student") {
        await Student.create({ user: user._id, branch: req.body.branch, email: email });
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


export { signUpUser};