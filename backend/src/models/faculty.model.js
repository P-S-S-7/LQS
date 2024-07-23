import mongoose, { Schema } from "mongoose";

const FacultySchema = new Schema(
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
        department: {
            type: String,
            required: true,
            enum: ["CSE", "CCE", "ECE", "MME", "PHY", "HSS", "MTH"],
        },
    }
);

export const Faculty = mongoose.model('Faculty', FacultySchema);
