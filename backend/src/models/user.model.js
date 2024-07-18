import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const options = { discriminatorKey: 'role', collection: 'users' };

const baseUserSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        refreshToken: {
            type: String,
        },
    },
    {
        timestamps: true 
    },
    options
);

baseUserSchema.pre("save", async function(next) { // mongoose middleware
    if (!this.isModified("password")) {
        return next();  
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

baseUserSchema.methods.isPasswordCorrect = async function(password) { // mongoose custom method
    return await bcrypt.compare(password, this.password);
}

baseUserSchema.methods.generateAccessToken = function() { // mongoose custom method
    return jwt.sign(
        {
            id: this._id,
            username: this.username,
            email: this.email,
            fullname: this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_DURATION,
        }
    )
}
baseUserSchema.methods.generateRefreshToken = function() { // mongoose custom method
     return jwt.sign(
        {
            id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET, 
        {
            expiresIn: process.env.REFRESH_TOKEN_DURATION,
        }
    )
}



export const User = mongoose.model('User', baseUserSchema);
