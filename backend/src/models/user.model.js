import mongoose, { Schema } from 'mongoose';

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
    },
    {
        timestamps: true 
    },
    options
);

export const User = mongoose.model('User', baseUserSchema);
