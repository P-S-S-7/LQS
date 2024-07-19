import mongoose, { Schema } from "mongoose";

const FacultySchema = new Schema(
    {
        department: {
            type: String,
            required: [true, "Department is required"],
            enum: ["CSE", "CCE", "ECE", "MME", "PHY", "HSS", "MTH"],
        },
    }
);

export const Faculty = mongoose.model('Faculty', FacultySchema);
