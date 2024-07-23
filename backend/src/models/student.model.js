import mongoose, { Schema } from "mongoose";

const StudentSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        branch: {
            type: String,
            required: true,
            enum: ["CSE", "CCE", "ECE", "MME"],
        },
    }
);

export const Student = mongoose.model('Student', StudentSchema);

