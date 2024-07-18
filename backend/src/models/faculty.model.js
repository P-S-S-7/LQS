import mongoose, { Schema } from "mongoose";

const facultySchema = new Schema(
    {
        department: {
            type: String,
            required: [true, "Department is required"],
            enum: ["CSE", "CCE", "ECE", "MME", "PHY", "HSS", "MTH"],
        },
    }
);

export const Faculty = mongoose.model('Faculty', facultySchema);
