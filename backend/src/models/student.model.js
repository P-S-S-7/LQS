import mongoose, { Schema } from "mongoose";

const StudentSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        branch: {
            type: String,
            required: [true, "Branch is required"],
            enum: ["CSE", "CCE", "ECE", "MME"],
        },
    }
);

export const Student = mongoose.model('Student', StudentSchema);

