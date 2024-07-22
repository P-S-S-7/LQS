import mongoose, { Schema } from "mongoose";

const FacultySchema = new Schema(
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
        department: {
            type: String,
            required: [true, "Department is required"],
            enum: ["CSE", "CCE", "ECE", "MME", "PHY", "HSS", "MTH"],
        },
    }
);

export const Faculty = mongoose.model('Faculty', FacultySchema);
